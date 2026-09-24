/* =====================================================
   CONVERTIR KML -> mapa-predio.js

   Toma el KML exportado de Google My Maps (calles como
   líneas y paradas como marcadores) y genera la red de
   calles que usa la página para calcular recorridos.

   Uso (desde la carpeta del proyecto):
       node herramientas/convertir-kml.js

   - Las líneas que se cruzan quedan unidas en el cruce.
   - Si una línea termina a menos de UNION_METROS de otra
     calle, se la une a esa calle.
   - Las líneas cuyo nombre contiene "mano única" se
     recorren solo en el sentido en que fueron dibujadas.
===================================================== */

const fs = require("fs");
const path = require("path");


const ORIGEN =
    path.join(__dirname, "..", "datos", "calles-y-destinos-polo.kml");

const DESTINO =
    path.join(__dirname, "..", "mapa-predio.js");

const UNION_METROS = 20;

const FUSION_METROS = 2;


/* -----------------------------------------------------
   Marcadores del KML -> clave "Destino|Lugar" de la página
   (destinos sin lugares: solo el nombre del destino)
----------------------------------------------------- */

const PARADAS = {
    "CONTROL-ACCESO": "Control de acceso",
    "AKER 1": "Emergent|Aker 1",
    "AKER 2": "Emergent|Aker 2",
    "OFICINAS EMERGENT": "Emergent|Oficinas",
    "PLANTA 9": "Emergent|Planta 9",
    "PLANTA 8": "Emergent|Planta 8",
    "PLANTA 5": "Emergent|Planta 5",
    "PLANTA 6": "Emergent|Planta 6",
    "PLANTA 7": "Emergent|Planta 7",
    "DOCK/CARGA DESCARGA CONAPROLE": "Conaprole|Dock carga/descarga",
    "OFICINAS CONAPROLE": "Conaprole|Oficinas",
    "DAIRYCO": "Dairyco",
    "OPERADOR LOGISTICO POLO OESTE": "Operador logístico Polo Oeste",
    "SODIMAC": "Sodimac",
    "MEZZANINE": "Mezzanine",
    "VASA": "Vasa",
    "CENTRO DE VERIFICACIÓN": "Centro de verificación",
    "INTEGRA 2": "Integra 2",
    "OFICINAS POLO OESTE": "Oficinas Polo Oeste",
    "OFICINAS UNILEVER": "Unilever|Oficinas",
    "DOCK CARGAS UNILEVER": "Unilever|Dock cargas Unilever",
    "MONDELEZ": "Mondelez",
    "H-M": "H&M",
    "VEHICULOS": "Vehículos",
    "DOCK CARGAS PEPSICO": "Pepsico|Dock cargas Pepsico",
    "OFICINAS PEPSICO": "Pepsico|Oficinas",
    "ZONA DEPORTIVA": "Zona deportiva"
};


/* -----------------------------------------------------
   Leer KML
----------------------------------------------------- */

const kml = fs.readFileSync(ORIGEN, "utf8");

const lineas = [];

const marcadores = [];


for (const bloque of kml.match(/<Placemark[\s\S]*?<\/Placemark>/g) || []) {

    const nombre =
        ((bloque.match(/<name>([^<]*)<\/name>/) || [])[1] || "").trim();

    const coords =
        ((bloque.match(/<coordinates>([\s\S]*?)<\/coordinates>/) || [])[1] || "")
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map(function(t) {
                const [lng, lat] = t.split(",").map(Number);
                return [lat, lng];
            });

    if (bloque.includes("<LineString>") && coords.length > 1) {

        lineas.push({
            nombre: nombre,
            manoUnica: /mano\s+[uú]nica/i.test(nombre),
            puntos: coords
        });

    } else if (bloque.includes("<Point>") && coords.length === 1) {

        marcadores.push({ nombre: nombre, punto: coords[0] });

    }

}


/* -----------------------------------------------------
   Proyección local en metros (el predio es chico)
----------------------------------------------------- */

const LAT0 = lineas[0].puntos[0][0];

const LNG0 = lineas[0].puntos[0][1];

const MX = 111320 * Math.cos(LAT0 * Math.PI / 180);

const MY = 110540;


function aMetros(p) {
    return [(p[1] - LNG0) * MX, (p[0] - LAT0) * MY];
}

function aLatLng(m) {
    return [m[1] / MY + LAT0, m[0] / MX + LNG0];
}

function dist(a, b) {
    return Math.hypot(a[0] - b[0], a[1] - b[1]);
}


// Punto más cercano a p sobre el segmento a-b: { t, punto, d }
function proyectar(p, a, b) {

    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const largo2 = dx * dx + dy * dy;

    let t = largo2 === 0
        ? 0
        : ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / largo2;

    t = Math.max(0, Math.min(1, t));

    const punto = [a[0] + t * dx, a[1] + t * dy];

    return { t: t, punto: punto, d: dist(p, punto) };

}


// Intersección propia entre segmentos a-b y c-d: { t, u } o null
function cruce(a, b, c, d) {

    const r = [b[0] - a[0], b[1] - a[1]];
    const s = [d[0] - c[0], d[1] - c[1]];
    const den = r[0] * s[1] - r[1] * s[0];

    if (Math.abs(den) < 1e-9) return null;

    const q = [c[0] - a[0], c[1] - a[1]];
    const t = (q[0] * s[1] - q[1] * s[0]) / den;
    const u = (q[0] * r[1] - q[1] * r[0]) / den;

    if (t < 0 || t > 1 || u < 0 || u > 1) return null;

    return { t: t, u: u };

}


/* -----------------------------------------------------
   Segmentos y puntos de corte
----------------------------------------------------- */

const segmentos = [];

lineas.forEach(function(linea, li) {

    linea.m = linea.puntos.map(aMetros);

    for (let i = 0; i < linea.m.length - 1; i++) {

        segmentos.push({
            linea: li,
            indice: i,
            a: linea.m[i],
            b: linea.m[i + 1],
            cortes: []
        });

    }

});


// 1) Cruces entre calles
for (let i = 0; i < segmentos.length; i++) {

    for (let j = i + 1; j < segmentos.length; j++) {

        const s1 = segmentos[i];
        const s2 = segmentos[j];

        if (s1.linea === s2.linea && Math.abs(s1.indice - s2.indice) <= 1) continue;

        const c = cruce(s1.a, s1.b, s2.a, s2.b);

        if (c) {

            s1.cortes.push(c.t);
            s2.cortes.push(c.u);

        }

    }

}


// 2) Extremos de línea -> unir a cada calle que pase a menos de
//    UNION_METROS (no solo a la más cercana: en una esquina pueden
//    coincidir varias calles, por ejemplo los dos carriles de mano única)
const uniones = [];

lineas.forEach(function(linea, li) {

    [0, linea.m.length - 1].forEach(function(k) {

        const extremo = linea.m[k];

        const mejorPorLinea = {};

        segmentos.forEach(function(s) {

            // No unir a los segmentos de la propia línea junto al extremo
            if (s.linea === li && (s.indice === k || s.indice === k - 1)) return;

            const p = proyectar(extremo, s.a, s.b);

            const actual = mejorPorLinea[s.linea];

            if (!actual || p.d < actual.p.d) mejorPorLinea[s.linea] = { s: s, p: p };

        });

        Object.values(mejorPorLinea).forEach(function(mejor) {

            if (mejor.p.d > UNION_METROS) return;

            mejor.s.cortes.push(mejor.p.t);

            if (mejor.p.d > FUSION_METROS) {

                uniones.push([extremo, mejor.p.punto]);

            }

        });

    });

});


/* -----------------------------------------------------
   Nodos (fusionando puntos a menos de FUSION_METROS)
----------------------------------------------------- */

const nodos = [];

function nodo(m) {

    for (let i = 0; i < nodos.length; i++) {

        if (dist(nodos[i], m) <= FUSION_METROS) return i;

    }

    nodos.push(m);

    return nodos.length - 1;

}


const aristas = [];

const vistas = new Set();

function arista(a, b, manoUnica) {

    if (a === b) return;

    const clave = manoUnica ? a + ">" + b : Math.min(a, b) + "-" + Math.max(a, b);

    if (vistas.has(clave)) return;

    vistas.add(clave);

    aristas.push([a, b, manoUnica ? 1 : 0]);

}


lineas.forEach(function(linea, li) {

    const recorrido = [];

    segmentos
        .filter(function(s) { return s.linea === li; })
        .forEach(function(s) {

            recorrido.push(s.a);

            s.cortes
                .filter(function(t) { return t > 0 && t < 1; })
                .sort(function(x, y) { return x - y; })
                .forEach(function(t) {
                    recorrido.push([s.a[0] + t * (s.b[0] - s.a[0]), s.a[1] + t * (s.b[1] - s.a[1])]);
                });

        });

    recorrido.push(linea.m[linea.m.length - 1]);

    const ids = recorrido.map(nodo);

    for (let i = 0; i < ids.length - 1; i++) {

        arista(ids[i], ids[i + 1], linea.manoUnica);

    }

});


uniones.forEach(function(u) {

    arista(nodo(u[0]), nodo(u[1]), false);

});


/* -----------------------------------------------------
   Revisión: ¿la red está toda conectada?
----------------------------------------------------- */

const vecinos = nodos.map(function() { return []; });

aristas.forEach(function(e) {
    vecinos[e[0]].push(e[1]);
    vecinos[e[1]].push(e[0]);
});

const grupo = new Array(nodos.length).fill(-1);

let grupos = 0;

for (let i = 0; i < nodos.length; i++) {

    if (grupo[i] !== -1) continue;

    const pila = [i];

    grupo[i] = grupos;

    while (pila.length) {

        const n = pila.pop();

        vecinos[n].forEach(function(v) {
            if (grupo[v] === -1) { grupo[v] = grupos; pila.push(v); }
        });

    }

    grupos++;

}


/* -----------------------------------------------------
   Paradas
----------------------------------------------------- */

const paradas = {};

const sinAsignar = [];

marcadores.forEach(function(mk) {

    const clave = PARADAS[mk.nombre.toUpperCase()];

    if (clave) {

        paradas[clave] = mk.punto;

    } else {

        sinAsignar.push(mk.nombre);

    }

});


/* -----------------------------------------------------
   Escribir mapa-predio.js
----------------------------------------------------- */

function redondear(p) {
    return [+p[0].toFixed(7), +p[1].toFixed(7)];
}

const datos = {
    nodos: nodos.map(aLatLng).map(redondear),
    aristas: aristas,
    paradas: Object.fromEntries(
        Object.entries(paradas).map(function(e) { return [e[0], redondear(e[1])]; })
    )
};

const salida =
    "/* =====================================================\n" +
    "   RED DE CALLES DEL PREDIO\n" +
    "   Generado por herramientas/convertir-kml.js a partir de\n" +
    "   datos/calles-y-destinos-polo.kml. No editar a mano.\n" +
    "===================================================== */\n\n" +
    "const PREDIO = " + JSON.stringify(datos) + ";\n";

fs.writeFileSync(DESTINO, salida, "utf8");


console.log("Líneas:", lineas.length, "| mano única:", lineas.filter(function(l) { return l.manoUnica; }).length);
console.log("Nodos:", nodos.length, "| tramos:", aristas.length, "| uniones agregadas:", uniones.length);
console.log("Grupos de calles conectadas:", grupos, grupos === 1 ? "(todo conectado)" : "(HAY CALLES SUELTAS)");
console.log("Paradas:", Object.keys(paradas).length, sinAsignar.length ? "| sin asignar: " + sinAsignar.join(", ") : "");

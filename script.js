/* =====================================================
   DESTINOS
===================================================== */


const destinos = [

    {
        nombre: "Emergent",
        lat: -34.858899,
        lng: -56.287255,
        lugares: [
            { nombre: "Aker 1", lat: -34.85924638918807, lng: -56.28718751721471 },
            { nombre: "Aker 2", lat: -34.86002288735568, lng: -56.28666970255339 },
            { nombre: "Oficinas", lat: -34.85878051187051, lng: -56.28769406285219 },
            { nombre: "Planta 9", lat: -34.85874803541392, lng: -56.28444317961428 },
            { nombre: "Planta 8", lat: -34.85948571243096, lng: -56.28431421027202 },
            { nombre: "Planta 5", lat: -34.85894723998614, lng: -56.28648772301061 },
            { nombre: "Planta 6", lat: -34.859557300987625, lng: -56.28632461472482 },
            { nombre: "Planta 7", lat: -34.8597359887601, lng: -56.288059721923986 }
        ]
    },


    {
        nombre: "Conaprole",
        lat: -34.858022,
        lng: -56.284150,
        lugares: [
            { nombre: "Oficinas", lat: -34.85795222454734, lng: -56.28326317041105 },
            { nombre: "Dock carga/descarga", lat: -34.85858169221754, lng: -56.283729874728294 }
        ]
    },


   {
        nombre: "Dairyco",
        lat: -34.860288,
        lng: -56.283672
    },


    {
        nombre: "Operador logístico Polo Oeste",
        lat: -34.857873,
        lng: -56.286887
    },


    {
        nombre: "Sodimac",
        lat: -34.858092,
        lng: -56.287525
    },


   {
        nombre: "Vasa",
        lat: -34.857427,
        lng: -56.287695
    },


    {
        nombre: "Centro de verificación",
        lat: -34.857251,
        lng: -56.287515
    },


    {
        nombre: "Mezzanine",
        lat: -34.857740,
        lng: -56.286932
    },


    {
        nombre: "Integra 2",
        lat: -34.857126,
        lng: -56.287545
    },


    {
        nombre: "Oficinas Polo Oeste",
        lat: -34.856989,
        lng: -56.286952
    },


    {
        nombre: "Unilever",
        lat: -34.856472,
        lng: -56.287021,
        lugares: [
            { nombre: "Oficinas", lat: -34.85663288968468, lng: -56.286950001137576 },
            { nombre: "Dock cargas Unilever", lat: -34.85577698868418, lng: -56.287364662357746 }
        ]
    },


    {
        nombre: "Mondelez",
        lat: -34.855712,
        lng: -56.287853
    },


    {
        nombre: "H&M",
        lat: -34.854919,
        lng: -56.287939
    },


    {
        nombre: "Pepsico",
        lat: -34.854657,
        lng: -56.285504,
        lugares: [
            { nombre: "Oficinas", lat: -34.854562483891065, lng: -56.28409840763514 },
            { nombre: "Dock cargas Pepsico", lat: -34.8551043018143, lng: -56.285769811322545 }
        ]
    },


    {
        nombre: "Vehículos",
        lat: -34.854498,
        lng: -56.286078
    },


   {
        nombre: "Control de acceso",
        lat: -34.858853,
        lng: -56.288733
    },


    {
        nombre: "Zona deportiva",
        lat: -34.854304,
        lng: -56.283424
    },


];



/* =====================================================
   CONTENEDOR DE BOTONES
===================================================== */

const contenedor =
    document.getElementById("destinos");



/* =====================================================
   ELEMENTOS DEL MODAL
===================================================== */

const modalOverlay =
    document.getElementById("modalOverlay");

const modalImage =
    document.getElementById("modalImage");

const modalTitle =
    document.getElementById("modalTitle");

const modalActions =
    document.getElementById("modalActions");

const modalCloseButton =
    document.getElementById("modalClose");


let destinoSeleccionado = null;



/* =====================================================
   IMAGEN DE RESPALDO (mientras no haya fotos reales)
===================================================== */

const IMAGEN_PLACEHOLDER =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
            <rect width="600" height="360" fill="#EDEDED"/>
            <g fill="#6DB23E">
                <path d="M300 118c-32 0-58 26-58 58 0 43 58 104 58 104s58-61 58-104c0-32-26-58-58-58zm0 82a24 24 0 1 1 0-48 24 24 0 0 1 0 48z"/>
            </g>
            <text x="300" y="288" font-family="Arial, sans-serif" font-size="18" fill="#9A9A9A" text-anchor="middle">
                Imagen próximamente
            </text>
        </svg>
    `);



/* =====================================================
   NOMBRE DE ARCHIVO A PARTIR DEL NOMBRE DEL DESTINO
===================================================== */

function slugify(texto) {

    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

}


function rutaImagen(destino) {

    return "imagenes/" + slugify(destino.nombre) + ".jpg";

}



/* =====================================================
   CREAR LOS BOTONES
===================================================== */

destinos.forEach(function(destino) {


    const boton =
        document.createElement("button");


    boton.className =
        "destino-button";


    boton.textContent =
        destino.nombre;


    boton.addEventListener(
        "click",
        function() {

            abrirModal(destino);

        }
    );


    contenedor.appendChild(boton);

});



/* =====================================================
   ABRIR MODAL DE DESTINO
===================================================== */

function abrirModal(destino) {

    destinoSeleccionado = destino;

    modalTitle.textContent =
        destino.nombre;

    modalImage.alt =
        destino.nombre;

    modalImage.onerror = function() {

        modalImage.onerror = null;

        modalImage.src =
            IMAGEN_PLACEHOLDER;

    };

    modalImage.src =
        rutaImagen(destino);

    crearBotonesDeLugar(destino);

    modalOverlay.classList.add("active");

}



/* =====================================================
   CERRAR MODAL DE DESTINO
===================================================== */

function cerrarModal() {

    modalOverlay.classList.remove("active");

    destinoSeleccionado = null;

}


modalCloseButton.addEventListener(
    "click",
    cerrarModal
);


modalOverlay.addEventListener(
    "click",
    function(evento) {

        if (evento.target === modalOverlay) {

            cerrarModal();

        }

    }
);


document.addEventListener(
    "keydown",
    function(evento) {

        if (evento.key === "Escape") {

            // Con el mapa abierto, Escape vuelve al pop-up del destino
            if (mapaOverlay.classList.contains("active")) {

                cerrarMapa();

                return;

            }

            cerrarModal();

            cerrarBienvenida();

        }

    }
);



/* =====================================================
   VENTANA DE BIENVENIDA
===================================================== */

const welcomeOverlay =
    document.getElementById("welcomeOverlay");

const welcomeClose =
    document.getElementById("welcomeClose");


function cerrarBienvenida() {

    welcomeOverlay.classList.remove("active");

}


welcomeClose.addEventListener(
    "click",
    cerrarBienvenida
);


welcomeOverlay.addEventListener(
    "click",
    function(evento) {

        if (evento.target === welcomeOverlay) {

            cerrarBienvenida();

        }

    }
);





/* =====================================================
   BOTONES DEL MODAL -> ABRIR MAPA DEL PREDIO
   Si el destino tiene "lugares", un botón por lugar.
   Si no, un único botón "Ir" con las coordenadas del destino.
===================================================== */

function crearBotonesDeLugar(destino) {

    modalActions.innerHTML = "";


    // Siempre true/false: con undefined, toggle() alternaría la clase
    // en cada apertura en vez de fijarla
    const tieneLugares =
        Boolean(destino.lugares && destino.lugares.length > 0);

    modalActions.classList.toggle(
        "modal-actions--grid",
        tieneLugares
    );


    const puntos =
        destino.lugares && destino.lugares.length > 0
            ? destino.lugares
            : [{ nombre: "Ir", lat: destino.lat, lng: destino.lng }];


    puntos.forEach(function(punto) {

        const boton =
            document.createElement("button");

        boton.className =
            "modal-go-button";

        boton.textContent =
            punto.nombre;

        boton.addEventListener(
            "click",
            function() {

                abrirMapa(destino, punto);

            }
        );

        modalActions.appendChild(boton);

    });

}


function irADestino(destino) {


    const url =
        "https://www.google.com/maps/dir/?api=1" +
        "&destination=" +
        encodeURIComponent(
            destino.lat +
            "," +
            destino.lng
        );


    window.location.href =
        url;

}



/* =====================================================
   RED DE CALLES DEL PREDIO
   Datos en mapa-predio.js (generado desde el KML).
   Calcula el recorrido más corto entre dos puntos
   cualesquiera, siguiendo las calles dibujadas.
===================================================== */

const RED = prepararRed(PREDIO);


function prepararRed(predio) {

    const lat0 = predio.nodos[0][0];

    const lng0 = predio.nodos[0][1];

    const mx = 111320 * Math.cos(lat0 * Math.PI / 180);

    const my = 110540;


    function aMetros(p) {
        return [(p[1] - lng0) * mx, (p[0] - lat0) * my];
    }

    function aLatLng(m) {
        return [m[1] / my + lat0, m[0] / mx + lng0];
    }


    const nodos =
        predio.nodos.map(aMetros);

    const aristas =
        predio.aristas.map(function(e) {

            const a = nodos[e[0]];
            const b = nodos[e[1]];

            return {
                a: e[0],
                b: e[1],
                manoUnica: e[2] === 1,
                largo: Math.hypot(b[0] - a[0], b[1] - a[1])
            };

        });


    const vecinos =
        nodos.map(function() { return []; });

    aristas.forEach(function(e) {

        vecinos[e.a].push({ nodo: e.b, largo: e.largo });

        if (!e.manoUnica) {

            vecinos[e.b].push({ nodo: e.a, largo: e.largo });

        }

    });


    return {
        nodos: nodos,
        aristas: aristas,
        vecinos: vecinos,
        aMetros: aMetros,
        aLatLng: aLatLng
    };

}


// Margen para considerar otras calles además de la más cercana:
// un punto entre dos calles puede estar apenas más cerca de una
// que obliga a dar la vuelta (por ejemplo, una de mano única).
const MARGEN_CALLES_METROS = 15;


// Proyección de una coordenada [lat, lng] sobre cada tramo de calle,
// ordenada de la más cercana a la más lejana
function ubicacionesEnRed(latlng) {

    const p = RED.aMetros(latlng);

    return RED.aristas.map(function(e, indice) {

        const a = RED.nodos[e.a];
        const b = RED.nodos[e.b];
        const dx = b[0] - a[0];
        const dy = b[1] - a[1];
        const largo2 = dx * dx + dy * dy;

        let t = largo2 === 0
            ? 0
            : ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / largo2;

        t = Math.max(0, Math.min(1, t));

        const punto = [a[0] + t * dx, a[1] + t * dy];

        return {
            arista: indice,
            t: t,
            punto: punto,
            distancia: Math.hypot(p[0] - punto[0], p[1] - punto[1])
        };

    }).sort(function(x, y) {

        return x.distancia - y.distancia;

    });

}


// Punto de la red más cercano a una coordenada [lat, lng]
function ubicarEnRed(latlng) {

    return ubicacionesEnRed(latlng)[0] || null;

}


// Calles candidatas: la más cercana y las que están hasta
// MARGEN_CALLES_METROS más lejos que ella
function callesCandidatas(latlng) {

    const todas = ubicacionesEnRed(latlng);

    if (todas.length === 0) return [];

    const limite = todas[0].distancia + MARGEN_CALLES_METROS;

    return todas.filter(function(u) {
        return u.distancia <= limite;
    });

}


// Recorrido más corto por las calles entre dos coordenadas.
// Devuelve { puntos, metros, desde, hasta } o null si no hay camino.
function calcularRecorrido(desdeLatLng, hastaLatLng) {

    const candidatosDesde = callesCandidatas(desdeLatLng);

    const candidatosHasta = callesCandidatas(hastaLatLng);

    if (!candidatosDesde.length || !candidatosHasta.length) return null;


    // Nodos provisorios: el origen y el destino reales, y un punto
    // sobre cada calle candidata (el tramo hasta la calle suma metros)
    let siguiente = RED.nodos.length;

    const ORIGEN = siguiente++;

    const DESTINO = siguiente++;

    const extra = {};

    const ubicacionDe = {};


    function unir(de, a, largo) {

        (extra[de] = extra[de] || []).push({ nodo: a, largo: largo });

    }


    function agregarSobreCalle(ubicacion) {

        const id = siguiente++;
        const e = RED.aristas[ubicacion.arista];
        const hastaA = ubicacion.t * e.largo;
        const hastaB = (1 - ubicacion.t) * e.largo;

        ubicacionDe[id] = ubicacion;

        unir(e.a, id, hastaA);
        unir(id, e.b, hastaB);

        if (!e.manoUnica) {

            unir(id, e.a, hastaA);
            unir(e.b, id, hastaB);

        }

        return id;

    }


    const idsDesde = candidatosDesde.map(function(u) {

        const id = agregarSobreCalle(u);

        unir(ORIGEN, id, u.distancia);

        return id;

    });

    const idsHasta = candidatosHasta.map(function(u) {

        const id = agregarSobreCalle(u);

        unir(id, DESTINO, u.distancia);

        return id;

    });


    // Origen y destino sobre la misma calle
    idsDesde.forEach(function(idD) {

        idsHasta.forEach(function(idH) {

            const d = ubicacionDe[idD];
            const h = ubicacionDe[idH];

            if (d.arista !== h.arista) return;

            const e = RED.aristas[d.arista];

            if (!e.manoUnica || d.t <= h.t) {

                unir(idD, idH, Math.abs(h.t - d.t) * e.largo);

            }

        });

    });


    // Dijkstra (la red es chica, alcanza con la versión simple)
    const total = siguiente;

    const distancia = new Array(total).fill(Infinity);

    const anterior = new Array(total).fill(-1);

    const cerrado = new Array(total).fill(false);

    distancia[ORIGEN] = 0;


    for (let paso = 0; paso < total; paso++) {

        let actual = -1;

        for (let i = 0; i < total; i++) {

            if (!cerrado[i] && (actual === -1 || distancia[i] < distancia[actual])) {

                actual = i;

            }

        }

        if (actual === -1 || distancia[actual] === Infinity) break;

        if (actual === DESTINO) break;

        cerrado[actual] = true;


        const salidas =
            (RED.vecinos[actual] || []).concat(extra[actual] || []);

        salidas.forEach(function(s) {

            const nueva = distancia[actual] + s.largo;

            if (nueva < distancia[s.nodo]) {

                distancia[s.nodo] = nueva;

                anterior[s.nodo] = actual;

            }

        });

    }


    if (distancia[DESTINO] === Infinity) return null;


    // Camino sobre las calles (sin el origen y el destino reales)
    const camino = [];

    for (let n = anterior[DESTINO]; n !== ORIGEN; n = anterior[n]) {

        camino.unshift(n);

    }


    const puntos = camino.map(function(n) {

        return ubicacionDe[n]
            ? RED.aLatLng(ubicacionDe[n].punto)
            : RED.aLatLng(RED.nodos[n]);

    });


    return {
        puntos: puntos,
        metros: distancia[DESTINO],
        desde: ubicacionDe[camino[0]],
        hasta: ubicacionDe[camino[camino.length - 1]]
    };

}



/* =====================================================
   MAPA DEL PREDIO
   Vista satelital con el recorrido por las calles
   internas y la ubicación del chofer en vivo.
===================================================== */

const mapaOverlay =
    document.getElementById("mapaOverlay");

const mapaTitulo =
    document.getElementById("mapaTitulo");

const mapaSubtitulo =
    document.getElementById("mapaSubtitulo");

const mapaEstado =
    document.getElementById("mapaEstado");

const mapaVolver =
    document.getElementById("mapaVolver");

const mapaCentrar =
    document.getElementById("mapaCentrar");

const mapaGoogle =
    document.getElementById("mapaGoogle");


let mapa = null;

let marcadorDestino = null;

let marcadorOrigen = null;

let marcadorChofer = null;

let circuloPrecision = null;

let lineaRecorrido = null;

let lineasDeEnlace = null;

let seguimientoGPS = null;

let puntoEnMapa = null;

let paradaEnMapa = null;

let ubicacionChofer = null;

let estadoGPS = "buscando";

let yaEncuadrado = false;


const ZOOM_PREDIO = 18;

// Más lejos que esto de las calles del predio = está afuera
const FUERA_DEL_PREDIO_METROS = 300;

const LLEGADA_METROS = 25;


/* -----------------------------------------------------
   Paradas (punto sobre la calle donde para el camión)
----------------------------------------------------- */

function claveDeLugar(destino, punto) {

    return punto && punto.nombre !== "Ir"
        ? destino.nombre + "|" + punto.nombre
        : destino.nombre;

}


function paradaDe(destino, punto) {

    return PREDIO.paradas[claveDeLugar(destino, punto)] ||
        [punto.lat, punto.lng];

}


// Origen cuando todavía no hay GPS o el chofer está fuera del predio
const CONTROL_DE_ACCESO = (function() {

    const destino = destinos.find(function(d) {
        return d.nombre === "Control de acceso";
    });

    return paradaDe(destino, destino);

})();


/* -----------------------------------------------------
   Crear mapa (una sola vez)
----------------------------------------------------- */

function crearMapa() {

    mapa = L.map(
        "mapaContenedor",
        {
            zoomControl: true,
            attributionControl: true
        }
    );


    L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
            maxZoom: 20,
            maxNativeZoom: 19,
            attribution: "Imágenes &copy; Esri"
        }
    ).addTo(mapa);


    // Todas las calles del predio, en blanco tenue
    L.polyline(
        PREDIO.aristas.map(function(e) {
            return [PREDIO.nodos[e[0]], PREDIO.nodos[e[1]]];
        }),
        {
            color: "#FFFFFF",
            weight: 3,
            opacity: 0.35,
            interactive: false
        }
    ).addTo(mapa);


    lineaRecorrido = L.polyline(
        [],
        {
            color: "#FBC02D",
            weight: 7,
            opacity: 0.95,
            lineCap: "round",
            lineJoin: "round"
        }
    ).addTo(mapa);


    // Tramos cortos (punteados) entre la calle y el punto real
    lineasDeEnlace = L.polyline(
        [],
        {
            color: "#FFFFFF",
            weight: 3,
            opacity: 0.9,
            dashArray: "6 6"
        }
    ).addTo(mapa);


    marcadorOrigen = L.circleMarker(
        [0, 0],
        {
            radius: 9,
            color: "#FFFFFF",
            weight: 3,
            fillColor: "#414345",
            fillOpacity: 1
        }
    );


    marcadorDestino = L.marker(
        [0, 0],
        {
            icon: L.divIcon({
                className: "pin-destino",
                html: "<span></span>",
                iconSize: [36, 36],
                iconAnchor: [18, 36]
            })
        }
    ).addTo(mapa);

}


/* -----------------------------------------------------
   Abrir / cerrar
----------------------------------------------------- */

function abrirMapa(destino, punto) {

    puntoEnMapa = punto;

    paradaEnMapa = paradaDe(destino, punto);

    yaEncuadrado = false;


    mapaTitulo.textContent =
        destino.nombre;

    mapaSubtitulo.textContent =
        punto.nombre === "Ir" ? "" : punto.nombre;


    mapaOverlay.classList.add("active");


    if (!mapa) {

        crearMapa();

    }


    // El contenedor recién se hizo visible: recalcular su tamaño
    mapa.invalidateSize();

    marcadorDestino.setLatLng(paradaEnMapa);

    mapa.setView(paradaEnMapa, ZOOM_PREDIO);


    iniciarGPS();

    actualizarRecorrido();

}


function cerrarMapa() {

    mapaOverlay.classList.remove("active");

    detenerGPS();

}


/* -----------------------------------------------------
   Recorrido y cartel de estado
----------------------------------------------------- */

function actualizarRecorrido() {

    let origen = null;

    let aviso = "";


    // El recorrido sale siempre desde el chofer; si no hay GPS
    // o está fuera del predio, desde el control de acceso.
    const enElPredio =
        ubicacionChofer &&
        ubicarEnRed([ubicacionChofer.lat, ubicacionChofer.lng]).distancia <= FUERA_DEL_PREDIO_METROS;

    if (enElPredio) {

        origen = [ubicacionChofer.lat, ubicacionChofer.lng];

    } else {

        origen = CONTROL_DE_ACCESO;

        aviso =
            ubicacionChofer ? "Estás fuera del predio. " :
            estadoGPS === "sin-permiso" ? "Sin permiso de ubicación. " :
            estadoGPS === "error" ? "No se pudo obtener tu ubicación. " :
            "Buscando tu ubicación… ";

        aviso += "Recorrido desde el control de acceso";

    }


    // Marcador del origen (si el origen es el chofer, ya tiene su punto azul)
    if (!aviso) {

        marcadorOrigen.remove();

    } else {

        marcadorOrigen.setLatLng(origen).addTo(mapa);

    }


    const recorrido =
        calcularRecorrido(origen, paradaEnMapa);


    if (!recorrido) {

        lineaRecorrido.setLatLngs([]);

        lineasDeEnlace.setLatLngs([origen, paradaEnMapa]);

        mapaEstado.textContent =
            "No hay calles dibujadas que unan estos puntos.";

        return;

    }


    lineaRecorrido.setLatLngs(recorrido.puntos);

    lineasDeEnlace.setLatLngs([
        [origen, recorrido.puntos[0]],
        [recorrido.puntos[recorrido.puntos.length - 1], paradaEnMapa]
    ]);


    const metros =
        formatearDistancia(recorrido.metros);

    if (aviso) {

        mapaEstado.textContent =
            aviso + ": " + metros + ".";

    } else {

        mapaEstado.textContent =
            recorrido.metros < LLEGADA_METROS
                ? "Llegaste a tu destino."
                : "Te faltan " + metros + " por el recorrido.";

    }


    if (!yaEncuadrado) {

        mapa.fitBounds(
            L.latLngBounds(recorrido.puntos.concat([origen, paradaEnMapa])),
            {
                padding: [50, 50],
                maxZoom: ZOOM_PREDIO + 1
            }
        );

        // Volver a encuadrar cuando llegue la primera ubicación del GPS
        yaEncuadrado = ubicacionChofer !== null;

    }

}


/* -----------------------------------------------------
   GPS del chofer
----------------------------------------------------- */

function iniciarGPS() {

    if (!("geolocation" in navigator)) {

        estadoGPS = "error";

        return;

    }


    detenerGPS();

    seguimientoGPS = navigator.geolocation.watchPosition(
        actualizarUbicacion,
        errorUbicacion,
        {
            enableHighAccuracy: true,
            maximumAge: 5000,
            timeout: 20000
        }
    );

}


function detenerGPS() {

    if (seguimientoGPS !== null) {

        navigator.geolocation.clearWatch(seguimientoGPS);

        seguimientoGPS = null;

    }

}


function actualizarUbicacion(posicion) {

    const primeraUbicacion =
        ubicacionChofer === null;

    ubicacionChofer = L.latLng(
        posicion.coords.latitude,
        posicion.coords.longitude
    );

    estadoGPS = "ok";

    const precision =
        posicion.coords.accuracy;


    if (!marcadorChofer) {

        circuloPrecision = L.circle(
            ubicacionChofer,
            {
                radius: precision,
                color: "#2F80ED",
                weight: 1,
                fillColor: "#2F80ED",
                fillOpacity: 0.15
            }
        ).addTo(mapa);

        marcadorChofer = L.marker(
            ubicacionChofer,
            {
                icon: L.divIcon({
                    className: "punto-chofer",
                    iconSize: [20, 20]
                })
            }
        ).addTo(mapa);

    } else {

        marcadorChofer.setLatLng(ubicacionChofer);

        circuloPrecision.setLatLng(ubicacionChofer);

        circuloPrecision.setRadius(precision);

    }


    if (primeraUbicacion) {

        yaEncuadrado = false;

    }

    actualizarRecorrido();

}


function errorUbicacion(error) {

    estadoGPS =
        error.code === error.PERMISSION_DENIED
            ? "sin-permiso"
            : "error";

    if (!ubicacionChofer) {

        actualizarRecorrido();

    }

}


function formatearDistancia(metros) {

    return metros < 1000
        ? Math.round(metros) + " m"
        : (metros / 1000).toFixed(1).replace(".", ",") + " km";

}


/* -----------------------------------------------------
   Botones
----------------------------------------------------- */

mapaVolver.addEventListener(
    "click",
    cerrarMapa
);


mapaCentrar.addEventListener(
    "click",
    function() {

        if (marcadorChofer) {

            mapa.setView(
                marcadorChofer.getLatLng(),
                ZOOM_PREDIO + 1
            );

        } else {

            iniciarGPS();

        }

    }
);


mapaGoogle.addEventListener(
    "click",
    function() {

        if (puntoEnMapa) {

            irADestino(puntoEnMapa);

        }

    }
);

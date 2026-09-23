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
   BOTONES DEL MODAL -> ABRIR GOOGLE MAPS
   Si el destino tiene "lugares", un botón por lugar.
   Si no, un único botón "Ir" con las coordenadas del destino.
===================================================== */

function crearBotonesDeLugar(destino) {

    modalActions.innerHTML = "";


    const tieneLugares =
        destino.lugares && destino.lugares.length > 0;

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

                irADestino(punto);

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

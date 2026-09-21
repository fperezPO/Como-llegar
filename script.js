/* =====================================================
   DESTINOS
===================================================== */


const destinos = [

    {
        nombre: "Emergent",
        lat: -34.858899,
        lng: -56.287255
    },


    {
        nombre: "Conaprole",
        lat: -34.858022,
        lng: -56.284150
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
        lng: -56.287021
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
        lng: -56.285504
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

const modalGoButton =
    document.getElementById("modalGoButton");

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

        }

    }
);



/* =====================================================
   BOTÓN "IR" -> ABRIR GOOGLE MAPS
===================================================== */

modalGoButton.addEventListener(
    "click",
    function() {

        if (destinoSeleccionado) {

            irADestino(destinoSeleccionado);

        }

    }
);


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

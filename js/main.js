/////////////////////////////////////
//////     VARIABLES      ///////////
/////////////////////////////////////

const fotos = [
    { id: 1, src: "assets/viajes-1.jpg", titulo: "Titulo de foto 1", tag: ["todo", "agua", "playa", "persona", "vegetacion"] },
    { id: 2, src: "assets/viajes-2.jpg", titulo: "Titulo de foto 2", tag: ["todo", "agua", "edificio"] },
    { id: 3, src: "assets/viajes-3.jpg", titulo: "Titulo de foto 3", tag: ["todo", "direcciones"] },
    { id: 4, src: "assets/viajes-4.jpg", titulo: "Titulo de foto 4", tag: ["todo", "agua", "edificio", "puente", "farolas", "paseo"] },
    { id: 5, src: "assets/viajes-5.jpg", titulo: "Titulo de foto 5", tag: ["todo", "agua", "edificio", "puente", "farolas"] },
    { id: 6, src: "assets/viajes-6.jpg", titulo: "Titulo de foto 6", tag: ["todo", "agua", "montaña", "farolas", "paseo"] },
    { id: 7, src: "assets/viajes-7.jpg", titulo: "Titulo de foto 7", tag: ["todo", "montaña", "edificio", "vegetacion"] },
];

let fotosFiltradas = [];
let tags = [];

let botonera = document.querySelector("#botonera");
let carrusel = document.querySelector("#carrusel");
let numeroImagenes = document.querySelector("#numeroImagenes");
let divImagenGrande = document.querySelector("#divImagenGrande");

let fragmento = document.createDocumentFragment();

let fotoActual = null;


/////////////////////////////////////
///////     EVENTOS      ///////////
/////////////////////////////////////

// CLICK BOTONES (FILTRADO)
document.addEventListener("click", function (ev) {

    if (ev.target.tagName === "BUTTON") {

        let texto = ev.target.textContent;

        fotosFiltradas = filtrarFotos(texto);

        fotoActual = fotosFiltradas[0];

        pintarFotos(fotosFiltradas, texto);
    }
});


// CLICK MINIATURAS
document.addEventListener("click", function (ev) {

    const card = ev.target.closest(".cardContainer");

    if (!card || card.id === "divImagenGrande") return;

    const foto = fotosFiltradas.find(f =>
        f.titulo === card.querySelector("p").textContent
    );

    if (!foto) return;

    fotoActual = foto;

    pintarFotos(fotosFiltradas, "actualizado");
});


/////////////////////////////////////
//////     FUNCIONES      ///////////
/////////////////////////////////////

//Funcion que se encarga de guardar en un array, todos los tags de las fotos 1 sola vez
const obtenerTags = () => {
    const tags = fotos.flatMap(e => e.tag);
    return [...new Set(tags)];
};

//Funcion que se encarga de generar toda la botonera en funcion de los tags
const dibujarBotones = () => {

    tags = obtenerTags();

    tags.forEach(tag => {

        let boton = document.createElement("button");
        boton.textContent = tag.toUpperCase();

        fragmento.append(boton);
    });

    botonera.append(fragmento);
};

//Funcion que se encarga de seleccionar las imagenes q tienen el tag buscado
const filtrarFotos = (text) => {
    return fotos.filter(foto =>
        foto.tag.includes(text.toLowerCase())
    );
};

//Funcion que se encarga de pintar las imagenes
const pintarFotos = (fotos, text) => {

    divImagenGrande.innerHTML = "";
    carrusel.innerHTML = "";

    numeroImagenes.textContent =
        `Hay ${fotos.length} imagen para pintar con el tag ${text}`;

    let parrafoGrande = document.createElement("p");
    parrafoGrande.textContent = fotoActual.titulo;

    let imagenGrande = document.createElement("img");
    imagenGrande.src = fotoActual.src;
    imagenGrande.alt = fotoActual.titulo;

    divImagenGrande.append(parrafoGrande, imagenGrande);

    const resto = fotos.filter(f => f.id !== fotoActual.id);

    resto.forEach(foto => {

        let mainContainer = document.createElement("div");
        mainContainer.className = "cardContainer";

        let parrafo = document.createElement("p");
        parrafo.textContent = foto.titulo;

        let imgContainer = document.createElement("div");
        imgContainer.className = "imgContainer";

        let imagen = document.createElement("img");
        imagen.src = foto.src;
        imagen.alt = foto.titulo;

        imgContainer.append(imagen);
        mainContainer.append(parrafo, imgContainer);

        fragmento.append(mainContainer);
    });

    carrusel.append(fragmento);
};


/////////////////////////////////////
//////     INIT      ///////////
/////////////////////////////////////

//llamda inical a la funcion que pinta los botones
dibujarBotones();
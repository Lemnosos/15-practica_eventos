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
]
let fotosFiltradas = []
let tags = []

const botonera = document.querySelector("#botonera")
const carrusel = document.querySelector("#carrusel")
const numeroImagenes = document.querySelector("#numeroImagenes")
let fragmento = document.createDocumentFragment();

/////////////////////////////////////
///////     EVENTOS  /    ///////////
/////////////////////////////////////

document.addEventListener("click", function (ev) {
    if (ev.target.tagName === "BUTTON") {
        let texto = ev.target.textContent;
        fotosFiltradas = filtrarFotos(texto);
        pintarFotos(fotosFiltradas, texto);
    }
})


/////////////////////////////////////
//////     FUNCIONES      ///////////
/////////////////////////////////////

const obtenerTags = () => {

    const tags = fotos.flatMap(elemento => elemento.tag);

    const tagsUnicos = [...new Set(tags)];

    return tagsUnicos;
}

const dibujarBotones = (() => {
    tags = obtenerTags()
    tags.forEach(element => {
        let boton = document.createElement("BUTTON")
        boton.textContent = element.toUpperCase()
        fragmento.append(boton)
    });
    botonera.append(fragmento)
})

const filtrarFotos = (text) => {
    fotosFiltradas = fotos.filter(foto =>
        foto.tag.includes(text.toLowerCase())
    );
    return fotosFiltradas;
};

const pintarFotos = ((fotos, text) => {

    numeroImagenes.textContent = (`Hay ${fotos.length} para pintar con el tag ${text}`)

    carrusel.innerHTML = "";

    fotosFiltradas.forEach((foto) => {

        let mainContainer = document.createElement("DIV")

        let imgContainer = document.createElement("DIV")
        imgContainer.className = "imgContainer"

        let parrafo = document.createElement("P")
        parrafo.textContent = foto.titulo

        let imagen = document.createElement("IMG")
        imagen.src = foto.src
        imagen.alt = foto.alt

        imgContainer.append(imagen)

        mainContainer.append(parrafo, imgContainer)

        fragmento.append(mainContainer)
    })

    carrusel.append(fragmento)
})

dibujarBotones(tags)
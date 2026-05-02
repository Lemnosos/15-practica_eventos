/////////////////////////////////////
//////     VARIABLES      ///////////
/////////////////////////////////////

const fotos = [
    { id: 1, src: "viajes-1.jpg", tag: ["agua", "playa", "persona", "vegetacion"] },
    { id: 2, src: "viajes-2.jpg", tag: ["agua", "edificio"] },
    { id: 3, src: "viajes-3.jpg", tag: ["direcciones"] },
    { id: 4, src: "viajes-4.jpg", tag: ["agua", "edificio", "puente", "farolas", "paseo"] },
    { id: 5, src: "viajes-5.jpg", tag: ["agua", "edificio", "puente", "farolas"] },
    { id: 6, src: "viajes-6.jpg", tag: ["agua", "montaña", "farolas", "paseo"] },
    { id: 7, src: "viajes-7.jpg", tag: ["montaña", "edificio", "vegetacion"] },
]
let fotosFiltradas = []


const botonera = document.querySelector("#botonera")
const imgContainer = document.querySelector("#carrusel")
let fragmento = document.createDocumentFragment();
let tags = []

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
    console.log(`Hay ${fotos.length} para pintar con el tag ${text}`)
    console.log(fotos)

    imgContainer.innerHTML = "";


    let texto = document.createElement("H2")
    texto.textContent = (`Hay ${fotos.length} para pintar con el tag ${text}`)

    fragmento.append(texto)



    imgContainer.append(fragmento)
})

dibujarBotones(tags)
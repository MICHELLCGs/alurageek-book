import { conexionApi } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]"); //contenedor de los cuadros

function crearCard(id,titulo, tecnica, imagen){
    //creamos el marco fluor que tendrá el cuadro, titulo y tecnica...
    const card = document.createElement("div");
    card.className="marco-fluor";

    //Creamos la estructura dentro del div <<marcoFluor>>
    card.innerHTML=`<img src="${imagen}" alt="Imagen cuadro" class="imagen-cuadro">
        <p class="titulo-cuadro">"${titulo}"</p>
        <p class="tecnica">"${tecnica}"</p>
        <button class="eliminar" data-id="${id}">
            <div class="icono-papelera">
                <img src="img/icons8-papelera-emoji-48.png" alt="Eliminar">
            </div>
        </button>`;
    
    //Código para eliminar un cuadro desde el botón "papelera"
    const botonEliminar =card.querySelector(".eliminar");
    botonEliminar.addEventListener("click", () => {
        conexionApi.borrarCuadro(id)
        .then(() => {
            card.remove();
        })
        .catch(err => console.log(err));
    });

    lista.appendChild(card);
    return card;
}

const cuadro = async () => {
    try{
        const listaApi= await conexionApi.listarCuadros()

        listaApi.forEach(card => {
            lista.appendChild(
                crearCard(
                    card.id,
                    card.titulo,
                    card.tecnica,
                    card.imagen)
                );
    });

    } catch(error) {
        console.log(error)
    };

};

cuadro()

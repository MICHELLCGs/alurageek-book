import { conexionApi } from "./conexionAPI.js";

const lista = document.querySelector("[data-lista]");

function crearCard(id, titulo, genero, imagen) {
    const card = document.createElement("div");
    card.className = "marco-fluor";

    card.innerHTML = `
        <img src="${imagen}" alt="Imagen libro" class="imagen-libro">
        <p class="titulo-libro">"${titulo}"</p>
        <p class="genero">"${genero}"</p>
        <button class="eliminar" data-id="${id}">
            <div class="icono-papelera">
                <img src="img/icons8-papelera-emoji-48.png" alt="Eliminar">
            </div>
        </button>
    `;

    const botonEliminar = card.querySelector(".eliminar");
    botonEliminar.addEventListener("click", () => {
        conexionApi.borrarLibro(id)
            .then(() => {
                card.remove();
            })
            .catch(err => console.log(err));
    });

    lista.appendChild(card);
    return card;
}

const libro = async () => {
    try {
        const listaApi = await conexionApi.listarLibros();

        listaApi.forEach(card => {
            lista.appendChild(
                crearCard(
                    card.id,
                    card.titulo,
                    card.genero,
                    card.imagen
                )
            );
        });
    } catch (error) {
        console.log(error);
    }
};

libro();

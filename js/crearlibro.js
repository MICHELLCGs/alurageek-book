import { conexionApi } from "./conexionAPI.js";

const formulario = document.querySelector("[data-formulario]");

function esURLValida(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

async function crearLibro(evento){
    evento.preventDefault();

    const titulo = document.querySelector("[data-titulo]").value.trim();
    const genero = document.querySelector("[data-genero]").value.trim();
    const imagen = document.querySelector("[data-imagen]").value.trim();

    if (!titulo || !genero || !imagen) {
        alert("Por favor, completa todos los campos antes de enviar.");
        return;
    }

    if (!esURLValida(imagen)) {
        alert("Por favor, ingresa una URL válida.");
        return;
    }

    try {
        await conexionApi.enviarLibro(titulo, genero, imagen);
        formulario.reset();
        window.location.reload();
    } catch (error) {
        console.error("Error al enviar los datos: ", error);
    }
}

formulario.addEventListener("submit", crearLibro);

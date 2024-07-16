async function listarLibros(){
    const conexion = await fetch("http://localhost:3001/libros");
    const conexionConvertida = await conexion.json();
    return conexionConvertida;
}

async function enviarLibro(titulo, genero, imagen){
    return await fetch("http://localhost:3001/libros", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            titulo: titulo,
            genero: genero,
            imagen: imagen
        })
    });
}

const borrarLibro = async (id) => {
    try {
        const res = await fetch(`http://localhost:3001/libros/${id}`, {
            method: "DELETE"
        });
        return await res.json();
    } catch(err) {
        console.log(err);
    }
}

export const conexionApi = {
    listarLibros,
    enviarLibro,
    borrarLibro
}

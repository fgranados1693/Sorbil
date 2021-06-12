'use strict';

let intercambiarLibro = (ptitulo, pautor, pedicion, peditorial, pfecha, pcategoria, pgenero, pidioma, pprecio, ptipo, pisbn, pportada, pcontraportada, psinopsis, pcantidad) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrar-libro',
        responseType: 'json',
        data: {
            titulo: ptitulo,
            autor: pautor,
            edicion: pedicion,
            editorial: peditorial,
            fecha: pfecha,
            categoria: pcategoria,
            genero: pgenero,
            idioma: pidioma,
            precio: pprecio,
            tipo: ptipo,
            isbn: pisbn,
            portada: pportada,
            contraportada: pcontraportada,
            sinopsis: psinopsis,
            cantidad: pcantidad
        }
    });
};

let obtenerLibros = async() => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listar-libros',
            responseType: 'json'
        });

        return response.data.lista_libros;
    } catch (error) {
        console.log(error);
    }
};

let obtenerLibroid = async(_id) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-libro-id/${_id}`,
            responseType: 'json'
        });

        return response.data.libro;
    } catch (error) {
        console.log(error);
    }
};


let obtenerLibroautor = async(autor) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-libro-autor/${autor}`,
            responseType: 'json'
        });

        return response.data.libro;
    } catch (error) {
        console.log(error);
    }
};


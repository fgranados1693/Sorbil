'use strict';

let registrarLibro = (ptitulo, pautor, pedicion, peditorial, pfecha, pcategoria, pgenero, pidioma, pprecio, ptipo, pisbn, pportada, pcontraportada, psinopsis, pcantidad) => {
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

let registrarOferta = (pid, pporcentaje) =>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/agregar-oferta',
        responseType: 'json',
        data: {
            _id: pid,
            porcentaje: pporcentaje
        }
    });
}

let obtenerOfertas = async() => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listar-ofertas',
            responseType: 'json'
        });

        return response.data.lista_ofertas;
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

let registrar_libros_libreria = (pcorreo, pidlibro, pcantidad) =>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/agregar-libros-sucursal',
        responseType: 'json',
        data: {
            correo: pcorreo,
            idlibro: pidlibro,
            cantidad: pcantidad 
        }
    });
}


let actualizarCantidadLibros = (pid, pcantidad) =>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/actualizar-cantidad-libros',
        responseType: 'json',
        data: {
            id: pid,
            cantidad: pcantidad

        }
    });
}

let modificarOferta = (pdatos, pid)=>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-oferta',
        responseType: 'json',
        data: {
            _id: pid,
            datos: pdatos
        }
    });
}

let eliminarOferta = (pid, pidOferta) =>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/eliminar-oferta',
        responseType: 'json',
        data: {
            _id: pid,
            idOferta: pidOferta
        }
    });
}

let cambiarEstadoOferta = (pdatos, pid) =>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-estado-oferta',
        responseType: 'json',
        data: {
            _id: pid,
            datos: pdatos
        }
    });
}

let cambiarEstadoLibros =(pid, pestado)=>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-estado-libros',
        responseType: 'json',
        data: {
            _id: pid,
            estado: pestado
        }
    });

}

let modificarLibros =(pid, plibro)=>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-libros',
        responseType: 'json',
        data: {
            _id: pid,
            libro: plibro
        }
    });

}

let eliminarLibro =(pid)=>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/eliminar-libros',
        responseType: 'json',
        data: {
            _id: pid
        }
    });

}

let RegistrarComentario = (pcomentario, p)=>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-oferta',
        responseType: 'json',
        data: {
            _id: pid,
            datos: pdatos
        }
    });
}
'use strict';

let registrarAutor = (pimagen, pautor, pnacionalidad, pfecha_nacimiento, pfecha_defuncion, pbiografia) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrar-autor',
        responseType: 'json',
        data: {
            imagen: pimagen,
            autor: pautor,
            nacionalidad: pnacionalidad,
            fecha_nacimiento: pfecha_nacimiento,
            fecha_defuncion: pfecha_defuncion,
            biografia: pbiografia
        }
    });
};

let obtenerAutor = async () => {
    try {
        // fetch data from a url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listar-autores',
            responseType: 'json'
        });

        const result = await response;

        return result.data.lista_autores;
    } catch (error) {
        alert(error);
    }
};

let obtenerAutorid = async (_id) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-autor-id/${_id}`,
            responseType: 'json'
        });

        return response.data.autor;
    } catch (error) {
        console.log(error);
    }
};

/*/ver/editar/cambiar estado/eliminar/*/

let modificarAutor = (p_id, pimagen, pautor, pnacionalidad, pfecha_nacimiento, pfecha_defuncion, pbiografia) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-autor',
        responseType: 'json',
        data: {
            _id: p_id,
            imagen: pimagen,
            autor: pautor,
            nacionalidad: pnacionalidad,
            fecha_nacimiento: pfecha_nacimiento,
            fecha_defuncion: pfecha_defuncion,
            biografia: pbiografia
        }
    });
};

let habilitarAutor = (pid) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/habilitar-autor',
        responseType: 'json',
        data: {
            _id: pid
        }
    });
};
let deshabilitarAutor = (pid) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/deshabilitar-autor',
        responseType: 'json',
        data: {
            _id: pid
        }
    });
};

let eliminarAutor = (pid, pidautor) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/eliminar-autor',
        responseType: 'json',
        data: {
            _id: pid,
            idautor: pidautor
        }
    });
}

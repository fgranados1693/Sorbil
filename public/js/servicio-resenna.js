'use strict';

let registrarComentario = (pcomentario, pcalificacion, piduser, pidlibro) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrar-resenna',
        responseType: 'json',
        data: {
            comentario: pcomentario,
            calificacion: pcalificacion,
            idUsuario: piduser,
            idLibro: pidlibro
        }
    });
};



let obtenerResennas = async () => {
    try {
        // fetch data from a url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listar-resennas',
            responseType: 'json'
        });

        const result = await response;

        return result.data.lista_resennas;
    } catch (error) {
        alert(error);
    }
};

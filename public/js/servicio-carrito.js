'use strict';

let registrarCarrito = (pidUsuario, pidLibro, pidLib, pidSuc) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrar-carrito',
        responseType: 'json',
        data: {
            idUsuario: pidUsuario,
            idLibro:  pidLibro,
            idLib: pidLib,
            idSuc: pidSuc
        }
    });
};

let obtenerCarrito = async () => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listar-carrito',
            responseType: 'json'
        });

        return response.data.lista_carrito;
    } catch (error) {
        console.log(error);
    }
};

let eliminarProductoCarrito = (pid) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/eliminar-carrito',
        responseType: 'json',
        data: {
            _id: pid
        }
    });
}

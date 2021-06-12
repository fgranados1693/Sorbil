'use strict';

let registrarVenta = (pidlibreria, pidSuc, pidUser, pidLibro ) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrar-venta',
        responseType: 'json',
        data: {
            idlibreria: pidlibreria,
            idSuc: pidSuc,
            idUser: pidUser,
            idLibro: pidLibro
        }
    });
};

let factura =(pcorreo, pnombre, papellido, psuma)=>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/enviar-factura',
        responseType: 'json',
        data: {
            correo: pcorreo,
            nombre: pnombre,
            apellido: papellido,
            suma: psuma
        }
    });
}

let obtenerVentas = async () => {
    try {
        // fetch data from a url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listar-ventas',
            responseType: 'json'
        });

        const result = await response;

        return result.data.lista_ventas;
    } catch (error) {
        alert(error);
    }
};
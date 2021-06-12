'use strict';

let registrarSucursal = (pcorreo, pnombre, ptelefono, pprovincia, pcanton, pdistrito, pdireccion_latitud, pdireccion_longitud) =>{
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/agregar-sucursal',
        responseType: 'json',
        data: {
            correo: pcorreo,
            nombre: pnombre,
            telefono: ptelefono,
            provincia: pprovincia,
            canton: pcanton,
            distrito: pdistrito,
            direccion_latitud: pdireccion_latitud,
            direccion_longitud: pdireccion_longitud
        }
    });
}


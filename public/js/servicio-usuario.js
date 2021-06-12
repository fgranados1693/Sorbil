'use strict';


let registrarUsuario = (pavatar, pusuario, pcorreo, pcontrasena, pnombre, pid, pprimerApellido, psegundoApellido, psexo, pprovincia, pcanton, pdistrito, pdireccionExacta, pdireccion_longitud, pdireccion_latitud, ptipo_usuario, pestado) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/registrar-usuario',
        responseType: 'json',
        data: {
            avatar: pavatar,
            usuario: pusuario,
            correo: pcorreo,
            contrasena: pcontrasena,
            nombre: pnombre,
            id: pid,
            sexo: psexo,
            primer_apellido: pprimerApellido,
            segundo_apellido: psegundoApellido,
            provincia: pprovincia,
            canton: pcanton,
            distrito: pdistrito,
            direccion_exacta: pdireccionExacta,
            direccion_latitud: pdireccion_latitud,
            direccion_longitud: pdireccion_longitud,
            tipo_usuario: ptipo_usuario,
            estado: pestado
        }
    });
};

let validar_credenciales = async (pcorreo, pcontrasena) => {
    let respuesta = '';
    const peticion = await axios({
        method: 'post',
        url: 'http://localhost:4000/api/validar-credenciales',
        responseType: 'json',
        data: {
            correo: pcorreo,
            contrasena: pcontrasena
        }

    });

    console.log(peticion);
    respuesta = peticion.data.success;

    if (respuesta) {
        sessionStorage.setItem('activo', JSON.stringify(peticion.data.usuario));
    } else {
        sessionStorage.clear();
    }

    return respuesta;
};


let obtenerUsuarios = async () => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: 'http://localhost:4000/api/listar-usuarios',
            responseType: 'json'
        });

        return response.data.lista_usuarios;
    } catch (error) {
        console.log(error);
    }
};

let obtenerUsuarioCorreo = async (correo) => {
    try {

        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-usuario-correo/${correo}`,
            responseType: 'json'
        });

        return response.data.usuario;
    } catch (error) {
        console.log(error);
    }
};

let obtenerUsuarioId = async (_id) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-usuario-id/${_id}`,
            responseType: 'json'
        });

        return response.data.usuario;
    } catch (error) {
        console.log(error);
    }
};
// Modificar el estado
let habilitarUsuario = (pid, pestado) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/habilitar-usuario',
        responseType: 'json',
        data: {
            _id: pid,
            estado: pestado
        }
    });
};

// Modificar el estado
let deshabilitarUsuario = (pid) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/deshabilitar-usuario',
        responseType: 'json',
        data: {
            _id: pid

        }
    });
};

let modificarUsuario = (p_id, pavatar, pusuario, pcorreo, pnombre, pid, pprimerApellido, psegundoApellido, psexo, pprovincia, pcanton, pdistrito, pdireccionExacta, pdireccion_longitud, pdireccion_latitud, ptipo_usuario) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-usuario',
        responseType: 'json',
        data: {
            _id: p_id,
            avatar: pavatar,
            usuario: pusuario,
            correo: pcorreo,
            nombre: pnombre,
            id: pid,
            sexo: psexo,
            primer_apellido: pprimerApellido,
            segundo_apellido: psegundoApellido,
            provincia: pprovincia,
            canton: pcanton,
            distrito: pdistrito,
            direccion_exacta: pdireccionExacta,
            direccion_latitud: pdireccion_latitud,
            direccion_longitud: pdireccion_longitud,
            tipo_usuario: ptipo_usuario

        }
    });
};

let eliminarUsuario = (pid) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/eliminar-usuario',
        responseType: 'json',
        data: {
            _id: pid

        }
    });
};


let modificarContrasenaUsuario = (p_id, pContrasenaNueva) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-contrasena-usuario',
        responseType: 'json',
        data: {
            _id: p_id,
            contrasena: pContrasenaNueva
        }
    });
};

// Funciones para obtener coordenadas de google maps
let corlatitud;
let corlongitud;

let latitud = (platitud) => {
    corlatitud = platitud;
};

let longitud = (plongitud) => {
    corlongitud = plongitud;
};

let enviarLat = () => {
    return corlatitud;
}

let enviarLon = () => {
    return corlongitud;
}

let registrarTarjetas = (pid, pnombre, pnum_tarjeta, pfecha_ven, pcvv) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/agregar-tarjeta',
        responseType: 'json',
        data: {
            _id: pid,
            nombre: pnombre,
            num_tarjeta: pnum_tarjeta,
            fecha_ven: pfecha_ven,
            cvv: pcvv
        }
    });
}


let obtenerTarjetas = async (_id) => {
    try {
        // fetch data from an url endpoint
        const response = await axios({
            method: 'get',
            url: `http://localhost:4000/api/buscar-tarjetas/${_id}`,
            responseType: 'json'
        });

        return response.data.usuario.tarjetas;
    } catch (error) {
        console.log(error);
    }
};

let actualizarTarjetas = (pdatos, pid) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-tarjetas',
        responseType: 'json',
        data: {
            _id: pid,
            datos: pdatos
        }
    });
}

let cambiarEstadoTarjetas = (pdatos, pid) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/modificar-estado-tarjetas',
        responseType: 'json',
        data: {
            _id: pid,
            datos: pdatos
        }
    });
}

let eliminarTarjetas = (pid, pidtarjeta) => {
    axios({
        method: 'post',
        url: 'http://localhost:4000/api/eliminar-tarjetas',
        responseType: 'json',
        data: {
            _id: pid,
            idlibro: pidtarjeta
        }
    });
}

let registraEnCarritoDeCompras = () => {

}

let enviarEmailRecuperacionContrasena = async (correo) => {

    axios({
        method: 'post',
        url: 'http://localhost:4000/api/recuperar-contrasena',
        responseType: 'json',
        data: {
            correo: correo
        }
    });
}

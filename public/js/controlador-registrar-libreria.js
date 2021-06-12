'use strict';
// Aqui empiezan todas las variables para subir las fotos a cloudinary
const imgpreview = document.getElementById('img_preview');
const uploader_portada = document.getElementById('img_uploader_portada');
const uploader_contraportada = document.getElementById('img_uploader_contraportada');
const progress_bar = document.getElementById('progress_bar');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/fenixsorbil/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'gmqflv3u';

// Aqui terminan las variables para subir las fotos a cloudinary

//variables de la librería
const img_uploader_imagen = document.querySelector('#portada');
const input_usuario = document.querySelector('#txt-usuario');
const input_correo = document.querySelector('#txt-correo');
// const input_contrasena = document.querySelector('#txt-contrasena');
// const input_verf_contrasena = document.querySelector('#txt-verificacion-contrasena');
const input_empresa = document.querySelector('#txt-empresa');
const input_telefono = document.querySelector('#txt-telefono');
const input_descripcion = document.querySelector('#txt-descripcion');
const input_provincia = document.querySelector('#txt-provincia');
const input_canton = document.querySelector('#txt-canton');
const input_distrito = document.querySelector('#txt-distrito');
const input_direccion_exacta = document.querySelector('#txt-direccion-exacta');
//variables del administrador
const img_uploader_avatar = document.querySelector('#contraportada');
const input_nombre = document.querySelector('#txt-nombre');
const input_primer_apellido = document.querySelector('#txt-primer-apellido');
const input_segundo_apellido = document.querySelector('#txt-segundo-apellido');
const input_id = document.querySelector('#txt-id');
const input_fecha = document.querySelector('#txt-fecha');
const tipo_usuario = 'al';

const btn_enviar = document.querySelector('#btn-enviar');

let validar = (pusuario, pcorreo, pempresa, ptelefono, pdescripcion, pprovincia, pcanton, pdistrito, pdireccion_exacta, pnombre, pprimer_apellido, psegundo_apellido, pid, pfecha) => {

    let error = false;

    //validación de la librería

    if (img_uploader_imagen.src == 'http://localhost:3000/public/imgs/book-placeholder.png') {
        error = true;
        img_uploader_imagen.classList.add('input_error');

    } else {
        img_uploader_imagen.classList.remove('input_error');
    }

    if (pusuario == '') {
        error = true;
        input_usuario.classList.add('input_error');
    } else {
        input_usuario.classList.remove('input_error');
    }

    if (pcorreo == '') {
        error = true;
        input_correo.classList.add('input_error');
    } else {
        input_correo.classList.remove('input_error');
    }

    // if (pcontrasena == '') {
    //     error = true;
    //     input_contrasena.classList.add('input_error');
    // } else if (pcontrasena != pverfContrasena) {
    //     error = true;
    //     input_contrasena.classList.add('input_error');
    //     input_verf_contrasena.classList.add('input_error');
    // } else {
    //     input_contrasena.classList.remove('input_error');
    // }

    // if (pverfContrasena == '') {
    //     error = true;
    //     input_verf_contrasena.classList.add('input_error');
    // } else if (pcontrasena != pverfContrasena) {
    //     error = true;
    //     input_contrasena.classList.add('input_error');
    //     input_verf_contrasena.classList.add('input_error');
    // } else {
    //     input_verf_contrasena.classList.remove('input_error');
    // }

    if (pempresa == '') {
        error = true;
        input_empresa.classList.add('input_error');
    } else {
        input_empresa.classList.remove('input_error');
    }

    if (ptelefono == '') {
        error = true;
        input_telefono.classList.add('input_error');
    } else {
        input_telefono.classList.remove('input_error');
    }
    if (pdescripcion == '') {
        error = true;
        input_descripcion.classList.add('input_error');
    } else {
        input_descripcion.classList.remove('input_error');
    }

    if (pprovincia == '') {
        error = true;
        input_provincia.classList.add('input_error');
    } else {
        input_provincia.classList.remove('input_error');
    }

    if (pcanton == '') {
        error = true;
        input_canton.classList.add('input_error');
    } else {
        input_canton.classList.remove('input_error');
    }

    if (pdistrito == '') {
        error = true;
        input_distrito.classList.add('input_error');
    } else {
        input_distrito.classList.remove('input_error');
    }

    if (pdireccion_exacta == '') {
        error = true;
        input_direccion_exacta.classList.add('input_error');
    } else {
        input_direccion_exacta.classList.remove('input_error');
    }

    //validación del administrador 

    if (img_uploader_avatar.src == 'http://localhost:3000/public/imgs/avatar-placeholder.png') {
        error = true;
        img_uploader_avatar.classList.add('input_error');

    } else {
        img_uploader_avatar.classList.remove('input_error');
    }

    if (pnombre == '') {
        error = true;
        input_nombre.classList.add('input_error');
    } else {
        input_nombre.classList.remove('input_error');
    }

    if (pid == '') {
        error = true;
        input_id.classList.add('input_error');
    } else {
        input_id.classList.remove('input_error');
    }

    if (pprimer_apellido == '') {
        error = true;
        input_primer_apellido.classList.add('input_error');
    } else {
        input_primer_apellido.classList.remove('input_error');
    }

    if (psegundo_apellido == '') {
        error = true;
        input_segundo_apellido.classList.add('input_error');
    } else {
        input_segundo_apellido.classList.remove('input_error');
    }

    if (pfecha == 'Invalid Date') {
        error = true;
        input_fecha.classList.add('input_error');
    } else {
        input_fecha.classList.remove('input_error');
    }

    return error;
};

let validarCedula = (pidentificacion) => {

    let errorCedula = false;
    let cedulaValida = /^[1-9]-?\d{4}-?\d{4}$/;

    if (!cedulaValida.test(pidentificacion)) {
        errorCedula = true;
        input_id.classList.add('input_error');
    }
    else {
        input_id.classList.remove('input_error');
    }
    return errorCedula;
};

let validarCorreo = (pcorreo) => {

    let errorCorreo = false;
    let correoValido = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if (!correoValido.test(pcorreo)) {
        errorCorreo = true;
        input_correo.classList.add('input_error');
    }
    else {
        input_correo.classList.remove('input_error');
    }
    return errorCorreo;
};

let validarTelefono = (ptelefono) => {

    let errorTelefono = false;
    let telefonoValido = /\d{2}-?\d{2}-?\d{2}-?\d{2}$/;

    if (!telefonoValido.test(ptelefono)) {
        errorTelefono = true;
        input_telefono.classList.add('input_error');

    }
    else {
        input_telefono.classList.remove('input_error');
    }
    return errorTelefono;
};

function calcularEdad(pfecha) {
    let hoy = new Date();
    let nacimiento = new Date(pfecha);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    let m = hoy.getMonth() - nacimiento.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return edad;
}

let validarFecha = (pfecha) => {

    let hoy = new Date();
    let errorFecha = false;

    if (pfecha > hoy || pfecha == 'Invalid Date') {
        errorFecha = true;
        input_fecha.classList.add('input_error');
    }
    else {
        input_fecha.classList.remove('input_error');
    }
    return errorFecha;
};

let generarContrasena = () => {
    //Se genera la contraseña
    let randomPassword = Math.random().toString(36).slice(-8);

    return randomPassword;
};

let saludar = async () => {
    //variables de la librería
    let src_imagen = img_uploader_imagen.src;
    let usuario = input_usuario.value;
    let correo = input_correo.value;
    let contrasena = generarContrasena();
    // let verfContrasena = input_verf_contrasena.value;
    // let contrasena = input_contrasena.value;
    let empresa = input_empresa.value;
    let telefono = input_telefono.value;
    let descripcion = input_descripcion.value;
    let provincia = input_provincia.value;
    let canton = input_canton.value;
    let distrito = input_distrito.value;
    let direccion_exacta = input_direccion_exacta.value;
    let latitud = enviarLat();
    let longitud = enviarLon();
    //variables del administrador
    let src_avatar = img_uploader_avatar.src;
    let nombre = input_nombre.value;
    let primer_apellido = input_primer_apellido.value;
    let segundo_apellido = input_segundo_apellido.value;
    let id = input_id.value;
    let fecha = new Date(input_fecha.value);

    let error = validar(usuario, correo, empresa, telefono, descripcion, provincia, canton, distrito, direccion_exacta, nombre, primer_apellido, segundo_apellido, id, fecha);
    let errorCedula = validarCedula(id);
    let errorTelefono = validarTelefono(telefono);
    let errorCorreo = validarCorreo(correo);
    let edad = calcularEdad(fecha);
    let errorFecha = validarFecha(fecha);

    if (error == false && errorCedula == false && errorCorreo == false && errorTelefono == false && errorFecha == false) {
        let estado = 'pendiente';
        registrarLibreria(src_imagen, usuario, correo, empresa, telefono, descripcion, provincia, canton, distrito, direccion_exacta, latitud, longitud, estado);

        registrarAdminLibreria(src_avatar, correo, contrasena, nombre, primer_apellido, segundo_apellido, id, fecha, edad, tipo_usuario, estado);
        Swal.fire({ //formato json
            title: 'Se ha enviado la información exitosamente',
            text: 'Su solicitud está siendo revisada en este momento',
            type: 'success',
        }).then((result) => {
            if (result.value) {

                window.location.href = '../index.html';
            }
        });
        //Se llama a la función para limpiar el formulario

    } else {
        Swal.fire({ //formato json
            title: 'No se ha registrado la información',
            type: 'warning',
            text: 'Revise los campos resaltados e inténtelo de nuevo'
        })
    }
};

//Función para limpiar el formulario
const limpiarFormulario = () => {
    input_usuario.value = '';
    input_correo.value = '';
    // input_contrasena.value = '';
    // input_verf_contrasena.value = '';
    input_empresa.value = '';
    input_telefono.value = '';
    input_fecha.value = '';
    input_provincia.value = '';
    input_canton.value = '';
    input_distrito.value = '';
    input_direccion_exacta.value = '';
    input_nombre.value = '';
    input_primer_apellido.value = '';
    input_segundo_apellido.value = '';
    input_id.value = '';
    input_descripcion.value = '';
    img_uploader_imagen.src = '../imgs/book-placeholder.png';
    img_uploader_avatar.src = '../imgs/avatar-placeholder.png';
};

btn_enviar.addEventListener('click', saludar);
'use strict';


const input_contrasena_actual = document.querySelector('#txt-contrasena-actual');
const input_contrasena_nueva = document.querySelector('#txt-contrasena-nueva');
const input_verf_contrasena_nueva = document.querySelector('#txt-verf-contrasena-nueva');
const btn_guardar = document.querySelector('#btn-enviar');

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');

let contrasenaSesionActiva = JSON.parse(sessionStorage.getItem('activo'));
let contrasenaBD = contrasenaSesionActiva.contrasena;


let validarContrasenas = (pContrasenaBD, pContrasenaActual) => {

    let error = false;

    if (pContrasenaActual == '') {
        error = true;
        input_contrasena_actual.classList.add('input_error');
    } else {
        input_contrasena_actual.classList.remove('input_error');
    }

    if (pContrasenaBD != pContrasenaActual) {
        error = true;
        input_contrasena_actual.classList.add('input_error');
    } else {
        input_contrasena_actual.classList.remove('input_error');
    }

    return error;

}
let validar = (pContrasenaNueva, pVerfContrasenaActual) => {

    let error = false;

    if (pContrasenaNueva == '') {
        error = true;
        input_contrasena_nueva.classList.add('input_error');
    } else if (pContrasenaNueva != pVerfContrasenaActual) {
        error = true;
        input_contrasena_nueva.classList.add('input_error');
        input_verf_contrasena_nueva.classList.add('input_error');
    } else {
        input_contrasena_nueva.classList.remove('input_error');
    }

    if (pVerfContrasenaActual == '') {
        error = true;
        input_verf_contrasena_nueva.classList.add('input_error');
    } else if (pContrasenaNueva != pVerfContrasenaActual) {
        error = true;
        input_contrasena_nueva.classList.add('input_error');
        input_verf_contrasena_nueva.classList.add('input_error');
    } else {
        input_verf_contrasena_nueva.classList.remove('input_error');
    }

    return error;
};


let modificacionContrasena = async () => {

    let contrasenaNueva = input_contrasena_nueva.value;
    let verfContrasenaNueva = input_verf_contrasena_nueva.value;
    let error = validar(contrasenaNueva, verfContrasenaNueva);
    let errorContrasenas = validarContrasenas(contrasenaBD, input_contrasena_actual.value);


    if (!error && !errorContrasenas) {
        modificarContrasenaUsuario(_id, contrasenaNueva);
        Swal.fire({ //formato json
            title: 'Se ha modificado la contraseña exitosamente',
            type: 'success',
            text: 'Iniciá sesión con la nueva contraseña'
        }).then((result) => {
            if (result.value) {
                sessionStorage.clear();
                window.location.href = '../views/al-inicio.html';
            }
        })

    }
    else {
        Swal.fire({ //formato json
            title: 'No se ha modificado la contraseña',
            type: 'warning',
            text: 'Revisá los campos resaltados e intentalo de nuevo'
        })
    }
};

btn_guardar.addEventListener('click', modificacionContrasena);
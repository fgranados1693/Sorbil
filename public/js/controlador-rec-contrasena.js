'use strict';


const input_contrasena_nueva = document.querySelector('#txt-contrasena');
const input_verf_contrasena_nueva = document.querySelector('#txt-verf-contrasena');
const btn_guardar = document.querySelector('#btn-guardar');

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');

let validar = (pContrasenaNueva, pVerfContrasenaNueva) => {

    let error = false;

    if (pContrasenaNueva == '') {
        error = true;
        input_contrasena_nueva.classList.add('input_error');
    } else if (pContrasenaNueva != pVerfContrasenaNueva) {
        error = true;
        input_contrasena_nueva.classList.add('input_error');
        input_verf_contrasena_nueva.classList.add('input_error');
    } else {
        input_contrasena_nueva.classList.remove('input_error');
    }

    if (pVerfContrasenaNueva == '') {
        error = true;
        input_verf_contrasena_nueva.classList.add('input_error');
    } else if (pContrasenaNueva != pVerfContrasenaNueva) {
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
 
    if (!error) {
        modificarContrasenaUsuario(_id, contrasenaNueva);
        Swal.fire({ //formato json
            title: 'Se ha modificado la contraseña exitosamente',
            type: 'success',
            text: 'Iniciá sesión nuevamente con la nueva contraseña'
        }).then((result) => {
            if (result.value) {
                sessionStorage.clear();
                window.location.href = '../index.html';
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
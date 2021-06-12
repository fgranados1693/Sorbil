'use strict';
const input_correo = document.querySelector('#txt-correo');
const input_contrasena = document.querySelector('#txt-contrasena');
const btn_enviar = document.querySelector('#txt-btn');

let obtenerDatos = async () => {
    let correoo = input_correo.value;
    let contrasena = input_contrasena.value;

    let error_blancos = validar(correoo, contrasena);
    let usuario_aceptado = false;

    if (!error_blancos) {
        usuario_aceptado = await validar_credenciales(correoo, contrasena);
        if (usuario_aceptado) {
            let usuarioActivo = JSON.parse(sessionStorage.getItem('activo'));
            let id_usuario_activo = usuarioActivo.tipo_usuario;
            let idAl = usuarioActivo._id;

            if (usuarioActivo.estado == 'habilitado') {
                switch (id_usuario_activo) {
                    case 'ap':
                        window.location.href = '../views/modificar-contrasena-temporal.html';
                        break;
                    case 'al':
                        window.location.href = `../views/modificar-contrasena-temporal.html?_id=${idAl}`
                        break;
                    case 'u':
                        window.location.href = '../views/modificar-contrasena-temporal.html';
                        break;
                }
            } else {
                Swal.fire({ //formato json
                    title: 'Error en el inicio de sesión',
                    type: 'warning',
                    text: 'Su cuenta está desabilitada'
                });
                sessionStorage.clear();
            }

        } else {
            Swal.fire({ //formato json
                title: 'Error en el inicio de sesión',
                type: 'warning',
                text: 'Revise los campos resaltados e inténtelo de nuevo'
            });
            input_correo.classList.add('input_error');
            input_contrasena.classList.add('input_error');
            sessionStorage.clear();
        }
    }
};

let validar = (pcorreo, pcontrasena) => {
    let error = false;

    if (pcorreo == '') {
        error = true;
        input_correo.classList.add('input_error');
    } else {
        input_correo.classList.remove('input_error');
    }

    if (pcontrasena == '') {
        error = true;
        input_contrasena.classList.add('input_error');
    } else {
        input_contrasena.classList.remove('input_error');
    }

    return error;
};

btn_enviar.addEventListener('click', obtenerDatos);
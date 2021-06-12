'use strict';


const btn_recuperar_contrasena = document.querySelector('#btn-contrasena');
let lista_usuarios = [];

let comprobarCorreoExistente = async (pcorreo) => {

    lista_usuarios = await obtenerUsuarios();
    let error = false;
    for (let i = 0; i < lista_usuarios.length; i++) {


        if (lista_usuarios[i].correo == pcorreo) {
            error = false;
            break;
        }
        else {
            error = true;
        }
    }
    return error;
};

let validarCorreo = (pcorreo) => {

    let errorCorreo = false;
    let correoValido = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if (!correoValido.test(pcorreo)) {
        errorCorreo = true;
    }
    else {
        input_correo.classList.remove('input_error');
    }
    return errorCorreo;
};

btn_recuperar_contrasena.addEventListener('click', async function () {

    Swal.fire({
        title: 'Recuperación de contraseña',
        html: '<input type="email" id="txt-correo-recuperacion" placeholder="Ingresá tu correo electrónico">',

    }).then(async () => {
        let input_correo = document.querySelector('#txt-correo-recuperacion').value;
        let errorCorreo = validarCorreo(input_correo);
        let errorCorreoNoExiste = await comprobarCorreoExistente(input_correo);


        if (errorCorreo) {
            Swal.fire({ //formato json
                title: 'Formato de correo inválido',
                type: 'warning'
            })
        }

        else if (errorCorreoNoExiste) {
            Swal.fire({ //formato json
                title: 'No existe una cuenta asociada a este correo',
                type: 'warning'
            })
        }
        else {
            enviarEmailRecuperacionContrasena(input_correo);
            console.log(input_correo);

            Swal.fire({ //formato json
                title: 'Se ha enviado un correo electrónico a su cuenta ',
                type: 'success'
            })
        }
    })
});


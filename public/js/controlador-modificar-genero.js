'use strict';

const input_genero = document.querySelector('#txt-genero');
const boton_enviar = document.querySelector('#btn-enviar');
let usuarioActivoMod = JSON.parse(sessionStorage.getItem('activo'));
let tipoUserMod = usuarioActivoMod.tipo_usuario;

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');

let validar = (pgenero) => {

    let error = false;

    if (pgenero == '') {
        error = true;
        input_genero.classList.add('input_error');
    } else {
        input_genero.classList.remove('input_error');
    }

    return error;
};

let cargar_formulario = async () => {

    let generoid = await obtenerGeneroid(_id);

    if (generoid) {
        input_genero.value = generoid['genero'];
    }
};

let editar = () => {
    let genero = input_genero.value;

    let error = validar(genero);

    if (!error) {
    modificarGenero(_id, genero);
        Swal.fire({ //formato json
            title: 'Se ha modificado la información exitosamente',
            type: 'success',
        }).then((result) => {
            if (result.value) {
                switch (tipoUserMod) {
                    case 'al': {
                        window.location.href = `al-listar-generos.html?_id=${_id}`;
                        break;
                    }
                    case 'ap': {
                        window.location.href = `ap-listar-generos.html?_id=${_id}`;
                        break;
                    }
                }
            }
        });
        //Se llama a la función para limpiar el formulario

    } else {
        Swal.fire({ //formato json
            title: 'No se ha modificado la información',
            type: 'warning',
            text: 'Revise los campos resaltados e inténtelo de nuevo'
        })
    }
};
    
cargar_formulario();
boton_enviar.addEventListener('click', editar);
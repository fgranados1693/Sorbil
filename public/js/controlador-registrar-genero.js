'use strict';

const input_genero = document.querySelector('#txt-genero');
const btn_enviar = document.querySelector('#btn-enviar');

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

let saludar = () => {
    let genero = input_genero.value;

    let error = validar(genero);

    if (error == false) {
        registrarGenero(genero);
        Swal.fire({ //formato json
            title: 'Se ha registrado la información exitosamente',
            type: 'success',
        })
        //Se llama a la función para limpiar el formulario
        limpiarFormulario();
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
    input_genero.value = '';
};



btn_enviar.addEventListener('click', saludar);
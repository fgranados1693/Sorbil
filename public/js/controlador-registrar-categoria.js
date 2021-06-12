'use strict';

const input_categoria = document.querySelector('#txt-categoria');
const btn_enviar = document.querySelector('#btn-enviar');

let validar = (pcategoria) => {

    let error = false;

    if (pcategoria == '') {
        error = true;
        input_categoria.classList.add('input_error');
    } else {
        input_categoria.classList.remove('input_error');
    }

    return error;
};

let saludar = () => {
    let categoria = input_categoria.value;

    let error = validar(categoria);

    if (error == false) {
        registrarCategoria(categoria);
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
    input_categoria.value = '';
};

btn_enviar.addEventListener('click', saludar);
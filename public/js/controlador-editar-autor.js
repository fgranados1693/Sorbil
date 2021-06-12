'use strict';


const input_autor = document.querySelector('#txt-autor');
const input_nacionalidad = document.querySelector('#txt-nacionalidad');
const input_fecha_nacimiento = document.querySelector('#txt-fecha-nacimiento');
const input_fecha_defuncion = document.querySelector('#txt-fecha-defuncion')
const input_biografia = document.querySelector('#txt-biografia');


const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');

let cargar_formulario = async() => {
    let autor = await obtenerAutorId(_id);
    if (autor) {
        input_autor.value = autor['autor'];
        input_nacionalidad.value = autor['nacionalidad'];
        input_fecha_nacimiento.value = autor['fecha-nacimiento'];
        input_fecha_defuncion.value = autor['fecha-defuncion'];
        input_biografia.value = autor['biografia'];

        let mes = fecha_original.getUTCMonth() + 1;
        if (mes < 10) {
            mes = '0' + mes;
        }

        let dia = fecha_original.getDate();
        if (dia < 10) {
            dia = '0' + dia;
        }


        input_fecha.value = fecha_original.getFullYear() + '-' + mes + '-' + dia;
        input_biografia.value = autor['biografia'];
    }
};
let editar = () => {

    modificar(_id, input_autor.value, input_nacionalidad.value, input_fecha_nacimiento.value, input_fecha_defuncion, input_biografia.value);
};


cargar_formulario();
boton_enviar.addEventListener('click', editar);
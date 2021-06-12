'use strict';
// Aqui empiezan todas las variables para subir las fotos a cloudinary
const imgpreview = document.getElementById('img_preview');
const uploader_imagen = document.getElementById('img_uploader_portada');
const progress_bar = document.getElementById('progress_bar');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/fenixsorbil/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'gmqflv3u';

// Constantes 
const img_uploader_imagen = document.querySelector('#portada');
const input_autor = document.querySelector('#txt-autor');
const input_nacionalidad = document.querySelector('#txt-nacionalidad');
const input_fecha_nacimiento = document.querySelector('#txt-fecha-nacimiento');
const input_fecha_defuncion = document.querySelector('#txt-fecha-defuncion');
const input_biografia = document.querySelector('#txt-biografia');

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');

const btn_actualizar = document.querySelector('#btn-enviar');


let cargar_formulario = async () => {

    let autorid = await obtenerAutorid(_id);

    if (autorid) {
        img_uploader_imagen.src = autorid['imagen'];
        input_autor.value = autorid['autor'];
        input_nacionalidad.value = autorid['nacionalidad'];
        let fecha_original1 = new Date(autorid['fecha_nacimiento']);
        //Fecha nacimiento
        let mes1 = fecha_original1.getUTCMonth() + 1;
        if (mes1 < 10) {
            mes1 = '0' + mes1;
        }

        let dia1 = fecha_original1.getDate();
        if (dia1 < 10) {
            dia1 = '0' + dia1;
        }

        input_fecha_nacimiento.value = fecha_original1.getFullYear() + '-' + mes1 + '-' + dia1;
        //Fecha defunción
        let fecha_original2 = new Date(autorid['fecha_defuncion']);

        let mes2 = fecha_original2.getUTCMonth() + 1;
        if (mes2 < 10) {
            mes2 = '0' + mes2;
        }

        let dia2 = fecha_original2.getDate();
        if (dia2 < 10) {
            dia2 = '0' + dia2;
        }

        input_fecha_defuncion.value = fecha_original2.getFullYear() + '-' + mes2 + '-' + dia2;

        input_biografia.value = autorid['biografia'];

    }
};

let validar = (pautor, pnacionalidad, pfecha_nacimiento, pbiografia) => {

    let error = false;

    if (img_uploader_imagen.src == 'http://localhost:3000/public/imgs/book-placeholder.png') {
        error = true;
        img_uploader_imagen.classList.add('input_error');

    } else {
        img_uploader_imagen.classList.remove('input_error');
    }

    if (pautor == '') {
        error = true;
        input_autor.classList.add('input_error');
    } else {
        input_autor.classList.remove('input_error');
    }

    if (pbiografia == '') {
        error = true;
        input_biografia.classList.add('input_error');
    } else {
        input_biografia.classList.remove('input_error');
    }

    if (pfecha_nacimiento == 'Invalid Date') {
        error = true;
        input_fecha_nacimiento.classList.add('input_error');
    } else {
        input_fecha_nacimiento.classList.remove('input_error');
    }

    if (pnacionalidad == '') {
        error = true;
        input_nacionalidad.classList.add('input_error');
    } else {
        input_nacionalidad.classList.remove('input_error');
    }
    return error;
};

let validarFechaNacimiento = (pfecha_nacimiento) => {

    let hoy = new Date();
    let errorFechaNacimiento = false;

    if (pfecha_nacimiento > hoy || pfecha_nacimiento == 'Invalid Date') {
        errorFechaNacimiento = true;
        input_fecha_nacimiento.classList.add('input_error');
    }

    else {
        input_fecha_nacimiento.classList.remove('input_error');
    }
    return errorFechaNacimiento;
};

let validarFechaDefuncion = (pfecha_defuncion) => {

    let hoy = new Date();
    let errorFechaDefuncion = false;

    if (pfecha_defuncion > hoy) {
        errorFechaDefuncion = true;
        input_fecha_defuncion.classList.add('input_error');
    }
    else {
        input_fecha_defuncion.classList.remove('input_error');
    }
    return errorFechaDefuncion;
};

let validarEdad = (pfecha_nacimiento, pfecha_defuncion) => {

    let errorEdad = false;

    if (pfecha_nacimiento > pfecha_defuncion) {
        errorEdad = true;
        input_fecha_defuncion.classList.add('input_error');
    }
    else {

        input_fecha_defuncion.classList.remove('input_error');
    }
    return errorEdad;
};


let modificarA = () => {
    let src_imagen = img_uploader_imagen.src;
    let autor = input_autor.value;
    let nacionalidad = input_nacionalidad.value;
    let fecha_nacimiento = new Date(input_fecha_nacimiento.value);
    let fecha_defuncion = new Date(input_fecha_defuncion.value);
    let biografia = input_biografia.value;

    let error = validar(autor, biografia, fecha_nacimiento, nacionalidad);
    let errorFechaNacimiento = validarFechaNacimiento(fecha_nacimiento);
    let errorFechaDefuncion = validarFechaDefuncion(fecha_defuncion);
    let errorEdad = validarEdad(fecha_nacimiento, fecha_defuncion);

    if (error == false && errorFechaNacimiento == false && errorFechaDefuncion == false && errorEdad == false) {
        modificarAutor(_id, src_imagen, autor, nacionalidad, fecha_nacimiento, fecha_defuncion, biografia);
        Swal.fire({ //formato json
            title: 'Se ha registrado la información exitosamente',
            type: 'success',
        })

        window.location.href = `ap-listar-autores.html?_id=${_id}`;
    }
    else {
        Swal.fire({ //formato json
            title: 'No se ha registrado la información',
            type: 'warning',
            text: 'Revisá los campos resaltados e intentalo de nuevo'
        })
    }

};


cargar_formulario();
btn_actualizar.addEventListener('click', modificarA);
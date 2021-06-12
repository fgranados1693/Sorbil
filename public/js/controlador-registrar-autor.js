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
const input_nacionalidad= document.querySelector('#txt-nacionalidad'); 
const input_fecha_nacimiento = document.querySelector('#txt-fecha-nacimiento'); 
const input_fecha_defuncion = document.querySelector('#txt-fecha-defuncion'); 
const input_biografia = document.querySelector('#txt-biografia');

const btn_enviar = document.querySelector('#btn-enviar');


let validar = (pautor, pbiografia, pfechaNacimiento, pnacionalidad) => {

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

    if (pfechaNacimiento == 'Invalid Date') {
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

let validarFechaNacimiento= (pfecha_nacimiento) => {
    
    let hoy = new Date();
    let errorFechaNacimiento = false;
    
    if(pfecha_nacimiento > hoy  || pfecha_nacimiento == 'Invalid Date') {
        errorFechaNacimiento = true;
        input_fecha_nacimiento.classList.add('input_error');
    } 
 
    else {
        input_fecha_nacimiento.classList.remove('input_error');
    }
    return errorFechaNacimiento;    
};

let validarFechaDefuncion= (pfecha_defuncion) => {
    
    let hoy = new Date();
    let errorFechaDefuncion = false;
    
    if(pfecha_defuncion > hoy) {
        errorFechaDefuncion = true;
        input_fecha_defuncion.classList.add('input_error');
    }  
    else {
        input_fecha_defuncion.classList.remove('input_error');
    }
    return errorFechaDefuncion;    
};

let validarEdad= (pfecha_nacimiento,pfecha_defuncion) => {

    let errorEdad = false;
    
    if(pfecha_nacimiento > pfecha_defuncion) {
        errorEdad = true;        
        input_fecha_defuncion.classList.add('input_error');
    }  
    else {
        
        input_fecha_defuncion.classList.remove('input_error');
    }
    return errorEdad;    
};

let saludar = () => {
    let src_imagen = img_uploader_imagen.src;
    let autor = input_autor.value;
    let nacionalidad = input_nacionalidad.value;
    let fecha_nacimiento = new Date(input_fecha_nacimiento.value);
    let fecha_defuncion = new Date(input_fecha_defuncion.value);
    let biografia = input_biografia.value;

    let error = validar(autor, biografia, fecha_nacimiento, nacionalidad);
    let errorFechaNacimiento = validarFechaNacimiento(fecha_nacimiento);
    let errorFechaDefuncion = validarFechaDefuncion(fecha_defuncion);
    let errorEdad = validarEdad(fecha_nacimiento,fecha_defuncion);

    if (error == false && errorFechaNacimiento == false && errorFechaDefuncion == false && errorEdad == false) {
        registrarAutor(src_imagen, autor, nacionalidad, fecha_nacimiento, fecha_defuncion, biografia);
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

const limpiarFormulario = () => {
    input_autor.value = '';
    input_biografia.value = '';
    input_fecha_nacimiento.value = '';
    input_fecha_defuncion.value= '';
    input_nacionalidad.value = '';
    img_uploader_imagen.src = "../imgs/book-placeholder.png"
};

btn_enviar.addEventListener('click', saludar);

'use strict';
// Aqui empiezan todas las variables para subir las fotos a cloudinary
const imgpreview = document.getElementById('img_preview');
const uploader_imagen = document.getElementById('img_uploader_portada');
const progress_bar = document.getElementById('progress_bar');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/fenixsorbil/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'gmqflv3u';

// Constantes 
const img_uploader_imagen = document.querySelector('#portada');
const input_administrador_club = document.querySelector('#txt-administrador-club');
const input_tema = document.querySelector('#txt-tema-club');
const input_telefono = document.querySelector('#txt-telefono');
const input_correo = document.querySelector('#txt-correo');
const input_categoria = document.querySelector('#txt-categoria');
const input_genero = document.querySelector('#txt-genero');
const input_fecha = document.querySelector('#txt-fecha');
const input_hora = document.querySelector('#txt-hora');
const input_frecuencia = document.querySelector('#txt-frecuencia');
const input_provincia = document.querySelector('#txt-provincia');
const input_canton = document.querySelector('#txt-canton');
const input_distrito = document.querySelector('#txt-distrito');
const input_direccion_exacta = document.querySelector('#txt-direccion-exacta');
const input_descripcion = document.querySelector('#txt-descripcion');
const tipo = 'Club Presencial';

const btn_enviar = document.querySelector('#btn-enviar');

let usuarioActivoClub = JSON.parse(sessionStorage.getItem('activo'));
let usuario_activo_nombre = usuarioActivoClub.nombre;
let usuario_activo_correo = usuarioActivoClub.correo;

let validar = (pnombre, ptema, pcorreo, ptelefono, pcategoria, pgenero, pfecha, phora, pfrecuencia, pdescripcion, pprovincia, pcanton, pdistrito, pdireccion_exacta) => {

    let error = false;

    if (img_uploader_imagen.src == 'http://localhost:3000/public/imgs/book-placeholder.png') {
        error = true;
        img_uploader_imagen.classList.add('input_error');

    } else {
        img_uploader_imagen.classList.remove('input_error');
    }

    // if (pnombre == '') {
    //     error = true;
    //     input_administrador_club.classList.add('input_error');
    // } else {
    //     input_administrador_club.classList.remove('input_error');
    // }

    if (ptema == '') {
        error = true;
        input_tema.classList.add('input_error');
    } else {
        input_tema.classList.remove('input_error');
    }

    // if (pcorreo == '') {
    //     error = true;
    //     input_correo.classList.add('input_error');
    // } else {
    //     input_correo.classList.remove('input_error');
    // }

    if (ptelefono == '') {
        error = true;
        input_telefono.classList.add('input_error');
    } else {
        input_telefono.classList.remove('input_error');
    }

    if (pcategoria == '') {
        error = true;
        input_categoria.classList.add('input_error');
    } else {
        input_categoria.classList.remove('input_error');
    }

    if (pgenero == '') {
        error = true;
        input_genero.classList.add('input_error');
    } else {
        input_genero.classList.remove('input_error');
    }

    if (pfecha == 'Invalid Date') {
        error = true;
        input_fecha.classList.add('input_error');
    } else {
        input_fecha.classList.remove('input_error');
    }

    if (phora == '') {
        error = true;
        input_hora.classList.add('input_error');
    } else {
        input_hora.classList.remove('input_error');
    }

    if (pfrecuencia == '') {
        error = true;
        input_frecuencia.classList.add('input_error');
    } else {
        input_frecuencia.classList.remove('input_error');
    }

    if (pdescripcion == '') {
        error = true;
        input_descripcion.classList.add('input_error');
    } else {
        input_descripcion.classList.remove('input_error');
    }

    if (pprovincia == '') {
        error = true;
        input_provincia.classList.add('input_error');
    } else {
        input_provincia.classList.remove('input_error');
    }

    if (pcanton == '') {
        error = true;
        input_canton.classList.add('input_error');
    } else {
        input_canton.classList.remove('input_error');
    }

    if (pdistrito == '') {
        error = true;
        input_distrito.classList.add('input_error');
    } else {
        input_distrito.classList.remove('input_error');
    }

    if (pdireccion_exacta == '') {
        error = true;
        input_direccion_exacta.classList.add('input_error');
    } else {
        input_direccion_exacta.classList.remove('input_error');
    }

    return error;
};

let registrarNombre = () => {

    let registroNombre = usuario_activo_nombre;
    
    return registroNombre;
}
;
let registraCorreo = () => {

    let registroCorreo = usuario_activo_correo;
    
    return registroCorreo;
};

let validarTelefono = (ptelefono) => {

    let errorTelefono = false;
    let telefonoValido = /\d{2}-?\d{2}-?\d{2}-?\d{2}$/;

    if (!telefonoValido.test(ptelefono)) {
        errorTelefono = true;
        input_telefono.classList.add('input_error');

    }
    else {
        input_telefono.classList.remove('input_error');
    }
    return errorTelefono;
};

let validarFecha = (pfecha) => {

    let hoy = new Date();
    let errorFecha = false;

    if (pfecha < hoy || pfecha == 'Invalid Date') {
        errorFecha = true;
        input_fecha.classList.add('input_error');
    }
    else {
        input_fecha.classList.remove('input_error');
    }
    return errorFecha;
};

let llamar = () => {
    let src_imagen = img_uploader_imagen.src;;
    let nombre = registrarNombre();
    let tema = input_tema.value;
    let correo = registraCorreo();
    let telefono = input_telefono.value;
    let categoria = input_categoria.value;
    let genero = input_genero.value;
    let fecha = new Date(input_fecha.value);
    let hora = input_hora.value;
    let frecuencia = input_frecuencia.value;
    let provincia = input_provincia.value;
    let canton = input_canton.value;
    let distrito = input_distrito.value;
    let direccion_exacta = input_direccion_exacta.value;
    let descripcion = input_descripcion.value;

    let error = validar(nombre, tema, correo, telefono, categoria, genero, fecha, hora, frecuencia, descripcion, provincia, canton, distrito, direccion_exacta);
    let errorTelefono = validarTelefono(telefono);
    let errorFecha = validarFecha(fecha);

    if (error == false && errorTelefono == false && errorFecha == false) {
        registrarClub(src_imagen, tipo, nombre, tema, correo, telefono, categoria, genero, fecha, hora, frecuencia, descripcion, provincia, canton, distrito, direccion_exacta);
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
            text: 'Revisá los campos resaltados e intentalo de nuevo'
        })
    }
};

//Función para limpiar el formulario
const limpiarFormulario = () => {
    // input_administrador_club.value = '';
    input_tema.value = '';
    // input_correo.value = '';
    input_telefono.value = '';
    input_categoria.value = '';
    input_genero.value = '';
    input_fecha.value = '';
    input_hora.value = '';
    input_frecuencia.value = '';
    input_provincia.value = '';
    input_canton.value = '';
    input_distrito.value = '';
    input_direccion_exacta.value = '';
    input_descripcion.value = '';
    img_uploader_imagen.src = '../imgs/book-placeholder.png'
};

btn_enviar.addEventListener('click', llamar);
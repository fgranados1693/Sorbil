'use strict';
// Aqui empiezan todas las variables para subir las fotos a cloudinary
const imgpreview = document.getElementById('img_preview');
const uploader_avatar = document.getElementById('img_uploader_portada');
const progress_bar = document.getElementById('progress_bar');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/fenixsorbil/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'gmqflv3u';

// Aqui terminan las variables para subir las fotos a cloudinary

//variables de la librería
const img_uploader_avatar = document.querySelector('#contraportada');
const input_nombre = document.querySelector('#txt-nombre');
const input_primer_apellido = document.querySelector('#txt-primer-apellido');
const input_segundo_apellido = document.querySelector('#txt-segundo-apellido');
const input_id = document.querySelector('#txt-id');
const input_fecha = document.querySelector('#txt-fecha');
const tipo_usuario = 'al';

const btn_guardar = document.querySelector('#btn-enviar');

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');

let cargarFormulario = async () => {

    let usuario = await obtenerUsuarioId(_id);

    if (usuario) {
        img_uploader_avatar.src = usuario['avatar'];
        input_nombre.value = usuario['nombre'];
        input_primer_apellido.value = usuario['primer_apellido'];
        input_segundo_apellido.value = usuario['segundo_apellido'];
        input_id.value = usuario['id'];
        let fecha_original = new Date(usuario['fecha']);

        let mes = fecha_original.getUTCMonth() + 1;
        if (mes < 10) {
            mes = '0' + mes;
        }

        let dia = fecha_original.getDate();
        if (dia < 10) {
            dia = '0' + dia;
        }

        input_fecha.value = fecha_original.getFullYear() + '-' + mes + '-' + dia;
    }
};

let validar = (pnombre, pprimer_apellido, psegundo_apellido, pid, pfecha) => {

    let error = false;

    //validación del administrador 

    if (img_uploader_avatar.src == 'http://localhost:3000/public/imgs/avatar-placeholder.png') {
        error = true;
        img_uploader_avatar.classList.add('input_error');

    } else {
        img_uploader_avatar.classList.remove('input_error');
    }

    if (pnombre == '') {
        error = true;
        input_nombre.classList.add('input_error');
    } else {
        input_nombre.classList.remove('input_error');
    }

    if (pid == '') {
        error = true;
        input_id.classList.add('input_error');
    } else {
        input_id.classList.remove('input_error');
    }

    if (pprimer_apellido == '') {
        error = true;
        input_primer_apellido.classList.add('input_error');
    } else {
        input_primer_apellido.classList.remove('input_error');
    }

    if (psegundo_apellido == '') {
        error = true;
        input_segundo_apellido.classList.add('input_error');
    } else {
        input_segundo_apellido.classList.remove('input_error');
    }

    if (pfecha == 'Invalid Date') {
        error = true;
        input_fecha.classList.add('input_error');
    } else {
        input_fecha.classList.remove('input_error');
    }

    return error;
};

let validarCedula = (pidentificacion) => {

    let errorCedula = false;
    let cedulaValida = /^[1-9]-?\d{4}-?\d{4}$/;

    if (!cedulaValida.test(pidentificacion)) {
        errorCedula = true;
        input_id.classList.add('input_error');
    }
    else {
        input_id.classList.remove('input_error');
    }
    return errorCedula;
};


let validarFecha = (pfecha) => {

    let hoy = new Date();
    let errorFecha = false;

    if (pfecha > hoy || pfecha == 'Invalid Date') {
        errorFecha = true;
        input_fecha.classList.add('input_error');
    }
    else {
        input_fecha.classList.remove('input_error');
    }
    return errorFecha;
};

let modificarPerfilAdmin = async () => {

    //variables del administrador
    let src_avatar = img_uploader_avatar.src;
    let nombre = input_nombre.value;
    let primer_apellido = input_primer_apellido.value;
    let segundo_apellido = input_segundo_apellido.value;
    let id = input_id.value;
    let fecha = new Date(input_fecha.value);

    let error = validar(nombre, primer_apellido, segundo_apellido, id, fecha);
    let errorCedula = validarCedula(id);
    let errorFecha = validarFecha(fecha);

    if (error == false && errorCedula == false && errorFecha == false) {
        // let estado = 'habilitado';
        modificarAdminLibreria(_id, src_avatar, nombre, primer_apellido, segundo_apellido, id, fecha);
        Swal.fire({ //formato json
            title: 'Se ha modificado la información exitosamente',
            type: 'success',
        }).then((result) => {
            if (result.value) {
                window.location.href = `ver-perfil-administrador-libreria.html?_id=${_id}`;
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

cargarFormulario();
btn_guardar.addEventListener('click', modificarPerfilAdmin);
'use strict';
// Constantes 
const input_nombre = document.querySelector('#txt-nombre-sucursal');
const input_telefono = document.querySelector('#txt-telefono');
const input_provincia = document.querySelector('#txt-provincia');
const input_canton = document.querySelector('#txt-canton');
const input_distrito = document.querySelector('#txt-distrito');
const btn_crear_sucursal = document.querySelector('#btn-enviar');


let validar = (pnombre, ptelefono, pprovincia, pcanton, pdistrito) => {

    let error = false;

    if (pnombre == '') {
        error = true;
        input_nombre.classList.add('input_error');
    } else {
        input_nombre.classList.remove('input_error');
    }

    if (ptelefono == '') {
        error = true;
        input_telefono.classList.add('input_error');
    } else {
        input_telefono.classList.remove('input_error');
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
    return error;
};

let validarTelefono = (ptelefono) => {
    
    let errorTelefono = false;
    let telefonoValido = /\d{2}-?\d{2}-?\d{2}-?\d{2}$/;

    if(!telefonoValido.test(ptelefono)){
        errorTelefono = true;
        input_telefono.classList.add('input_error');
        
    }
    else {
        input_telefono.classList.remove('input_error');
    }
    return errorTelefono;
};

let llamar = async () => {
    let nombre = input_nombre.value;
    let telefono = input_telefono.value;
    let provincia = input_provincia.value;
    let canton = input_canton.value;
    let distrito = input_distrito.value;
    let latitud =  await enviarLat();
    let longitud = await enviarLon();

    let datosSucursal = JSON.parse(sessionStorage.getItem('activo'));
    let correo_sucursal = datosSucursal.correo;
    
    let error = validar(nombre, telefono, provincia, canton, distrito);
    let errorTelefono = validarTelefono(telefono);

    if (error == false && errorTelefono == false) {
        registrarSucursal(correo_sucursal, nombre, telefono, provincia, canton, distrito, latitud, longitud);
        limpiarFormulario();
        Swal.fire({ //formato json
            title: 'Se ha registrado la sucursal exitosamente',
            type: 'success',
        }).then((result) => {
            if (result.value) {
                window.location.href = `al-listar-sucursales.html?_id=${idAl}`;
            }
        });
        //Se llama a la fun ción para limpiar el formulario
        
    } else {
        Swal.fire({ //formato json
            title: 'No se ha registrado la sucursal',
            type: 'warning',
            text: 'Revisá los campos resaltados e intentalo de nuevo'
        })
    }

    initMap();
};

const limpiarFormulario = () => {
    input_nombre.value = '';
    input_telefono.value = '';
    input_provincia.value = '';
    input_canton.value = '';
    input_distrito.value = '';
};



btn_crear_sucursal.addEventListener('click', llamar);
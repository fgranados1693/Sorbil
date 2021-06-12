'use strict';
// Constantes 
const input_nombre = document.querySelector('#txt-nombre-sucursal');
const input_telefono = document.querySelector('#txt-telefono');
const input_provincia = document.querySelector('#txt-provincia');
const input_canton = document.querySelector('#txt-canton');
const input_distrito = document.querySelector('#txt-distrito');
const btn_guardar = document.querySelector('#btn-enviar');

let sesionLibreria = JSON.parse(sessionStorage.getItem('activo'));
let sesion_libreria = sesionLibreria.correo;

var map;
function initMapSucursal(plocation) {


    map;
    let latitude = plocation.lat; // YOUR LATITUDE VALUE
    let longitude = plocation.lng; // YOUR LONGITUDE VALUE

    let myLatLng = { lat: latitude, lng: longitude };

    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 14,
        disableDoubleClickZoom: true, // disable the default map zoom on double click
    });
}

const urlParams = new URLSearchParams(window.location.search);
let _i = urlParams.get('_i');
let posicion = urlParams.get('_i');

let addMarker = (plocation) => {
    let marker = new google.maps.Marker({
        map: map,
        position: plocation,
        draggable: true
    });

    google.maps.event.addListener(marker, 'dragend', function () {

        let valuelatitud = marker.getPosition().lat();
        let valuelongitud = marker.getPosition().lng();
        longitud(valuelongitud);
        latitud(valuelatitud);

    });
}

let cargarFormulario = async () => {

    let datosLibreria = await obtenerLibreriaPorCorreo(sesion_libreria);
    posicion = parseInt(posicion);
    let location

    if (datosLibreria) {

        input_nombre.value = datosLibreria[0].sucursales[posicion].nombre;
        input_telefono.value = datosLibreria[0].sucursales[posicion].telefono;
        input_provincia.value = datosLibreria[0].sucursales[posicion].provincia;
        llenarCantones(datosLibreria[0].sucursales[posicion].provincia);
        llenarDistritos(datosLibreria[0].sucursales[posicion].canton);
        input_canton.value = datosLibreria[0].sucursales[posicion].canton;
        input_distrito.value = datosLibreria[0].sucursales[posicion].distrito;
        location = { lat: datosLibreria[0].sucursales[posicion].direccion_latitud, lng: datosLibreria[0].sucursales[posicion].direccion_longitud};
    }

    initMapSucursal(location);
    addMarker(location);

};

let llenarCantones = (pNombreProvincia) => {
    canton.length = 1;
    distrito.length = 1;
    if (this.selectedIndex < 1) return;
    let i = 0;
    for (let opt_canton in ubicaciones[pNombreProvincia]) {

        if (i == 0) {
            canton.options[canton.options.length] = new Option("--Seleccione una opción--", "--Seleccione una opción--");
        } else {
            canton.options[canton.options.length] = new Option(opt_canton, opt_canton);
        }
        i++;
    }
}

let llenarDistritos = (pNombreCanton) => {

    distrito.length = 1;
    if (this.selectedIndex < 1) return;
    let opt_distritos = ubicaciones[input_provincia.value][pNombreCanton];

    for (let i = 0; i < opt_distritos.length - 1; i++) {
        if (i == 0) {
            distrito.options[distrito.options.length] = new Option("--Seleccione una opción--", "--Seleccione una opción--");
        } else {
            distrito.options[distrito.options.length] = new Option(opt_distritos[i], opt_distritos[i]);
        }
    }
}

let validar = (pnombre, ptelefono, pprovincia, pcanton, pdistrito) => {

    let error = false;

    if (pnombre.value == '') {
        error = true;
        input_nombre.classList.add('input_error');
    } else {
        input_nombre.classList.remove('input_error');
    }

    if (ptelefono.value == '') {
        error = true;
        input_telefono.classList.add('input_error');
    } else {
        input_telefono.classList.remove('input_error');
    }


    if (pprovincia.value == '') {
        error = true;
        input_provincia.classList.add('input_error');
    } else {
        input_provincia.classList.remove('input_error');
    }

    if (pcanton.value == '') {
        error = true;
        input_canton.classList.add('input_error');
    } else {
        input_canton.classList.remove('input_error');
    }

    if (pdistrito.value == '') {
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

    if (!telefonoValido.test(ptelefono)) {
        errorTelefono = true;
        input_telefono.classList.add('input_error');

    }
    else {
        input_telefono.classList.remove('input_error');
    }
    return errorTelefono;
};

let modificar = async () => {

    let error = validar(input_nombre, input_telefono, input_provincia, input_canton, input_distrito);
    let errorTelefono = validarTelefono(input_telefono.value);
    let latitud = await enviarLat();
    let longitud = await enviarLon();

    if (error == false && errorTelefono == false) {
        posicion = parseInt(posicion);
        let datosLibreria = await obtenerLibreriaPorCorreo(sesion_libreria);
        datosLibreria[0].sucursales[posicion].nombre = input_nombre.value;
        datosLibreria[0].sucursales[posicion].telefono = input_telefono.value;
        datosLibreria[0].sucursales[posicion].provincia = input_provincia.value;
        datosLibreria[0].sucursales[posicion].canton = input_canton.value;
        datosLibreria[0].sucursales[posicion].distrito = input_distrito.value;
        datosLibreria[0].sucursales[posicion].direccion_latitud = latitud;
        datosLibreria[0].sucursales[posicion].direccion_longitud = longitud;



        modificarSucursal(sesion_libreria, datosLibreria[0]);
        Swal.fire({ //formato json
            title: 'Se ha registrado la información exitosamente',
            type: 'success',
        }).then((result) => {
            if (result.value) {
                window.location.href = `al-listar-sucursales.html`;
            }
        })

    } else {
        Swal.fire({ //formato json
            title: 'No se ha registrado la información',
            type: 'warning',
            text: 'Revisá los campos resaltados e intentalo de nuevo'
        })
    }
};
cargarFormulario();
btn_guardar.addEventListener('click', modificar);
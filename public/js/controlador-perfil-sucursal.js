'use strict';


let sesionLibreria = JSON.parse(sessionStorage.getItem('activo'));
let sesion_libreria = sesionLibreria.correo;

const urlParams = new URLSearchParams(window.location.search);
let _i = urlParams.get('_i');
let posicion = urlParams.get('_i');

let _id = urlParams.get('_id');

let input_nombre = document.querySelector('#nombre');
let input_telefono = document.querySelector('#telefono');
let input_provincia = document.querySelector('#provincia');
let input_canton = document.querySelector('#canton');
let input_distrito = document.querySelector('#distrito');

let llenar_perfil = async () => {

    let datosLibreria =  await obtenerLibreriaPorCorreo(sesion_libreria);
    posicion = parseInt(posicion);
 
    
    if (datosLibreria) {

        input_nombre.innerHTML = datosLibreria[0].sucursales[posicion].nombre;
        input_telefono.innerHTML = datosLibreria[0].sucursales[posicion].telefono;
        input_provincia.innerHTML = datosLibreria[0].sucursales[posicion].provincia;
        input_canton.innerHTML = datosLibreria[0].sucursales[posicion].canton;
        input_distrito.innerHTML = datosLibreria[0].sucursales[posicion].distrito;
    }
};

llenar_perfil();



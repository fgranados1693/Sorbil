'use strict';

const urlParams = new URLSearchParams(window.location.search);

let _id = urlParams.get('_id');
//Admin
const avatar = document.querySelector('#avatar');
const txt_nombre = document.querySelector('#txt-nombre');
const txt_correo = document.querySelector('#txt-correo');
const txt_id = document.querySelector('#txt-id');
const txt_primer_apellido = document.querySelector('#txt-primer-apellido');
const txt_segundo_apellido = document.querySelector('#txt-segundo-apellido');
//Libreria
const imagen = document.querySelector('#imagen');
const empresa = document.querySelector('#empresa');
const descripcion = document.querySelector('#descripcion');
const telefono = document.querySelector('#telefono');
const correo = document.querySelector('#correo');
const provincia = document.querySelector('#provincia');
const canton = document.querySelector('#canton');
const distrito = document.querySelector('#distrito');
const direccion_exacta = document.querySelector('#direccion-exacta');
//Botones de modificar
const btn_modificarAdm = document.querySelector('#btn-modificarAdm');
const btn_modificarLib = document.querySelector('#btn-modificarLib');

let correoLib = JSON.parse(sessionStorage.getItem('activo'));
let correoActivo = correoLib.correo;

let llenar_perfil = async () => {
    
    let usuario = await obtenerUsuarioId(_id);

    if (usuario) {
        avatar.src = usuario['avatar'];
        txt_nombre.innerHTML = usuario['nombre'];
        txt_correo.innerHTML = usuario['correo'];
        txt_id.innerHTML = usuario['id'];
        txt_primer_apellido.innerHTML = usuario['primer_apellido'];
        txt_segundo_apellido.innerHTML = usuario['segundo_apellido'];
    }
};

let llenar_perfil_lib= async () => {

    let libreriaid = await obtenerLibreriaPorCorreo(correoActivo);

    if (libreriaid) {
        imagen.src = libreriaid[0].imagen;
        empresa.innerHTML = libreriaid[0].empresa;
        // descripcion.innerHTML = libreriaid[0].descripcion;
        telefono.innerHTML = libreriaid[0].telefono;
        correo.innerHTML = libreriaid[0].correo;
        // provincia.innerHTML = libreriaid[0].provincia;
        // canton.innerHTML = libreriaid[0].canton;
        // distrito.innerHTML = libreriaid[0].distrito;
        // direccion_exacta.innerHTML = libreriaid[0].direccion_exacta;
    }
};

btn_modificarAdm.addEventListener('click', function () {
    window.location.href = `modificar-perfil-admin-libreria.html?_id=${_id}`;
});

btn_modificarLib.addEventListener('click', function () {
    window.location.href = `modificar-perfil-libreria.html?_id=${_id}`;
});

llenar_perfil();
llenar_perfil_lib();

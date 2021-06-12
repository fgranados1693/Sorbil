'use strict';

const Nav_inicio_sesion = document.querySelector("#nav-inicio");
const div_inicio_sesion = document.querySelector('#div-usuarioEnSesion');

let usuarioEnses = JSON.parse(sessionStorage.getItem('activo'));

if (usuarioEnses) {
    
    Nav_inicio_sesion.classList.remove('header-nav-1-btns');
    Nav_inicio_sesion.classList.add('ocultar');
    div_inicio_sesion.classList.remove('ocultar');
}

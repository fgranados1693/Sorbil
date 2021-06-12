'use strict';

const Nav_inicio_sesion = document.querySelector("#nav-inicio");

let usuarioActivo = JSON.parse(sessionStorage.getItem('activo'));
let tipo_usuario = usuarioActivo.tipo_usuario;

if (usuarioActivo) {
    switch (tipo_usuario) {
        case 'ap':
            Nav_inicio_sesion.classList.remove('header-nav-1-btns');
            Nav_inicio_sesion.classList.add('ocultar');
            break;
        case 'al':
            Nav_inicio_sesion.classList.remove('header-nav-1-btns');
            Nav_inicio_sesion.classList.add('ocultar');
            break;
        case 'u':
            Nav_inicio_sesion.classList.remove('header-nav-1-btns');
            Nav_inicio_sesion.classList.add('ocultar');
            break;
    }
} else {
    window.location.href = 'u-inicio.html'
}

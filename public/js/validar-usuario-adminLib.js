'use strict';

let usuarioActivo = false;

usuarioActivo = JSON.parse(sessionStorage.getItem('activo'));

if(usuarioActivo == null){
    window.location.href = 'u-iniciar-sesion.html';
}

if(usuarioActivo){
    let tipo_usuario = usuarioActivo.tipo_usuario;

    if(tipo_usuario != 'al'){
        window.location.href = '../index.html';
    }
}









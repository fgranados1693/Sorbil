'use strict';

const tbody = document.querySelector('#tabla-filtrado tbody');
let lista_librerias = [];
let txt_filtro = document.querySelector('#txt-filtro');

let mostrar_tabla = async () => {

    lista_librerias = await obtenerLibrerias();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_librerias.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = lista_librerias[i]['empresa'];
        fila.insertCell().innerHTML = lista_librerias[i]['correo'];
        fila.insertCell().innerHTML = lista_librerias[i]['telefono'];
        fila.insertCell().innerHTML = lista_librerias[i]['provincia'];


        let celda_perfil = fila.insertCell();
        let boton_perfil = document.createElement('button');
        boton_perfil.type = 'button';
        boton_perfil.innerText = 'Ver perfil';
        boton_perfil.dataset._id = lista_librerias[i]['_id'];

        celda_perfil.appendChild(boton_perfil);

        boton_perfil.addEventListener('click', function () {
            window.location.href = `ver-perfil-administrador-libreria.html?_id=${this.dataset._id}`;
        });
    }
};


let filtrar_tabla = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_librerias.length; i++) {
        if (lista_librerias[i]['empresa'].toLowerCase().includes(filtro) || lista_librerias[i]['correo'].toLowerCase().includes(filtro) || lista_librerias[i]['telefono'].toLowerCase().includes(filtro) || lista_librerias[i]['provincia'].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_librerias[i]['empresa'];
            fila.insertCell().innerHTML = lista_librerias[i]['correo'];
            fila.insertCell().innerHTML = lista_librerias[i]['telefono'];
            fila.insertCell().innerHTML = lista_librerias[i]['provincia'];

            let celda_perfil = fila.insertCell();
            let boton_perfil = document.createElement('button');
            boton_perfil.type = 'button';
            boton_perfil.innerText = 'Ver perfil';
            boton_perfil.dataset._id = lista_librerias[i]['_id'];
    
            celda_perfil.appendChild(boton_perfil);
    
            boton_perfil.addEventListener('click', function () {
                window.location.href = `ver-perfil-administrador-libreria.html?_id=${this.dataset._id}`;
            });
        }
    }
};


mostrar_tabla();
txt_filtro.addEventListener('keyup', filtrar_tabla);
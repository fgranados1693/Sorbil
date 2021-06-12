'use strict';

const tbodyClubes = document.querySelector('#tabla-clubes tbody');
const tbodyLibrerias = document.querySelector('#tabla-librerias tbody');
const tbodyLibros = document.querySelector('#tabla-libros tbody');
let lista_clubes_links = [];
let lista_librerias_links = [];
let lista_libros_links = [];


let mostrar_clubes = async () => {

    lista_clubes_links = await obtenerClubes();
    tbodyClubes.innerHTML = '';


    for (let i = 0; i < lista_clubes_links.length; i++) {
        let fila = tbodyClubes.insertRow();
        let tema = lista_clubes_links[i]['tema'];
        let tipo = lista_clubes_links[i]['tipo'];
        let celda_perfil = fila.insertCell();
        let boton_perfil = document.createElement('button');
        boton_perfil.type = 'button';
        boton_perfil.innerText = `${tema}`;
        boton_perfil.dataset._id = lista_clubes_links[i]['_id'];

        celda_perfil.appendChild(boton_perfil);

        boton_perfil.addEventListener('click', function () {
            if (tipo == 'Club Presencial') {
                window.location.href = `views/ver-perfil-club-presencial.html?_id=${this.dataset._id}`;
            } else if (tipo == 'Club Virtual') {
                window.location.href = `views/ver-perfil-club-virtual.html?_id=${this.dataset._id}`;
            }
        });
    }
};

let mostrar_librerias = async () => {

    lista_librerias_links = await obtenerLibrerias();
    tbodyLibrerias.innerHTML = '';


    for (let i = 0; i < lista_librerias_links.length; i++) {
        if (lista_librerias_links[i].estado != 'pendiente'){
            let fila = tbodyLibrerias.insertRow();
            let empresa = lista_librerias_links[i]['empresa'];
            let celda_perfil = fila.insertCell();
            let boton_perfil = document.createElement('button');
            boton_perfil.type = 'button';
            boton_perfil.innerText = `${empresa}`;
            boton_perfil.dataset._id = lista_librerias_links[i]['_id'];
    
            celda_perfil.appendChild(boton_perfil);
    
            boton_perfil.addEventListener('click', function () {
                    window.location.href = `views/ver-perfil-libreria.html?_id=${this.dataset._id}`;
            });
        }
    }
};

let mostrar_libros = async () => {

    lista_libros_links = await obtenerLibros();
    tbodyLibros.innerHTML = '';


    for (let i = 0; i < lista_libros_links.length; i++) {
        let fila = tbodyLibros.insertRow();
        let titulo = lista_libros_links[i]['titulo'];
        let celda_perfil = fila.insertCell();
        let boton_perfil = document.createElement('button');
        boton_perfil.type = 'button';
        boton_perfil.innerText = `${titulo}`;
        boton_perfil.dataset._id = lista_libros_links[i]['_id'];

        celda_perfil.appendChild(boton_perfil);

        boton_perfil.addEventListener('click', function () {
                window.location.href = `views/ver-perfil-libro.html?_id=${this.dataset._id}`;
        });
    }
};

mostrar_clubes();
mostrar_librerias();
mostrar_libros();
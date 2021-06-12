'use strict';

const urlParamslibreria = new URLSearchParams(window.location.search);

let id = urlParamslibreria.get('_id');

let imagen = document.querySelector('#imagen');
let empresa = document.querySelector('#empresa');
let descripcion = document.querySelector('#descripcion');
let telefono = document.querySelector('#telefono');
let correo = document.querySelector('#correo');
let provincia = document.querySelector('#provincia');
let canton = document.querySelector('#canton');
let distrito = document.querySelector('#distrito');
let direccion_exacta = document.querySelector('#direccion-exacta');

let txt_filtro = document.querySelector('#txt-filtro');
const sct_librerias = document.querySelector('#lista_sucursales');

let llenar_perfil_libreria = async () => {

    let libreriaid = await obtenerLibreriaid(id);
    console.log(libreriaid);

    if (libreriaid) {
        imagen.src = libreriaid['imagen'];
        empresa.innerHTML = libreriaid['empresa'];
        descripcion.innerHTML = libreriaid['descripcion'];
        telefono.innerHTML = libreriaid['telefono'];
        correo.innerHTML = libreriaid['correo'];
        provincia.innerHTML = libreriaid['provincia'];
        canton.innerHTML = libreriaid['canton'];
        distrito.innerHTML = libreriaid['distrito'];
        direccion_exacta.innerHTML = libreriaid['direccion_exacta'];
    }
};

let mostrar_cards = async () => {


    let libreria = await obtenerLibreriaid(id);
    let lista_sucursales = libreria.sucursales;

    for (let i = 0; i < lista_sucursales.length; i++) {

        let contenedor_card = document.createElement('div');
        contenedor_card.classList.add('card');

        let header = document.createElement('header');
        let h2 = document.createElement('h2');
        h2.innerText = lista_sucursales[i]['nombre'];

        header.appendChild(h2);

        let contenedor_atributo = document.createElement('div');
        contenedor_atributo.classList.add('contenedor_atributo');
        let provincia = document.createElement('p');
        let telefono = document.createElement('p');
        provincia.innerText = lista_sucursales[i]['provincia'];
        telefono.innerText = lista_sucursales[i]['telefono'];

        contenedor_atributo.appendChild(provincia);
        contenedor_atributo.appendChild(telefono);
        
        let btn_perfil = document.createElement('button');
        btn_perfil.innerText = 'Ver sucursal';
        btn_perfil.dataset._id = lista_sucursales[i]['_id'];
        btn_perfil.addEventListener('click', function () {
            window.location.href = `p-ver-perfil-sucursal-privada.html?_id=${this.dataset._id}`;
        });

        contenedor_card.appendChild(header);
        contenedor_card.appendChild(contenedor_atributo);
        contenedor_card.appendChild(btn_perfil);

        sct_librerias.appendChild(contenedor_card);

    }
};

let filtrar_cards = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    sct_librerias.innerHTML = '';

    for (let i = 0; i < lista_sucursales.length; i++) {

        if (lista_sucursales[i]['nombre'].toLowerCase().includes(filtro) || lista_sucursales[i]['correo'].toLowerCase().includes(filtro) || lista_sucursales[i]['telefono'].toLowerCase().includes(filtro)) {
            let contenedor_card = document.createElement('div');
            contenedor_card.classList.add('card');

            let header = document.createElement('header');
            let h2 = document.createElement('h2');
            h2.innerText = lista_sucursales[i]['nombre'];

            header.appendChild(h2);

            let contenedor_atributo = document.createElement('div');
            contenedor_atributo.classList.add('contenedor_atributo');
            let correo = document.createElement('p');
            let telefono = document.createElement('p');
            correo.innerText = lista_sucursales[i]['correo'];
            telefono.innerText = lista_sucursales[i]['telefono'];

            contenedor_atributo.appendChild(correo);
            contenedor_atributo.appendChild(telefono);

            let btn_perfil = document.createElement('button');
            btn_perfil.innerText = 'Ver sucursal';
            btn_perfil.dataset._id = lista_sucursales[i]['_id'];
            btn_perfil.addEventListener('click', function () {
                window.location.href = `ver-perfil-sucursal.html?_id=${this.dataset._id}`;
            });

            contenedor_card.appendChild(header);
            contenedor_card.appendChild(contenedor_atributo);
            contenedor_card.appendChild(btn_perfil);

            sct_librerias.appendChild(contenedor_card);
        }
    }
};


mostrar_cards();
txt_filtro.addEventListener('keyup', filtrar_cards);

llenar_perfil_libreria();



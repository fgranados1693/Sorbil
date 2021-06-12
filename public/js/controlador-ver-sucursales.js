'use strict';
let lista_sucursales = [];

let usuarioActivoLibreria = JSON.parse(sessionStorage.getItem('activo'));
let usuario_activo_libreria = usuarioActivoLibreria.correo;

let mostrar_cards = async () => {

    lista_sucursales = await obtenerSucursales(usuario_activo_libreria);

    for (let i = 0; i < lista_sucursales.length; i++) {

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
        
        let celdaPerfil = fila.insertCell();
        let btn_perfil = document.createElement('a');
        btn_perfil.innerText = 'Ver perfil';
        btn_perfil.href = `ver-perfil-sucursal.html?_id=${i}`;
        celdaPerfil.appendChild(btn_perfil);

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

        if (lista_sucursales[i]['empresa'].toLowerCase().includes(filtro) || lista_sucursales[i]['correo'].toLowerCase().includes(filtro) || lista_sucursales[i]['telefono'].toLowerCase().includes(filtro)) {
            let contenedor_card = document.createElement('div');
            contenedor_card.classList.add('card');

            let header = document.createElement('header');
            let h2 = document.createElement('h2');
            h2.innerText = lista_sucursales[i]['empresa'];

            header.appendChild(h2);

            let contenedor_imagen = document.createElement('div');
            contenedor_imagen.classList.add('contenedor_imagen');
            let foto = document.createElement('img');
            foto.src = lista_sucursales[i]['imagen'];

            contenedor_imagen.appendChild(foto);

            let contenedor_atributo = document.createElement('div');
            contenedor_atributo.classList.add('contenedor_atributo');
            let correo = document.createElement('p');
            let telefono = document.createElement('p');
            correo.innerText = lista_sucursales[i]['correo'];
            telefono.innerText = lista_sucursales[i]['telefono'];

            contenedor_atributo.appendChild(correo);
            contenedor_atributo.appendChild(telefono);

            let contenedor_descripcion = document.createElement('div');
            let descripcion = document.createElement('p');
            descripcion.innerText = lista_sucursales[i]['descripcion'];

            contenedor_descripcion.appendChild(descripcion);

            let btn_perfil = document.createElement('button');
            btn_perfil.innerText = 'Ver Sucursal';
            btn_perfil.dataset._id = lista_sucursales[i]['_id'];
            btn_perfil.addEventListener('click', function () {
                window.location.href = `ver-perfil-libreria.html?_id=${this.dataset._id}`;
            });

            contenedor_card.appendChild(header);
            contenedor_card.appendChild(contenedor_imagen);
            contenedor_card.appendChild(contenedor_atributo);
            contenedor_card.appendChild(contenedor_descripcion);
            contenedor_card.appendChild(btn_perfil);

            sct_librerias.appendChild(contenedor_card);
        }
    }
};


mostrar_cards();
txt_filtro.addEventListener('keyup', filtrar_cards);


'use strict';

let sct_libreriasQuienesSomos = document.querySelector('#lista_librerias');
let lista_librerias = [];
let txt_filtroQuienesSomos = document.querySelector('#txt-filtro');

let mostrar_cards = async () => {

    lista_librerias = await obtenerLibrerias();

    for (let i = 0; i < lista_librerias.length; i++) {

        let contenedor_card = document.createElement('div');
        contenedor_card.classList.add('card');

        let header = document.createElement('header');
        let h2 = document.createElement('h2');
        h2.innerText = lista_librerias[i]['empresa'];

        header.appendChild(h2); 

        let contenedor_imagen = document.createElement('div');
        contenedor_imagen.classList.add('contenedor_imagen');
        let foto = document.createElement('img');
        foto.src = lista_librerias[i]['imagen'];

        contenedor_imagen.appendChild(foto);

        let contenedor_atributo = document.createElement('div');
        contenedor_atributo.classList.add('contenedor_atributo');
        let correo = document.createElement('p');
        let telefono = document.createElement('p');
        correo.innerText = lista_librerias[i]['correo'];
        telefono.innerText = lista_librerias[i]['telefono'];

        contenedor_atributo.appendChild(correo);
        contenedor_atributo.appendChild(telefono);

        let contenedor_descripcion = document.createElement('div');
        let descripcion = document.createElement('p');
        descripcion.innerText = lista_librerias[i]['descripcion'];

        contenedor_descripcion.appendChild(descripcion);

        let btn_perfil = document.createElement('button');
        btn_perfil.innerText = 'Ver librería';
        btn_perfil.dataset._id = lista_librerias[i]['_id'];
        btn_perfil.addEventListener('click', function () {
            window.location.href = `ver-perfil-libreria.html?_id=${this.dataset._id}`;
        });

    

        contenedor_card.appendChild(header);
        contenedor_card.appendChild(contenedor_imagen);
        contenedor_card.appendChild(contenedor_atributo);
        contenedor_card.appendChild(contenedor_descripcion);
        contenedor_card.appendChild(btn_perfil);


        sct_libreriasQuienesSomos.appendChild(contenedor_card);
    }

};

let filtrar_cards = async () => {

    let filtro = txt_filtroQuienesSomos.value.toLowerCase();
    sct_libreriasQuienesSomos.innerHTML = '';

    for (let i = 0; i < lista_librerias.length; i++) {

        if (lista_librerias[i]['empresa'].toLowerCase().includes(filtro) || lista_librerias[i]['correo'].toLowerCase().includes(filtro) || lista_librerias[i]['telefono'].toLowerCase().includes(filtro)) {
            let contenedor_card = document.createElement('div');
            contenedor_card.classList.add('card');

            let header = document.createElement('header');
            let h2 = document.createElement('h2');
            h2.innerText = lista_librerias[i]['empresa'];

            header.appendChild(h2);

            let contenedor_imagen = document.createElement('div');
            contenedor_imagen.classList.add('contenedor_imagen');
            let foto = document.createElement('img');
            foto.src = lista_librerias[i]['imagen'];

            contenedor_imagen.appendChild(foto);

            let contenedor_atributo = document.createElement('div');
            contenedor_atributo.classList.add('contenedor_atributo');
            let correo = document.createElement('p');
            let telefono = document.createElement('p');
            correo.innerText = lista_librerias[i]['correo'];
            telefono.innerText = lista_librerias[i]['telefono'];

            contenedor_atributo.appendChild(correo);
            contenedor_atributo.appendChild(telefono);

            // let contenedor_descripcion = document.createElement('div');
            // let descripcion = document.createElement('p');
            // descripcion.innerText = lista_librerias[i]['descripcion'];

            // contenedor_descripcion.appendChild(descripcion);

            let btn_perfil = document.createElement('button');
            btn_perfil.innerText = 'Ver librería';
            btn_perfil.dataset._id = lista_librerias[i]['_id'];
            btn_perfil.addEventListener('click', function () {
                window.location.href = `ver-perfil-libreria.html?_id=${this.dataset._id}`;
            });

            contenedor_card.appendChild(header);
            contenedor_card.appendChild(contenedor_imagen);
            contenedor_card.appendChild(contenedor_atributo);
            // contenedor_card.appendChild(contenedor_descripcion);
            contenedor_card.appendChild(btn_perfil);

            sct_libreriasQuienesSomos.appendChild(contenedor_card);
        }
    }
};


mostrar_cards();
txt_filtroQuienesSomos.addEventListener('keyup', filtrar_cards);
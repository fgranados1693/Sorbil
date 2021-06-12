'use strict';

const sct_clubes = document.querySelector('#lista_clubes');
let lista_clubes = [];
let txt_filtro = document.querySelector('#txt-filtro');

let mostrar_cards = async () => {

    lista_clubes = await obtenerClubes();

    for (let i = 0; i < lista_clubes.length; i++) {

        let contenedor_card = document.createElement('div');
        contenedor_card.classList.add('card');

        let header = document.createElement('header');
        let h2 = document.createElement('h2');
        h2.innerText = lista_clubes[i]['tema'];

        header.appendChild(h2);

        let contenedor_imagen = document.createElement('div');
        contenedor_imagen.classList.add('contenedor_imagen');
        let foto = document.createElement('img');
        foto.src = lista_clubes[i]['imagen'];

        contenedor_imagen.appendChild(foto);

        let contenedor_atributo = document.createElement('div');
        contenedor_atributo.classList.add('contenedor_atributo');
        let categoria = document.createElement('p');
        let genero = document.createElement('p');
        categoria.innerText = lista_clubes[i]['categoria'];
        genero.innerText = lista_clubes[i]['genero'];

        contenedor_atributo.appendChild(categoria);
        contenedor_atributo.appendChild(genero);

        let contenedor_descripcion = document.createElement('div');
        let descripcion = document.createElement('p');
        descripcion.innerText = lista_clubes[i]['descripcion'];

        contenedor_descripcion.appendChild(descripcion);


        let tipo = lista_clubes[i]['tipo'];
        let btn_perfil = document.createElement('button');
        btn_perfil.innerText = 'Ver club';
        btn_perfil.dataset._id = lista_clubes[i]['_id'];
        btn_perfil.addEventListener('click', function () {
            if (tipo == 'Club Presencial') {
                window.location.href = `p-ver-perfil-club-presencial.html?_id=${this.dataset._id}`;
            } else if (tipo == 'Club Virtual') {
                window.location.href = `p-ver-perfil-club-virtual.html?_id=${this.dataset._id}`;
            }
        });

        contenedor_card.appendChild(header);
        contenedor_card.appendChild(contenedor_imagen);
        contenedor_card.appendChild(contenedor_atributo);
        contenedor_card.appendChild(contenedor_descripcion);
        contenedor_card.appendChild(btn_perfil);

        sct_clubes.appendChild(contenedor_card);
    }

};

let filtrar_cards = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    sct_clubes.innerHTML = '';

    for (let i = 0; i < lista_clubes.length; i++) {

        if (lista_clubes[i]['tema'].toLowerCase().includes(filtro) || lista_clubes[i]['genero'].toLowerCase().includes(filtro) || lista_clubes[i]['categoria'].toLowerCase().includes(filtro)) {
            let contenedor_card = document.createElement('div');
            contenedor_card.classList.add('card');

            let header = document.createElement('header');
            let h2 = document.createElement('h2');
            h2.innerText = lista_clubes[i]['tema'];

            header.appendChild(h2);

            let contenedor_imagen = document.createElement('div');
            contenedor_imagen.classList.add('contenedor_imagen');
            let foto = document.createElement('img');
            foto.src = lista_clubes[i]['imagen'];

            contenedor_imagen.appendChild(foto);

            let contenedor_atributo = document.createElement('div');
            contenedor_atributo.classList.add('contenedor_atributo');
            let categoria = document.createElement('p');
            let genero = document.createElement('p');
            categoria.innerText = lista_clubes[i]['categoria'];
            genero.innerText = lista_clubes[i]['genero'];

            contenedor_atributo.appendChild(categoria);
            contenedor_atributo.appendChild(genero);

            let contenedor_descripcion = document.createElement('div');
            let descripcion = document.createElement('p');
            descripcion.innerText = lista_clubes[i]['descripcion'];

            contenedor_descripcion.appendChild(descripcion);


            let tipo = lista_clubes[i]['tipo'];
            let btn_perfil = document.createElement('button');
            btn_perfil.innerText = 'Ver club';
            btn_perfil.dataset._id = lista_clubes[i]['_id'];
            btn_perfil.addEventListener('click', function () {
                if (tipo == 'Club Presencial') {
                    window.location.href = `p-ver-perfil-club-presencial.html?_id=${this.dataset._id}`;
                } else if (tipo == 'Club Virtual') {
                    window.location.href = `p-ver-perfil-club-virtual.html?_id=${this.dataset._id}`;
                }
            });

            contenedor_card.appendChild(header);
            contenedor_card.appendChild(contenedor_imagen);
            contenedor_card.appendChild(contenedor_atributo);
            contenedor_card.appendChild(contenedor_descripcion);
            contenedor_card.appendChild(btn_perfil);

            sct_clubes.appendChild(contenedor_card);
        }
    }
};


mostrar_cards();
txt_filtro.addEventListener('keyup', filtrar_cards);
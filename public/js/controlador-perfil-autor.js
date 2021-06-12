'use strict';

const urlParams = new URLSearchParams(window.location.search);

let _id = urlParams.get('_id');

const imagen = document.querySelector('#imagen');
const autor = document.querySelector('#autor');
const nacionalidad = document.querySelector('#nacionalidad');
const biografia = document.querySelector('#biografia');
const fecha_nacimiento = document.querySelector('#fecha_nacimiento');
const fecha_defuncion = document.querySelector('#fecha_defuncion');

const sct_libros = document.querySelector('#lista_libros');

let llenar_perfil = async() => {
    let autorid = await obtenerAutorid(_id);

    if (autorid) {
        imagen.src = autorid['imagen'];
        autor.innerHTML = autorid['autor'];
        nacionalidad.innerHTML = autorid['nacionalidad'];
        biografia.innerHTML = autorid['biografia'];
        fecha_nacimiento.innerHTML = autorid['fecha_nacimiento'];
        fecha_defuncion.innerHTML = autorid['fecha_defuncion'];

        let fecha_new1 = new Date(autorid['fecha_nacimiento']);
        let fecha_nacimiento_formateada = fecha_new1.getUTCDate() + '-' + Number(fecha_new1.getUTCMonth() + 1) + '-' + fecha_new1.getFullYear();

        fecha_nacimiento.innerHTML = fecha_nacimiento_formateada;


        let fecha_new2 = new Date(autorid['fecha_defuncion']);
        let fecha_defuncion_formateada = fecha_new2.getUTCDate() + '-' + Number(fecha_new2.getUTCMonth() + 1) + '-' + fecha_new2.getFullYear();

        fecha_defuncion.innerHTML = fecha_defuncion_formateada;
    }

    let nombreautor =  autorid['autor'];
    let libros = await obtenerLibroautor(nombreautor);


    for (let i = 0; i < libros.length; i++) {
        if(libros[i].estado == 'habilitado'){

            let contenedor_card = document.createElement('div');
            contenedor_card.classList.add('card');
    
            let header = document.createElement('header');
            let h2 = document.createElement('h2');
            let h3 = document.createElement('h3');
            h2.innerText = libros[i]['titulo'];
    
    
            header.appendChild(h2);
            header.appendChild(h3);
    
            let contenedor_imagen = document.createElement('div');
            contenedor_imagen.classList.add('contenedor_imagen');
            let foto = document.createElement('img');
            foto.src = libros[i]['portada'];
    
            contenedor_imagen.appendChild(foto);
    
            let contenedor_atributo = document.createElement('div');
            contenedor_atributo.classList.add('contenedor_atributo');
            let categoria = document.createElement('p');
            let genero = document.createElement('p');
            categoria.innerText = libros[i]['categoria'];
            genero.innerText = libros[i]['genero'];
    
            contenedor_atributo.appendChild(categoria);
            contenedor_atributo.appendChild(genero);
    
            let contenedor_precio = document.createElement('div');
            contenedor_precio.classList.add('contenedor_precio');
            let precio = document.createElement('p');
            precio.innerText = libros[i]['precio'];
    
            contenedor_precio.appendChild(precio);
    
            let btn_perfil = document.createElement('button');
            btn_perfil.innerText = 'Ver libro';
            btn_perfil.dataset._id = libros[i]['_id'];
            btn_perfil.addEventListener('click', function () {
                window.location.href = `ver-perfil-libro.html?_id=${this.dataset._id}`;
            });
    
            contenedor_card.appendChild(contenedor_imagen);
            contenedor_card.appendChild(header);
            contenedor_card.appendChild(contenedor_atributo);
            contenedor_card.appendChild(contenedor_precio);
            contenedor_card.appendChild(btn_perfil);
    
            sct_libros.appendChild(contenedor_card);
        }
    }

};



llenar_perfil();
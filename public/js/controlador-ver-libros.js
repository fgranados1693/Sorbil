'use strict';

const sct_libros = document.querySelector('#lista_libros');
let lista_libros = [];
let lista_autores = [];
let txt_filtro = document.querySelector('#txt-filtro');

let mostrar_cards = async () => {

    lista_libros = await obtenerLibros();
    lista_autores = await obtenerAutor();

    for (let i = 0; i < lista_libros.length; i++) {
        if(lista_libros[i].estado == 'habilitado'){
        
            let autor = lista_libros[i]['autor'];
            let contenedor_card = document.createElement('div');
            contenedor_card.classList.add('card');
    
            let header = document.createElement('header');
            let h2 = document.createElement('h2');
            let h3 = document.createElement('h3');
            h2.innerText = lista_libros[i]['titulo'];
            h3.innerText = lista_libros[i]['autor'];
    
            let btn_autor = document.createElement('a');
            btn_autor.innerText = `${autor}`;
            for(let x =0; x < lista_autores.length; x++){
                if(lista_autores[x].autor == lista_libros[i]['autor']){
                    btn_autor.dataset._id = lista_autores[x]['_id'];
                }
            }
            btn_autor.addEventListener('click', function () {
                window.location.href = `ver-perfil-autor.html?_id=${this.dataset._id}`;
            });
    
            header.appendChild(h2);
            header.appendChild(h3);
            header.appendChild(btn_autor);
    
            let contenedor_imagen = document.createElement('div');
            contenedor_imagen.classList.add('contenedor_imagen');
            let foto = document.createElement('img');
            foto.src = lista_libros[i]['portada'];
    
            contenedor_imagen.appendChild(foto);
    
            let contenedor_atributo = document.createElement('div');
            contenedor_atributo.classList.add('contenedor_atributo');
            let categoria = document.createElement('p');
            let genero = document.createElement('p');
            categoria.innerText = lista_libros[i]['categoria'];
            genero.innerText = lista_libros[i]['genero'];
    
            contenedor_atributo.appendChild(categoria);
            contenedor_atributo.appendChild(genero);
    
            let contenedor_precio = document.createElement('div');
            contenedor_precio.classList.add('contenedor_precio');
            let precio = document.createElement('p');
            precio.innerText = lista_libros[i]['precio'];
    
            contenedor_precio.appendChild(precio);
    
            let btn_perfil = document.createElement('button');
            btn_perfil.innerText = 'Ver libro';
            btn_perfil.dataset._id = lista_libros[i]['_id'];
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

let filtrar_cards = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    sct_libros.innerHTML = '';

    for (let i = 0; i < lista_libros.length; i++) {

        if (lista_libros[i]['titulo'].toLowerCase().includes(filtro) || lista_libros[i]['categoria'].toLowerCase().includes(filtro) || lista_libros[i]['genero'].toLowerCase().includes(filtro) || lista_libros[i]['autor'].toLowerCase().includes(filtro))  {
            if(lista_libros[i].estado == 'habilitado'){
        
                let autor = lista_libros[i]['autor'];
                let contenedor_card = document.createElement('div');
                contenedor_card.classList.add('card');
        
                let header = document.createElement('header');
                let h2 = document.createElement('h2');
                let h3 = document.createElement('h3');
                h2.innerText = lista_libros[i]['titulo'];
                h3.innerText = lista_libros[i]['autor'];
        
                let btn_autor = document.createElement('a');
                btn_autor.innerText = `${autor}`;
                btn_autor.dataset._id = lista_autores[i]['_id'];
                btn_autor.addEventListener('click', function () {
                    window.location.href = `ver-perfil-autor.html?_id=${this.dataset._id}`;
                });
        
                header.appendChild(h2);
                header.appendChild(h3);
                header.appendChild(btn_autor);
        
                let contenedor_imagen = document.createElement('div');
                contenedor_imagen.classList.add('contenedor_imagen');
                let foto = document.createElement('img');
                foto.src = lista_libros[i]['portada'];
        
                contenedor_imagen.appendChild(foto);
        
                let contenedor_atributo = document.createElement('div');
                contenedor_atributo.classList.add('contenedor_atributo');
                let categoria = document.createElement('p');
                let genero = document.createElement('p');
                categoria.innerText = lista_libros[i]['categoria'];
                genero.innerText = lista_libros[i]['genero'];
        
                contenedor_atributo.appendChild(categoria);
                contenedor_atributo.appendChild(genero);
        
                let contenedor_precio = document.createElement('div');
                contenedor_precio.classList.add('contenedor_precio');
                let precio = document.createElement('p');
                precio.innerText = lista_libros[i]['precio'];
        
                contenedor_precio.appendChild(precio);
        
                let btn_perfil = document.createElement('button');
                btn_perfil.innerText = 'Ver libro';
                btn_perfil.dataset._id = lista_libros[i]['_id'];
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
    }
};


mostrar_cards();
txt_filtro.addEventListener('keyup', filtrar_cards);
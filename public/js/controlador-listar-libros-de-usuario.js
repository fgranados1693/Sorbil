'use strict';


const urlParamsPriv = new URLSearchParams(window.location.search);
let idSuc = urlParamsPriv.get('_id');

let UsuarioEnSesionPriv = JSON.parse(sessionStorage.getItem('activo'));
let UsuarioIdSucursalPriv = UsuarioEnSesionPriv._id;


let input_nombre = document.querySelector('#nombre');
let input_telefono = document.querySelector('#telefono');
let input_provincia = document.querySelector('#provincia');
let input_canton = document.querySelector('#canton');
let input_distrito = document.querySelector('#distrito');

let posicionLib;
let posicionSuc;

const sct_libros = document.querySelector('#lista_libros');

let llenar_perfil_usuario_libros = async() => {
    let ventas = await obtenerVentas();
    let libros = await obtenerLibros();

    for (let i = 0; i < ventas.length; i++) {
        if(ventas[i].idUser == UsuarioIdSucursalPriv){
            for (let j = 0; j < libros.length; j++) {
                if( ventas[i].idLibro == libros[j]._id) {
            
                    let contenedor_card = document.createElement('div');
                    contenedor_card.classList.add('card');
            
                    let header = document.createElement('header');
                    let h2 = document.createElement('h2');
                    let h3 = document.createElement('h3');
                    h2.innerText = libros[j]['titulo'];
            
            
                    header.appendChild(h2);
                    header.appendChild(h3);
            
                    let contenedor_imagen = document.createElement('div');
                    contenedor_imagen.classList.add('contenedor_imagen');
                    let foto = document.createElement('img');
                    foto.src = libros[j]['portada'];
            
                    contenedor_imagen.appendChild(foto);
            
                    let contenedor_atributo = document.createElement('div');
                    contenedor_atributo.classList.add('contenedor_atributo');
                    let categoria = document.createElement('p');
                    let genero = document.createElement('p');
                    categoria.innerText = libros[j]['categoria'];
                    genero.innerText = libros[j]['genero'];
            
                    contenedor_atributo.appendChild(categoria);
                    contenedor_atributo.appendChild(genero);    
                    contenedor_card.appendChild(contenedor_imagen);
                    contenedor_card.appendChild(header);
                    contenedor_card.appendChild(contenedor_atributo);

            
                    sct_libros.appendChild(contenedor_card);
                }
                
            }
        }  
    }
   

    
};

llenar_perfil_usuario_libros();




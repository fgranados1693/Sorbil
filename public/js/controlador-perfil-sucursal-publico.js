'use strict';


const urlParams = new URLSearchParams(window.location.search);
let idSuc = urlParams.get('_id');


let input_nombre = document.querySelector('#nombre');
let input_telefono = document.querySelector('#telefono');
let input_provincia = document.querySelector('#provincia');
let input_canton = document.querySelector('#canton');
let input_distrito = document.querySelector('#distrito');

let posicionLib;
let posicionSuc;

const sct_libros = document.querySelector('#lista_libros');

let encontrarDatos = async()=>{
    let datosLibreria =  await obtenerLibrerias();
    for (let i = 0; i < datosLibreria.length; i++) {
        for (let j = 0; j < datosLibreria[i].sucursales.length; j++) {
            if(datosLibreria[i].sucursales[j]._id == idSuc){
                posicionLib = i;
                posicionSuc = j;
            }
            
        }
        
    }
    return datosLibreria;
}

encontrarDatos();
let llenar_perfil = async() => {
    let datosLibreria =  await obtenerLibrerias();
 
    if (datosLibreria) {

        input_nombre.innerHTML = datosLibreria[posicionLib].sucursales[posicionSuc].nombre;
        input_telefono.innerHTML = datosLibreria[posicionLib].sucursales[posicionSuc].telefono;
        input_provincia.innerHTML = datosLibreria[posicionLib].sucursales[posicionSuc].provincia;
        input_canton.innerHTML = datosLibreria[posicionLib].sucursales[posicionSuc].canton;
        input_distrito.innerHTML = datosLibreria[posicionLib].sucursales[posicionSuc].distrito;
    }

    let libros = await obtenerLibros();
    let librosSuc = datosLibreria[posicionLib].librosSuc;
    for (let x = 0; x < librosSuc.length; x++) {
        for (let j = 0; j < libros.length; j++) {
            if(libros[j]._id == datosLibreria[posicionLib].librosSuc[x].idlibro){
                    if(libros[j].estado == 'habilitado'){
            
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
                
                        let contenedor_precio = document.createElement('div');
                        contenedor_precio.classList.add('contenedor_precio');
                        let precio = document.createElement('p');
                        precio.innerText = libros[j]['precio'];

                        let contenedor_cantidad = document.createElement('div');
                        contenedor_cantidad.classList.add('contenedor_precio');
                        let cantidad = document.createElement('p');
                        cantidad.innerText = datosLibreria[posicionLib].librosSuc[x].cantidad;
                        contenedor_cantidad.appendChild(cantidad);

                        contenedor_precio.appendChild(precio);
                
                        let btn_perfil = document.createElement('button');
                        btn_perfil.innerText = 'Agregar a carrito';
                        btn_perfil.dataset._id = libros[j]['_id'];
                        btn_perfil.addEventListener('click', function () {
                            window.location.href = `u-iniciar-sesion.html`;
                        });
                
                        contenedor_card.appendChild(contenedor_imagen);
                        contenedor_card.appendChild(header);
                        contenedor_card.appendChild(contenedor_atributo);
                        contenedor_card.appendChild(contenedor_cantidad);
                        contenedor_card.appendChild(contenedor_precio);
                        contenedor_card.appendChild(btn_perfil);
                
                        sct_libros.appendChild(contenedor_card);
                    }
                }
            
            
        }
        
    }

    
};


llenar_perfil();




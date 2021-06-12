'use strict';

const urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get('_id');

let titulo = document.querySelector('#title-libro');
let autor = document.querySelector('#autor');
let editorial = document.querySelector('#editorial');
let edicion = document.querySelector('#edicion');
let genero = document.querySelector('#genero');
let categoria = document.querySelector('#categoria');
let idioma = document.querySelector('#idioma');
let precio = document.querySelector('#precio');
let tipo = document.querySelector('#tipo');
let isbn = document.querySelector('#isbn');
let portada = document.querySelector('#portada');
let fecha = document.querySelector('#fecha');
let sinopsis = document.querySelector('#descrip');


let llenarPuntuaciones = async()=>{
    let resennas = await obtenerResennas();
    let suma = 0;
    let cantidad = 0;
    tbody.innerHTML = '';
    for (let i = 0; i < resennas.length; i++) {
      if(resennas[i].idLibro == idLibro){
        suma = suma + resennas[i].calificacion;
        cantidad= cantidad + 1;
      }
      
      let promedio = suma / cantidad;
  
      document.querySelector('#calificacion-libro').innerHTML = promedio.toFixed(2);
      document.querySelector('#cantidad-calificaciones').innerHTML= cantidad;
  
  
      
      
      if(resennas[i].idLibro == idLibro){
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = resennas[i].idUsuario;
        fila.insertCell().innerHTML = resennas[i].comentario;
      }
  
      
    }
  
  
  }
  llenarPuntuaciones();

let llenar_perfil = async() => {

    let libroid = await obtenerLibroid(id);
    
    if(libroid){
        titulo.innerHTML = libroid['titulo'];
        autor.innerHTML = libroid['autor'];
        editorial.innerHTML = libroid['editorial'];
        edicion.innerHTML = libroid['edicion'];
        genero.innerHTML = libroid['genero'];
        categoria.innerHTML = libroid['categoria'];
        idioma.innerHTML = libroid['idioma'];
        precio.innerHTML = libroid['precio'];
        tipo.innerHTML = libroid['tipo'];
        isbn.innerHTML = libroid['isbn'];
        portada.src = libroid['portada'];
        sinopsis.innerHTML = libroid['sinopsis'];

        let fecha_new = new Date(libroid['fecha']);
        let fecha_formateada = fecha_new.getUTCDate() + '-' + Number(fecha_new.getUTCMonth() + 1)  + '-' +  fecha_new.getFullYear();
        fecha.innerHTML = fecha_formateada;
    }

    

};

document.querySelector('#btn-librerias').addEventListener('click', function(){
    window.location.href = 'p-ver-librerias.html';
})

llenar_perfil();



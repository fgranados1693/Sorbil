'use strict';

let valor1 = document.querySelector('#radio1');
let valor2 = document.querySelector('#radio2');
let valor3 = document.querySelector('#radio3');
let valor4 = document.querySelector('#radio4');
let valor5 = document.querySelector('#radio5');
let form = document.querySelector('#ratingsId');
const tbody = document.querySelector('#tabla-filtrado tbody');

let usuarioActivoPerfiComentarios = JSON.parse(sessionStorage.getItem('activo'));
let idusuarioActivoPerfiComentarios = usuarioActivoPerfiComentarios._id;

const urlParametrosss = new URLSearchParams(window.location.search);

let idLibro = urlParametrosss.get('_id');

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

    if(resennas[i].idLibro == idLibro && resennas[i].idUsuario ==idusuarioActivoPerfiComentarios){
      switch(resennas[i].calificacion){
        case 1: {
          valor5.checked = 'checked';
          valor1.removeEventListener('click', registrarComentario5);
          valor2.removeEventListener('click', registrarComentario4);
          valor3.removeEventListener('click', registrarComentario3);
          valor4.removeEventListener('click', registrarComentario2);
          valor5.removeEventListener('click', registrarComentario1);
          valor1.disabled = true;
          valor2.disabled = true;
          valor3.disabled = true;
          valor4.disabled = true;
          valor5.disabled = true;
          form.classList.remove('form-ratings');
          form.classList.add('form-userwithratings');
          break;
        }
        case 2: {
          valor4.checked = 'checked';
          valor1.removeEventListener('click', registrarComentario5);
          valor2.removeEventListener('click', registrarComentario4);
          valor3.removeEventListener('click', registrarComentario3);
          valor4.removeEventListener('click', registrarComentario2);
          valor5.removeEventListener('click', registrarComentario1);
          valor1.disabled = true;
          valor2.disabled = true;
          valor3.disabled = true;
          valor4.disabled = true;
          valor5.disabled = true;
          form.classList.remove('form-ratings');
          form.classList.add('form-userwithratings');
          break;
        }
        case 3: {
          valor3.checked = 'checked';
          valor1.removeEventListener('click', registrarComentario5);
          valor2.removeEventListener('click', registrarComentario4);
          valor3.removeEventListener('click', registrarComentario3);
          valor4.removeEventListener('click', registrarComentario2);
          valor5.removeEventListener('click', registrarComentario1);
          valor1.disabled = true;
          valor2.disabled = true;
          valor3.disabled = true;
          valor4.disabled = true;
          valor5.disabled = true;
          form.classList.remove('form-ratings');
          form.classList.add('form-userwithratings');
          break;
        }
        case 4: {
          valor2.checked = 'checked';
          valor1.removeEventListener('click', registrarComentario5);
          valor2.removeEventListener('click', registrarComentario4);
          valor3.removeEventListener('click', registrarComentario3);
          valor4.removeEventListener('click', registrarComentario2);
          valor5.removeEventListener('click', registrarComentario1);
          valor1.disabled = true;
          valor2.disabled = true;
          valor3.disabled = true;
          valor4.disabled = true;
          valor5.disabled = true;
          form.classList.remove('form-ratings');
          form.classList.add('form-userwithratings');
          break;
        }
        case 5: {
          valor1.checked = 'checked';
          valor1.removeEventListener('click', registrarComentario5);
          valor2.removeEventListener('click', registrarComentario4);
          valor3.removeEventListener('click', registrarComentario3);
          valor4.removeEventListener('click', registrarComentario2);
          valor5.removeEventListener('click', registrarComentario1);
          valor1.disabled = true;
          valor2.disabled = true;
          valor3.disabled = true;
          valor4.disabled = true;
          valor5.disabled = true;
          form.classList.remove('form-ratings');
          form.classList.add('form-userwithratings');
          break;
        }
      }
    }

    
    
    if(resennas[i].idLibro == idLibro){
      let fila = tbody.insertRow();
      fila.insertCell().innerHTML = resennas[i].idUsuario;
      fila.insertCell().innerHTML = resennas[i].comentario;
    }

    
  }


}
llenarPuntuaciones();

let registrarComentario5 = async () =>{
    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputPlaceholder: 'Ingresa su comentario',
        inputAttributes: {
          'aria-label': 'Ingresa su comentario'
        },
        showCancelButton: true
      })
      
      if (text == '') {
        Swal.fire({ //formato json
            title: 'No se ha registrado la información',
            type: 'warning',
            text: 'Debe ingresar su comentario'
        })
      }else{
        registrarComentario(text, 5, idusuarioActivoPerfiComentarios, idLibro);
        Swal.fire({ //formato json
            title: 'Se ha registrado el comentario exitosamente',
            type: 'success',
        }).then((result) => {
          if (result.value) {
              window.location.reload();
          }
      });
      }
}

let registrarComentario4 = async ()=>{
    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputPlaceholder: 'Ingresa su comentario',
        inputAttributes: {
          'aria-label': 'Ingresa su comentario'
        },
        showCancelButton: true
      })
      
      if (text == '') {
        Swal.fire({ //formato json
            title: 'No se ha registrado la información',
            type: 'warning',
            text: 'Debe ingresar su comentario'
        })
      }else{
        registrarComentario(text, 4, idusuarioActivoPerfiComentarios, idLibro);
        Swal.fire({ //formato json
            title: 'Se ha registrado el comentario exitosamente',
            type: 'success',
        }).then((result) => {
          if (result.value) {
              window.location.reload();
          }
      });
      }
}

let registrarComentario3 = async ()=>{
    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputPlaceholder: 'Ingresa su comentario',
        inputAttributes: {
          'aria-label': 'Ingresa su comentario'
        },
        showCancelButton: true
      })
      
      if (text == '') {
        Swal.fire({ //formato json
            title: 'No se ha registrado la información',
            type: 'warning',
            text: 'Debe ingresar su comentario'
        })
      }else{
        registrarComentario(text, 3, idusuarioActivoPerfiComentarios, idLibro);
        Swal.fire({ //formato json
            title: 'Se ha registrado el comentario exitosamente',
            type: 'success',
        }).then((result) => {
          if (result.value) {
              window.location.reload();
          }
      });
      }
}

let registrarComentario2 = async()=>{
    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputPlaceholder: 'Ingresa su comentario',
        inputAttributes: {
          'aria-label': 'Ingresa su comentario'
        },
        showCancelButton: true
      })
      
      if (text == '') {
        Swal.fire({ //formato json
            title: 'No se ha registrado la información',
            type: 'warning',
            text: 'Debe ingresar su comentario'
        })
      }else{
          registrarComentario(text, 2, idusuarioActivoPerfiComentarios, idLibro);
        Swal.fire({ //formato json
            title: 'Se ha registrado el comentario exitosamente',
            type: 'success',
        }).then((result) => {
          if (result.value) {
              window.location.reload();
          }
      });
      }
}

let registrarComentario1 = async()=>{
    const { value: text } = await Swal.fire({
        input: 'textarea',
        inputPlaceholder: 'Ingresa su comentario',
        inputAttributes: {
          'aria-label': 'Ingresa su comentario'
        },
        showCancelButton: true
      })
      
      if (text == '') {
        Swal.fire({ //formato json
            title: 'No se ha registrado la información',
            type: 'warning',
            text: 'Debe ingresar su comentario'
        })
      }else{
          registrarComentario(text, 1, idusuarioActivoPerfiComentarios, idLibro);
        Swal.fire({ //formato json
            title: 'Se ha registrado el comentario exitosamente',
            type: 'success',
        }).then((result) => {
          if (result.value) {
              window.location.reload();
          }
      });
      }
}




valor1.addEventListener('click', registrarComentario5);
valor2.addEventListener('click', registrarComentario4);
valor3.addEventListener('click', registrarComentario3);
valor4.addEventListener('click', registrarComentario2);
valor5.addEventListener('click', registrarComentario1);





'use strict';

const urlParams = new URLSearchParams(window.location.search);

let id = urlParams.get('_id');

let imagen = document.querySelector('#imagen');
let tema = document.querySelector('#tema');
let telefono = document.querySelector('#telefono');
let correo = document.querySelector('#correo');
let categoria = document.querySelector('#categoria');
let genero = document.querySelector('#genero');
let fecha = document.querySelector('#fecha');
let descripcion = document.querySelector('#descripcion');

const btn_registrar = document.querySelector('#btn-registrar');

let llenar_perfil = async () => {

    let clubid = await obtenerClubid(id);

    if (clubid) {
        imagen.src = clubid['imagen'];
        tema.innerHTML = clubid['tema'];
        telefono.innerHTML = clubid['telefono'];
        correo.innerHTML = clubid['correo'];
        categoria.innerHTML = clubid['categoria'];
        genero.innerHTML = clubid['genero'];
        fecha.innerHTML = clubid['fecha'];
        descripcion.innerHTML = clubid['descripcion'];

        let fecha_new = new Date(clubid['fecha']);
        let fecha_formateada = fecha_new.getUTCDate() + '-' + Number(fecha_new.getUTCMonth() + 1) + '-' + fecha_new.getFullYear();
        fecha.innerHTML = fecha_formateada;
    }


};

let registroUsuarioClubV = () =>{
    let usuarioParaSuscribir = JSON.parse(sessionStorage.getItem('activo'));
    let idusuario = usuarioParaSuscribir._id;
    let nombreUsuario = usuarioParaSuscribir.nombre;
    let correo = usuarioParaSuscribir.correo;

    registrarUsuarioAlClub(id, idusuario, nombreUsuario, correo);

    Swal.fire({ //formato json
        title: 'Se ha registrado el usuario exitosamente',
        type: 'success',
    })

    

}

btn_registrar.addEventListener('click', registroUsuarioClubV);

llenar_perfil();
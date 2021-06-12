'use strict';

const urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get('_id');
const avatar = document.querySelector('#avatar');
const txt_nombre = document.querySelector('#txt-nombre');
const txt_correo = document.querySelector('#txt-correo');
const txt_usuario = document.querySelector('#txt-usuario');
const txt_id = document.querySelector('#txt-id');
const txt_primer_apellido = document.querySelector('#txt-primer-apellido');
const txt_segundo_apellido = document.querySelector('#txt-segundo-apellido');
const txt_provincia = document.querySelector('#txt-provincia');
const txt_canton = document.querySelector('#txt-canton');
const txt_distrito = document.querySelector('#txt-distrito');
const btn_modificar = document.querySelector('#btn-modificar');
const btn_eliminar = document.querySelector('#btn-eliminar');


let llenar_perfil = async () => {
    let usuario = await obtenerUsuarioId(_id);
    if (usuario) {
        avatar.src = usuario['avatar'];
        txt_nombre.innerHTML = usuario['nombre'];
        txt_correo.innerHTML = usuario['correo'];
        txt_usuario.innerHTML = usuario['usuario'];
        txt_id.innerHTML = usuario['id'];
        txt_primer_apellido.innerHTML = usuario['primer_apellido'];
        txt_segundo_apellido.innerHTML = usuario['segundo_apellido'];
        txt_provincia.innerHTML = usuario['provincia'];
        txt_canton.innerHTML = usuario['canton'];
        txt_distrito.innerHTML = usuario['distrito'];

    }
};

btn_modificar.addEventListener('click', function () {
    window.location.href = `modificar-perfil-usuario.html?_id=${_id}`;
});


btn_eliminar.addEventListener('click', function () {
    Swal.fire({
        title: '¿Estás seguro que querés eliminar tu cuenta?',
        text: "Ésta acción no se puede revertir",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
        if (result.value) {
            eliminarUsuario(_id);
            Swal.fire(
                '¡Usuario eliminado!',

            ).then((result) => {
                if (result.value) {
                    sessionStorage.clear();
                    window.location.href = '../index.html';
                }
            });
        }
    })
});


llenar_perfil();
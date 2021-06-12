let id_ensesion = UsuarioEnSesion._id;
let btn_perfil2 = document.querySelector('#ver_perfil_usuario');

let typeUser = UsuarioEnSesion.tipo_usuario;


btn_perfil2.addEventListener('click', function () {
        switch (typeUser) {
                case 'u':
                        window.location.href = `ver-perfil-usuario.html?_id=${id_ensesion}`;
                        break;
                case 'al':
                        window.location.href = `ver-perfil-administrador-libreria.html?_id=${id_ensesion}`;
                        break;
                case 'ap':
                        window.location.href = `ver-perfil-administrador-plataforma.html?_id=${id_ensesion}`;
                        break;
        }

});
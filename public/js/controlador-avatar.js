const avatarUser = document.querySelector('#avatar-img');

let UsuarioEnSesion = JSON.parse(sessionStorage.getItem('activo'));

avatarUser.src = UsuarioEnSesion.avatar;



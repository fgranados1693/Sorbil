let usuarioActivo = JSON.parse(sessionStorage.getItem('activo'));
if (usuarioActivo){
    window.location.href = '../index.html'
}

if(usuarioActivo == null){
    console.log('eSCORRECTO');
}

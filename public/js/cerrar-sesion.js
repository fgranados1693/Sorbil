const btn_cerrar_sesion = document.querySelector('#btn-cerrar-sesion');



btn_cerrar_sesion.addEventListener('click', function(){
    sessionStorage.clear();
    window.location.href = '../index.html';
    
});
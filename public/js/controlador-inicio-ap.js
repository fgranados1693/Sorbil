'use strict';

const btn_perfil = document.querySelector('#ver_perfil_admin_plataforma');
//Permisos de usuario para registrar
const btn_registrar_libro = document.querySelector('#registrar_adminap_libro');
const btn_registrar_autor = document.querySelector('#registrar_adminap_autor');
const btn_registrar_sucursal = document.querySelector('#registrar_adminap_sucursal');
const btn_registrar_categoria = document.querySelector('#registrar_adminap_categoria');
const btn_registrar_genero = document.querySelector('#registrar_adminap_genero');
const btn_registrar_oferta = document.querySelector('#registrar_adminap_oferta');
const btn_registrar_club_virtual = document.querySelector('#registrar_adminap_club_virtual');
const btn_registrar_club_presencial = document.querySelector('#registrar_adminap_club_presencial');

//Permisos de usuario para listar
const btn_listar_libros = document.querySelector('#listar_adminap_libros');
const btn_listar_usuarios = document.querySelector('#listar_adminap_usuarios');
const btn_listar_librerias = document.querySelector('#listar_adminap_librerias');
const btn_listar_sucursales = document.querySelector('#listar_adminap_sucursales');
const btn_listar_autores = document.querySelector('#listar_adminap_autores');
const btn_listar_intercambios = document.querySelector('#listar_adminap_intercambios');
const btn_listar_ofertas = document.querySelector('#listar_adminap_ofertas');
const btn_listar_categorias = document.querySelector('#listar_adminap_categorias');
const btn_listar_generos = document.querySelector('#listar_adminap_generos');
const btn_listar_clubes = document.querySelector('#listar_adminap_clubes');
const btn_listar_compras = document.querySelector('#listar_adminap_compras');

//Permisos de usuario para reportes y bitácora
const btn_reportes_libreria = document.querySelector('#adminap_reportes_libreria');
const btn_reportes_generales = document.querySelector('#adminap_reportes_generales');
const btn_bitacora = document.querySelector('#adminap_bitacora');
const btn_solicitudes = document.querySelector('#adminap_solicitudes');
const btn_solicitudes2 = document.querySelector('#adminap_solicitudes2');

usuarioActivo = JSON.parse(sessionStorage.getItem('activo'));
let _id3 = usuarioActivo._id;

btn_perfil.addEventListener('click', function () {
    window.location.href = `ver-perfil-administrador-plataforma.html?_id=${_id3}`
});

//Permisos de usuario para registrar

btn_registrar_sucursal.addEventListener('click', function () {
    window.location.href = `ap-registrar-sucursal.html?_id=${_id3}`
});

btn_registrar_libro.addEventListener('click', function () {
    window.location.href = `ap-registrar-libro.html?_id=${_id3}`
});

btn_registrar_autor.addEventListener('click', function () {
    window.location.href = `ap-registrar-autores.html?_id=${_id3}`
});

btn_registrar_categoria.addEventListener('click', function () {
    window.location.href = `ap-registrar-categorias.html?_id=${_id3}`
});

btn_registrar_genero.addEventListener('click', function () {
    window.location.href = `ap-registrar-generos.html?_id=${_id3}`
});

btn_registrar_oferta.addEventListener('click', function () {
    window.location.href = `ap-registrar-oferta.html?_id=${_id3}`
});

btn_registrar_club_presencial.addEventListener('click', function () {
    window.location.href = `ap-registrar-club-presencial.html?_id=${_id3}`
});

btn_registrar_club_virtual.addEventListener('click', function () {
    window.location.href = `ap-registrar-club-virtual.html?_id=${_id3}`
});


//Permisos de usuario para listar

btn_listar_libros.addEventListener('click', function () {
    window.location.href = `ap-listar-libros.html?_id=${_id3}`
});

btn_listar_usuarios.addEventListener('click', function () {
    window.location.href = `ap-listar-usuarios.html?_id=${_id3}`
});

btn_listar_librerias.addEventListener('click', function () {
    window.location.href = `ap-listar-librerias.html?_id=${_id3}`
});

btn_listar_sucursales.addEventListener('click', function () {
    window.location.href = `ap-listar-sucursales.html?_id=${_id3}`
});

btn_listar_autores.addEventListener('click', function () {
    window.location.href = `ap-listar-autores.html?_id=${_id3}`
});

btn_listar_intercambios.addEventListener('click', function () {
    window.location.href = `ap-listar-intercambios.html?_id=${_id3}`
});

btn_listar_ofertas.addEventListener('click', function () {
    window.location.href = `ap-listar-ofertas.html?_id=${_id3}`
});

btn_listar_categorias.addEventListener('click', function () {
    window.location.href = `ap-listar-categorias.html?_id=${_id3}`
});

btn_listar_generos.addEventListener('click', function () {
    window.location.href = `ap-listar-generos.html?_id=${_id3}`
});

btn_listar_clubes.addEventListener('click', function () {
    window.location.href = `ap-listar-clubes.html?_id=${_id3}`
});

btn_listar_compras.addEventListener('click', function () {
    window.location.href = `ap-listar-compras.html?_id=${_id3}`
});

//Permisos para bitácora y compras

btn_reportes_libreria.addEventListener('click', function () {
    window.location.href = `ap-reportes-libreria.html?_id=${_id3}`
});

btn_reportes_generales.addEventListener('click', function () {
    window.location.href = `ap-reportes-generales.html?_id=${_id3}`
});

btn_bitacora.addEventListener('click', function () {
    window.location.href = `ap-bitacora.html?_id=${_id3}`
});

btn_solicitudes.addEventListener('click', function () {
    window.location.href = `ap-solicitudes.html?_id=${_id3}`
});

btn_solicitudes2.addEventListener('click', function () {
    window.location.href = `ap-solicitudes.html?_id=${_id3}`
});
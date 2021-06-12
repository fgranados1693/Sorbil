'use strict';

const btn_perfil = document.querySelector('#ver_perfil_usuario');
const btn_registrar_club_virtual = document.querySelector('#registrar-club-virtual');
const btn_registrar_club_presencial = document.querySelector('#registrar-club-presencial');
const btn_listar_compras = document.querySelector('#u-listar-compras');
const btn_listar_clubes = document.querySelector('#u-listar-clubes');
const btn_tarjetas = document.querySelector('#u-tarjetas');
const btn_listar_ofertas = document.querySelector('#u-listar-ofertas');
const btn_listar_intercambios = document.querySelector('#u-listar-intercambios');
const btn_listar_calificaciones = document.querySelector('#u-listar-calificaciones');
const btn_listar_notificaciones = document.querySelector('#u-listar-notificaciones');
const btn_seguridad = document.querySelector('#u-seguridad');
const btn_intercambios = document.querySelector('#u-intercambios');
const btn_quienes_somos = document.querySelector('#u-quienes-somos');
const btn_carrito = document.querySelector('#u-carrito');
const btn_clubes_asociados= document.querySelector('#u-listar-clubes-asociados');


usuarioActivo = JSON.parse(sessionStorage.getItem('activo'));
let _id2 = usuarioActivo._id;

btn_perfil.addEventListener('click', function () {
    window.location.href = `ver-perfil-usuario.html?_id=${_id2}`
});

btn_listar_compras.addEventListener('click', function () {
    window.location.href = `p-listar-compras.html?_id=${_id2}`
});

btn_listar_clubes.addEventListener('click', function () {
    window.location.href = `p-listar-clubes.html?_id=${_id2}`
});

btn_tarjetas.addEventListener('click', function () {
    window.location.href = `p-tarjetas.html?_id=${_id2}`
});

btn_listar_ofertas.addEventListener('click', function () {
    window.location.href = `p-listar-ofertas.html?_id=${_id2}`
});

btn_listar_intercambios.addEventListener('click', function () {
    window.location.href = `p-listar-intercambios.html?_id=${_id2}`
});

btn_listar_calificaciones.addEventListener('click', function () {
    window.location.href = `p-listar-calificaciones.html?_id=${_id2}`
});

btn_listar_notificaciones.addEventListener('click', function () {
    window.location.href = `p-notificaciones.html?_id=${_id2}`
});

btn_intercambios.addEventListener('click', function () {
    window.location.href = `p-intercambios.html?_id=${_id2}`
});

btn_quienes_somos.addEventListener('click', function () {
    window.location.href = `p-quienes-somos.html?_id=${_id2}`
});

btn_carrito.addEventListener('click', function () {
    window.location.href = `p-carrito.html?_id=${_id2}`
});

btn_seguridad.addEventListener('click', function () {
    window.location.href = `p-seguridad.html?_id=${_id2}`
});

btn_clubes_asociados.addEventListener('click', function () {
    window.location.href = `p-listar-clubes-asociados.html?_id=${_id2}`
});

btn_registrar_club_virtual.addEventListener('click', function () {
    window.location.href = `p-registrar-club-virtual.html?_id=${_id2}`
});

btn_registrar_club_presencial.addEventListener('click', function () {
    window.location.href = `p-registrar-club-presencial.html?_id=${_id2}`
});


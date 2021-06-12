'use strict';

const tbody = document.querySelector('#tabla-filtrado tbody');
let listar_usuarios = [];
let lista_librerias = [];
let txt_filtro = document.querySelector('#txt-filtro');
const sct_librerias = document.querySelector('#lista-librerias');

let mostrar_cards = async () => {

    listar_usuarios = await obtenerUsuarios();
    lista_librerias = await obtenerLibrerias();

    for (let i = 0; i < listar_usuarios.length; i++) {
        if (listar_usuarios[i].estado == 'pendiente') {
            for (let j = 0; j < lista_librerias.length; j++) {
                if (lista_librerias[j].correo == listar_usuarios[i].correo) {
                    //////////////////////////////////////////////////////
                    let contenedor_card = document.createElement('div');
                    let contenedor_card1 = document.createElement('div');
                    let contenedor_card2 = document.createElement('div');
                    let contenedor_iconos = document.createElement('div');
                    contenedor_card.classList.add('card');
                    contenedor_card1.classList.add('card1');
                    contenedor_card2.classList.add('card2');
                    contenedor_iconos.classList.add('cardIconos');

                    let contenedor_imagen = document.createElement('div');
                    contenedor_imagen.classList.add('contenedor_imagen');
                    let foto = document.createElement('img');
                    foto.src = lista_librerias[j]['imagen'];
                    let foto_avatar = document.createElement('img');
                    foto_avatar.src = listar_usuarios[i]['avatar'];

                    contenedor_imagen.appendChild(foto);
                    contenedor_imagen.appendChild(foto_avatar);

                    // let contenedor_avatar = document.createElement('div');
                    // contenedor_avatar.classList.add('contenedor_avatar');
                    // let foto_avatar = document.createElement('img');
                    // foto_avatar.src = listar_usuarios[i]['avatar'];

                    // contenedor_avatar.appendChild(foto_avatar);
                    let header = document.createElement('header');
                    let icon_header = document.createElement('i');
                    icon_header.className = 'bx bxs-business'; 
                    header.classList.add('header');
                    let h2 = document.createElement('h2');
                    h2.innerText = lista_librerias[j]['empresa'];

                    header.appendChild(icon_header);
                    header.appendChild(h2);

                    let div_nombre = document.createElement('p');
                    div_nombre.classList.add('div_nombre');
                    let p_nombre = document.createElement('p');
                    let p_apellido1 = document.createElement('p');
                    let p_apellido2 = document.createElement('p');
                    p_nombre.innerText = listar_usuarios[i]['nombre'];
                    p_apellido1.innerText = listar_usuarios[i]['primer_apellido'];
                    p_apellido2.innerText = listar_usuarios[i]['segundo_apellido'];

                    div_nombre.appendChild(p_nombre);
                    div_nombre.appendChild(p_apellido1);
                    div_nombre.appendChild(p_apellido2);

                    let div_ubicaciones = document.createElement('p');
                    div_ubicaciones.classList.add('div_ubicaciones');
                    let provincia = document.createElement('p');
                    let cantón = document.createElement('p');
                    let distrito = document.createElement('p');
                    provincia.innerText = lista_librerias[j]['provincia'];
                    cantón.innerText = lista_librerias[j]['canton'];
                    distrito.innerText = lista_librerias[j]['distrito'];

                    div_ubicaciones.appendChild(provincia);
                    div_ubicaciones.appendChild(cantón);
                    div_ubicaciones.appendChild(distrito);

                    let contenedor_atributo = document.createElement('div');
                    contenedor_atributo.classList.add('contenedor_atributo');
                    let icon_mail = document.createElement('i');
                    icon_mail.className = 'bx bx-mail-send'; 
                    let icon_tel = document.createElement('i');
                    icon_tel.className = 'bx bxs-phone-call'; 
                    let correo = document.createElement('p');
                    let telefono = document.createElement('p');
                    correo.innerText = lista_librerias[j]['correo'];
                    telefono.innerText = lista_librerias[j]['telefono'];

                    contenedor_atributo.appendChild(icon_mail);
                    contenedor_atributo.appendChild(correo);
                    contenedor_atributo.appendChild(icon_tel);
                    contenedor_atributo.appendChild(telefono);

                    //////////////////////////////////////////////////////
                    let aIconoActivar = document.createElement('a');
                    aIconoActivar.classList.add('aIconoActivar');
                    aIconoActivar.className = 'card-icon';
                    let iconActivar = document.createElement('i');
                    iconActivar.className = 'bx bxs-check-square';
                    aIconoActivar.appendChild(iconActivar);

                    let aIconoEliminar = document.createElement('a');
                    aIconoEliminar.classList.add('aIconoEliminar');
                    aIconoEliminar.className = 'card-icon';
                    let iconEliminiar = document.createElement('i');
                    iconEliminiar.className = 'bx bxs-x-square';
                    aIconoEliminar.appendChild(iconEliminiar);
                    //////////////////////////////////////////////////////

                    // iconActivar.id = 'habilitadoIon';
                    // aIconoActivar.href = 'ap-solicitudes.html';
                    // aIconoActivar.addEventListener('click', function () {
                    //     habilitarUsuario(listar_usuarios[i]['_id'], "habilitado");
                    //     mostrar_cards();
                    // });

                    //////////////////////////////////////////////////////
                    iconActivar.addEventListener('click', function () {
                        Swal.fire({
                            title: '¿Estás seguro deseas aceptar la solicitud?',
                            text: "Ésta acción no se puede revertir",
                            type: 'info',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí, estoy seguro'
                        }).then((result) => {
                            if (result.value) {
                                habilitarUsuario(listar_usuarios[i]['_id'], "habilitado");
                                habilitarLibreria(lista_librerias[j]['_id'], "habilitado");
                                Swal.fire(
                                    'La solicitud fue aprobada!',
                                ).then((result) => {
                                    if (result.value) {
                                        window.location.reload();
                                    }
                                });
                            }
                        })
                    });
                    //////////////////////////////////////////////////////
                    iconEliminiar.addEventListener('click', function () {
                        Swal.fire({
                            title: '¿Estás seguro deseas rechazar la solicitud?',
                            text: "Ésta acción no se puede revertir",
                            type: 'info',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí, estoy seguro'
                        }).then((result) => {
                            if (result.value) {
                                eliminarUsuario(listar_usuarios[i]['_id']);
                                eliminarLibreria(lista_librerias[j]['_id']);
                                Swal.fire(
                                    'La solicitud fue rechazada!',
                                ).then((result) => {
                                    if (result.value) {
                                        window.location.reload();
                                    }
                                });
                            }
                        })
                    });
                    //////////////////////////////////////////////////////
                    contenedor_card1.appendChild(contenedor_imagen);
                    // contenedor_card1.appendChild(contenedor_avatar);
                    contenedor_card2.appendChild(header);
                    contenedor_card2.appendChild(div_nombre);
                    contenedor_card2.appendChild(div_ubicaciones);
                    contenedor_card2.appendChild(contenedor_atributo);
                    contenedor_iconos.appendChild(aIconoActivar);
                    contenedor_iconos.appendChild(aIconoEliminar);
                    contenedor_card.appendChild(contenedor_card1);
                    contenedor_card.appendChild(contenedor_card2);
                    contenedor_card.appendChild(contenedor_iconos);
                    sct_librerias.appendChild(contenedor_card);
                }
            }
        }
    }
};

let filtrar_cards = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    sct_librerias.innerHTML = '';

    for (let i = 0; i < listar_usuarios.length; i++) {
        if (listar_usuarios[i].estado == 'pendiente') {
            for (let j = 0; j < lista_librerias.length; j++) {
                if (lista_librerias[j].correo == listar_usuarios[i].correo) {
                    if (lista_librerias[j]['empresa'].toLowerCase().includes(filtro) || lista_librerias[j]['correo'].toLowerCase().includes(filtro)) {
                        //////////////////////////////////////////////////////
                        let contenedor_card = document.createElement('div');
                        let contenedor_card1 = document.createElement('div');
                        let contenedor_card2 = document.createElement('div');
                        let contenedor_iconos = document.createElement('div');
                        contenedor_card.classList.add('card');
                        contenedor_card1.classList.add('card1');
                        contenedor_card2.classList.add('card2');
                        contenedor_iconos.classList.add('cardIconos');

                        let contenedor_imagen = document.createElement('div');
                        contenedor_imagen.classList.add('contenedor_imagen');
                        let foto = document.createElement('img');
                        foto.src = lista_librerias[j]['imagen'];
                        let foto_avatar = document.createElement('img');
                        foto_avatar.src = listar_usuarios[i]['avatar'];

                        contenedor_imagen.appendChild(foto);
                        contenedor_imagen.appendChild(foto_avatar);

                        // let contenedor_avatar = document.createElement('div');
                        // contenedor_avatar.classList.add('contenedor_avatar');
                        // let foto_avatar = document.createElement('img');
                        // foto_avatar.src = listar_usuarios[i]['avatar'];

                        // contenedor_avatar.appendChild(foto_avatar);
                        let header = document.createElement('header');
                        let icon_header = document.createElement('i');
                        icon_header.className = 'bx bxs-business';
                        header.classList.add('header');
                        let h2 = document.createElement('h2');
                        h2.innerText = lista_librerias[j]['empresa'];

                        header.appendChild(icon_header);
                        header.appendChild(h2);

                        let div_nombre = document.createElement('p');
                        div_nombre.classList.add('div_nombre');
                        let p_nombre = document.createElement('p');
                        let p_apellido1 = document.createElement('p');
                        let p_apellido2 = document.createElement('p');
                        p_nombre.innerText = listar_usuarios[i]['nombre'];
                        p_apellido1.innerText = listar_usuarios[i]['primer_apellido'];
                        p_apellido2.innerText = listar_usuarios[i]['segundo_apellido'];

                        div_nombre.appendChild(p_nombre);
                        div_nombre.appendChild(p_apellido1);
                        div_nombre.appendChild(p_apellido2);

                        let div_ubicaciones = document.createElement('p');
                        div_ubicaciones.classList.add('div_ubicaciones');
                        let provincia = document.createElement('p');
                        let cantón = document.createElement('p');
                        let distrito = document.createElement('p');
                        provincia.innerText = lista_librerias[j]['provincia'];
                        cantón.innerText = lista_librerias[j]['canton'];
                        distrito.innerText = lista_librerias[j]['distrito'];

                        div_ubicaciones.appendChild(provincia);
                        div_ubicaciones.appendChild(cantón);
                        div_ubicaciones.appendChild(distrito);

                        let contenedor_atributo = document.createElement('div');
                        contenedor_atributo.classList.add('contenedor_atributo');
                        let icon_mail = document.createElement('i');
                        icon_mail.className = 'bx bx-mail-send';
                        let icon_tel = document.createElement('i');
                        icon_tel.className = 'bx bxs-phone-call';
                        let correo = document.createElement('p');
                        let telefono = document.createElement('p');
                        correo.innerText = lista_librerias[j]['correo'];
                        telefono.innerText = lista_librerias[j]['telefono'];

                        contenedor_atributo.appendChild(icon_mail);
                        contenedor_atributo.appendChild(correo);
                        contenedor_atributo.appendChild(icon_tel);
                        contenedor_atributo.appendChild(telefono);

                        //////////////////////////////////////////////////////
                        let aIconoActivar = document.createElement('a');
                        aIconoActivar.classList.add('aIconoActivar');
                        aIconoActivar.className = 'card-icon';
                        let iconActivar = document.createElement('i');
                        iconActivar.className = 'bx bxs-check-square';
                        aIconoActivar.appendChild(iconActivar);

                        let aIconoEliminar = document.createElement('a');
                        aIconoEliminar.classList.add('aIconoEliminar');
                        aIconoEliminar.className = 'card-icon';
                        let iconEliminiar = document.createElement('i');
                        iconEliminiar.className = 'bx bxs-x-square';
                        aIconoEliminar.appendChild(iconEliminiar);
                        //////////////////////////////////////////////////////

                        // iconActivar.id = 'habilitadoIon';
                        // aIconoActivar.href = 'ap-solicitudes.html';
                        // aIconoActivar.addEventListener('click', function () {
                        //     habilitarUsuario(listar_usuarios[i]['_id'], "habilitado");
                        //     mostrar_cards();
                        // });

                        //////////////////////////////////////////////////////
                        iconActivar.addEventListener('click', function () {
                            Swal.fire({
                                title: '¿Estás seguro deseas aceptar la solicitud?',
                                text: "Ésta acción no se puede revertir",
                                type: 'info',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Sí, estoy seguro'
                            }).then((result) => {
                                if (result.value) {
                                    habilitarUsuario(listar_usuarios[i]['_id'], "habilitado");
                                    habilitarLibreria(lista_librerias[j]['_id'], "habilitado");
                                    Swal.fire(
                                        'La solicitud fue aprobada!',
                                    ).then((result) => {
                                        if (result.value) {
                                            window.location.reload();
                                        }
                                    });
                                }
                            })
                        });
                        //////////////////////////////////////////////////////
                        iconEliminiar.addEventListener('click', function () {
                            Swal.fire({
                                title: '¿Estás seguro deseas rechazar la solicitud?',
                                text: "Ésta acción no se puede revertir",
                                type: 'info',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Sí, estoy seguro'
                            }).then((result) => {
                                if (result.value) {
                                    eliminarUsuario(listar_usuarios[i]['_id']);
                                    eliminarLibreria(lista_librerias[j]['_id']);
                                    Swal.fire(
                                        'La solicitud fue rechazada!',
                                    ).then((result) => {
                                        if (result.value) {
                                            window.location.reload();
                                        }
                                    });
                                }
                            })
                        });
                        //////////////////////////////////////////////////////
                        contenedor_card1.appendChild(contenedor_imagen);
                        // contenedor_card1.appendChild(contenedor_avatar);
                        contenedor_card2.appendChild(header);
                        contenedor_card2.appendChild(div_nombre);
                        contenedor_card2.appendChild(div_ubicaciones);
                        contenedor_card2.appendChild(contenedor_atributo);
                        contenedor_iconos.appendChild(aIconoActivar);
                        contenedor_iconos.appendChild(aIconoEliminar);
                        contenedor_card.appendChild(contenedor_card1);
                        contenedor_card.appendChild(contenedor_card2);
                        contenedor_card.appendChild(contenedor_iconos);
                        sct_librerias.appendChild(contenedor_card);
                    }
                }
            }
        }
    }
};


mostrar_cards();
txt_filtro.addEventListener('keyup', filtrar_cards);
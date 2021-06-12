'use strict';

const tbody = document.querySelector('#tabla-filtrado tbody');
let lista_clubes = [];
let txt_filtro = document.querySelector('#txt-filtro');
let usuarioActivolis = JSON.parse(sessionStorage.getItem('activo'));
let tipoUserlis = usuarioActivo.tipo_usuario;

let mostrar_tabla = async () => {

    lista_clubes = await obtenerClubes();
    console.log(lista_clubes)
    tbody.innerHTML = '';

    for (let i = 0; i < lista_clubes.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = lista_clubes[i]['tipo'];
        fila.insertCell().innerHTML = lista_clubes[i]['nombre'];
        fila.insertCell().innerHTML = lista_clubes[i]['tema'];
        fila.insertCell().innerHTML = lista_clubes[i]['categoria'];
        fila.insertCell().innerHTML = lista_clubes[i]['genero'];

        let tipo = lista_clubes[i]['tipo'];

        let celdaPerfil = fila.insertCell();
        let aPerfil = document.createElement('a');
        let iPerfil = document.createElement('i');
        iPerfil.className = 'bx bx-show';
        aPerfil.dataset._id = lista_clubes[i]['_id'];
        aPerfil.appendChild(iPerfil);

        let celdaIconoEditar = fila.insertCell();
        let aIconoEditar = document.createElement('a');
        let iconeditar = document.createElement('i');
        iconeditar.className = 'bx bxs-edit-alt';
        aIconoEditar.appendChild(iconeditar);


        let celdaIconoActivar = fila.insertCell();
        let aIconoAc = document.createElement('a');
        aIconoAc.className = 'list-icon';
        let iconAc = document.createElement('i');
        iconAc.className = 'bx bxs-check-square';
        aIconoAc.appendChild(iconAc);

        let celdaIconoEliminar = fila.insertCell();
        let aIconoEliminar = document.createElement('a');
        aIconoEliminar.className = 'habilitadoIon list-icon';
        let iconEliminiar = document.createElement('i');
        iconEliminiar.className = 'bx bxs-trash';
        aIconoEliminar.appendChild(iconEliminiar);

        if (lista_clubes[i].estado == 'habilitado') {
            iconAc.id = 'habilitadoIon';
            aPerfil.addEventListener('click', function () {
                if (tipo == 'Club Presencial') {
                    window.location.href = `ver-perfil-club-presencial.html?_id=${this.dataset._id}`;
                } else if (tipo == 'Club Virtual') {
                    window.location.href = `ver-perfil-club-virtual.html?_id=${this.dataset._id}`;
                }
            });
            aPerfil.className = 'list-icon';
            aIconoEditar.className = 'list-icon';
            iconAc.addEventListener('click', function () {
                let estado = 'desabilitado';
                deshabilitarClub(lista_clubes[i]._id, estado);
                window.location.reload();
            });

            iconeditar.addEventListener('click', function () {
                switch (tipoUserlis) {
                    case 'al': {
                        if (tipo == 'Club Presencial') {
                            window.location.href = `al-modificar-club-presencial.html?_id=${lista_clubes[i]['_id']}`;
                        } else if (tipo == 'Club Virtual') {
                            window.location.href = `al-modificar-club-virtual.html?_id=${lista_clubes[i]['_id']}`;
                        }
                        break;
                    }
                    case 'ap': {
                        if (tipo == 'Club Presencial') {
                            window.location.href = `ap-modificar-club-presencial.html?_id=${lista_clubes[i]['_id']}`;
                        } else if (tipo == 'Club Virtual') {
                            window.location.href = `ap-modificar-club-virtual.html?_id=${lista_clubes[i]['_id']}`;
                        }
                        break;
                    }
                    case 'u': {
                        if (tipo == 'Club Presencial') {
                            window.location.href = `p-modificar-club-presencial.html?_id=${lista_clubes[i]['_id']}`;
                        } else if (tipo == 'Club Virtual') {
                            window.location.href = `p-modificar-club-virtual.html?_id=${lista_clubes[i]['_id']}`;
                        }
                        break;
                    }
                }
            });


        } else {
            aPerfil.className = 'list-iconDisable';
            aIconoEditar.className = 'list-iconDisable';
            iconAc.addEventListener('click', function () {
                let estado = 'habilitado';
                habilitarClub(lista_clubes[i]._id, estado);
                window.location.reload();
            });
        }

        iconEliminiar.addEventListener('click', function () {
            Swal.fire({
                title: '¿Está seguro de eliminar el club?',
                text: "Ésta acción no se puede revertir",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, estoy seguro'
            }).then((result) => {
                if (result.value) {
                    eliminarClub(lista_clubes[i]._id);

                    Swal.fire(
                        'Club eliminado!',
                        'success'
                    ).then((result) => {
                        if (result.value) {
                            window.location.reload();
                        }
                    });
                }
            })
        });

        celdaIconoEditar.appendChild(aIconoEditar);
        celdaIconoActivar.appendChild(aIconoAc);
        celdaPerfil.appendChild(aPerfil);
        celdaIconoEliminar.appendChild(aIconoEliminar);

    }

};

let filtrar_tabla = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_clubes.length; i++) {
        if (lista_clubes[i]['tipo'].toLowerCase().includes(filtro) || lista_clubes[i]['nombre'].toLowerCase().includes(filtro) || lista_clubes[i]['tema'].toLowerCase().includes(filtro) || lista_clubes[i]['categoria'].toLowerCase().includes(filtro) || lista_clubes[i]['genero'].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_clubes[i]['tipo'];
            fila.insertCell().innerHTML = lista_clubes[i]['nombre'];
            fila.insertCell().innerHTML = lista_clubes[i]['tema'];
            fila.insertCell().innerHTML = lista_clubes[i]['categoria'];
            fila.insertCell().innerHTML = lista_clubes[i]['genero'];

            let tipo = lista_clubes[i]['tipo'];

            let celdaPerfil = fila.insertCell();
            let aPerfil = document.createElement('a');
            let iPerfil = document.createElement('i');
            iPerfil.className = 'bx bx-show';
            aPerfil.dataset._id = lista_clubes[i]['_id'];
            aPerfil.appendChild(iPerfil);

            let celdaIconoEditar = fila.insertCell();
            let aIconoEditar = document.createElement('a');
            let iconeditar = document.createElement('i');
            iconeditar.className = 'bx bxs-edit-alt';
            aIconoEditar.appendChild(iconeditar);


            let celdaIconoActivar = fila.insertCell();
            let aIconoAc = document.createElement('a');
            aIconoAc.className = 'list-icon';
            let iconAc = document.createElement('i');
            iconAc.className = 'bx bxs-check-square';
            aIconoAc.appendChild(iconAc);

            if (lista_clubes[i].estado == 'habilitado') {
                iconAc.id = 'habilitadoIon';
                aPerfil.addEventListener('click', function () {
                    if (tipo == 'Club Presencial') {
                        window.location.href = `ver-perfil-club-presencial.html?_id=${this.dataset._id}`;
                    } else if (tipo == 'Club Virtual') {
                        window.location.href = `ver-perfil-club-virtual.html?_id=${this.dataset._id}`;
                    }
                });
                aPerfil.className = 'list-icon';
                aIconoEditar.className = 'list-icon';
                iconAc.addEventListener('click', function () {
                    let estado = 'desabilitado';
                    deshabilitar(lista_clubes[i]._id, estado);
                    window.location.reload();
                });

                iconeditar.addEventListener('click', function () {
                    if (tipo == 'Club Presencial') {
                        window.location.href = `al-modificar-club-presencial.html?_id=${lista_clubes[i]['_id']}`;
                    } else if (tipo == 'Club Virtual') {
                        window.location.href = `al-modificar-club-virtual.html?_id=${lista_clubes[i]['_id']}`;
                    }
                });


            } else {
                aPerfil.className = 'list-iconDisable';
                aIconoEditar.className = 'list-iconDisable';
                iconAc.addEventListener('click', function () {
                    let estado = 'habilitado';
                    habilitar(lista_clubes[i]._id, estado);
                    window.location.reload();
                });
            }

            celdaIconoEditar.appendChild(aIconoEditar);
            celdaIconoActivar.appendChild(aIconoAc);
            celdaPerfil.appendChild(aPerfil);

        }

    }

};


mostrar_tabla();
txt_filtro.addEventListener('keyup', filtrar_tabla);
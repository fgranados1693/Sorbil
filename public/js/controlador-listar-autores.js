'use strict';

const tbody = document.querySelector('#tabla-filtrado tbody');
let lista_autores = [];
let txt_filtro = document.querySelector('#txt-filtro');

let mostrar_tabla = async () => {

    lista_autores = await obtenerAutor();
    tbody.innerHTML = '';

    for (let i = 0; i < lista_autores.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = lista_autores[i]['autor'];

        let celdaPerfil = fila.insertCell();
        let aPerfil = document.createElement('a');
        let iPerfil = document.createElement('i');
        iPerfil.className = 'bx bx-show';
        aPerfil.dataset._id = lista_autores[i]['_id'];
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

        if (lista_autores[i].estado == 'habilitado') {
            iconAc.id = 'habilitadoIon';
            aPerfil.addEventListener('click', function () {
                Swal.fire({
                    title: '¿Desea salir de la plataforma de administrador?',
                    text: "Para poder ver los perfiles se debe salir de la plataforma de administración",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, estoy seguro'
                }).then((result) => {
                    if (result.value) {
                        window.location.href = `ver-perfil-autor.html?_id=${this.dataset._id}`;
                    }
                });
                
            });
            aPerfil.className = 'list-icon';
            aIconoEditar.className = 'list-icon';
            iconAc.addEventListener('click', function () {
                let estado = 'desabilitado';
                deshabilitarAutor(lista_autores[i]._id, estado);
                window.location.reload();
            });

            iconeditar.addEventListener('click', function () {
                window.location.href = `ap-modificar-autor.html?_id=${lista_autores[i]['_id']}`;
            });

        } else {
            aPerfil.className = 'list-iconDisable';
            aIconoEditar.className = 'list-iconDisable';
            iconAc.addEventListener('click', function () {
                let estado = 'habilitado';
                habilitarAutor(lista_autores[i]._id, estado);
                window.location.reload();
            });
        }

        iconEliminiar.addEventListener('click', function () {
            Swal.fire({
                title: '¿Está seguro de eliminar el autor?',
                text: "Ésta acción no se puede revertir",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, estoy seguro'
            }).then((result) => {
                if (result.value) {
                    eliminarAutor(lista_autores[i]._id);

                    Swal.fire(
                        'Autor eliminado!',
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
}

let filtrar_tabla = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    lista_autores = await obtenerAutor();
    tbody.innerHTML = '';
    tbody.innerHTML = '';


    for (let i = 0; i < lista_autores.length; i++) {
        if (lista_autores[i]["autor"].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_autores[i]['autor'];

            let celdaPerfil = fila.insertCell();
            let aPerfil = document.createElement('a');
            let iPerfil = document.createElement('i');
            iPerfil.className = 'bx bx-show';
            aPerfil.dataset._id = lista_autores[i]['_id'];
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

            if (lista_autores[i].estado == 'habilitado') {
                iconAc.id = 'habilitadoIon';
                aPerfil.addEventListener('click', function () {
                    window.location.href = `ver-perfil-autor.html?_id=${this.dataset._id}`;
                });
                aPerfil.className = 'list-icon';
                aIconoEditar.className = 'list-icon';
                iconAc.addEventListener('click', function () {
                    let estado = 'desabilitado';
                    deshabilitarAutor(lista_autores[i]._id, estado);
                    window.location.reload();
                });

                iconeditar.addEventListener('click', function () {
                    window.location.href = `ap-editar-autor.html?_id=${lista_autores[i]['_id']}`;
                });

            } else {
                aPerfil.className = 'list-iconDisable';
                aIconoEditar.className = 'list-iconDisable';
                iconAc.addEventListener('click', function () {
                    let estado = 'habilitado';
                    habilitarAutor(lista_autores[i]._id, estado);
                    window.location.reload();
                });
            }

            iconEliminiar.addEventListener('click', function () {
                Swal.fire({
                    title: '¿Está seguro de eliminar el autor?',
                    text: "Ésta acción no se puede revertir",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, estoy seguro'
                }).then((result) => {
                    if (result.value) {
                        eliminarAutor(lista_autores[i]._id);

                        Swal.fire(
                            'Autor eliminado!',
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

    }


};

mostrar_tabla();
txt_filtro.addEventListener('keyup', filtrar_tabla);
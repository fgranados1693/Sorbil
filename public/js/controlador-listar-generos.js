'use strict';

const tbody = document.querySelector('#tabla-filtrado tbody');
let lista_generos = [];
const txt_filtro = document.querySelector('#txt-filtro');
let usuarioActivolis = JSON.parse(sessionStorage.getItem('activo'));
let tipoUserlis = usuarioActivo.tipo_usuario;

let mostrar_tabla = async () => {

    lista_generos = await obtenerGeneros();
    console.log(lista_generos);
    tbody.innerHTML = '';

    for (let i = 0; i < lista_generos.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = lista_generos[i]['genero'];

        let celdaIcono = fila.insertCell();
        let aIcono = document.createElement('a');

        let icon = document.createElement('i');
        icon.className = 'bx bxs-edit-alt';
        aIcono.appendChild(icon);

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

        if (lista_generos[i].estado == 'habilitado') {
            iconAc.id = 'habilitadoIon';
            aIcono.className = 'habilitadoIon';
            iconAc.addEventListener('click', function () {
                let estado = 'desabilitado';
                deshabilitarGenero(lista_generos[i]._id, estado);
                window.location.reload();
            });
            icon.addEventListener('click', function () {
                // window.location.href = `al-modificar-genero.html?_id=${lista_generos[i]['_id']}`;
                switch (tipoUserlis) {
                    case 'al': {
                        window.location.href = `al-modificar-genero.html?_id=${lista_generos[i]['_id']}`;
                        break;
                    }
                    case 'ap': {
                        window.location.href = `ap-modificar-genero.html?_id=${lista_generos[i]['_id']}`;
                        break;
                    }
                }
            });
        } else {
            aIcono.className = 'list-iconDisable';
            iconAc.addEventListener('click', function () {
                let estado = 'habilitado';
                habilitarGenero(lista_generos[i]._id, estado);
                window.location.reload();
            });
        }

        iconEliminiar.addEventListener('click', function () {
            Swal.fire({
                title: '¿Está seguro de eliminar el género?',
                text: "Ésta acción no se puede revertir",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, estoy seguro'
            }).then((result) => {
                if (result.value) {
                    eliminarGenero(lista_generos[i]._id);

                    Swal.fire(
                        'Genero eliminado!',
                        'success'
                    ).then((result) => {
                        if (result.value) {
                            window.location.reload();
                        }
                    });
                }
            })
        });

        celdaIcono.appendChild(aIcono);
        celdaIconoActivar.appendChild(aIconoAc);
        celdaIconoEliminar.appendChild(aIconoEliminar);
    }
};


let filtrar_tabla = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_generos.length; i++) {
        if (lista_generos[i]['genero'].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_generos[i]['genero'];

            let celdaIcono = fila.insertCell();
            let aIcono = document.createElement('a');

            let icon = document.createElement('i');
            icon.className = 'bx bxs-edit-alt';
            aIcono.appendChild(icon);

            let celdaIconoActivar = fila.insertCell();
            let aIconoAc = document.createElement('a');
            aIconoAc.className = 'list-icon';
            let iconAc = document.createElement('i');
            iconAc.className = 'bx bxs-check-square';
            aIconoAc.appendChild(iconAc);
            if (lista_generos[i].estado == 'habilitado') {
                iconAc.id = 'habilitadoIon';
                aIcono.className = 'list-icon';
                iconAc.addEventListener('click', function () {
                    let estado = 'desabilitado';
                    cambiarEstadoGeneros(lista_generos[i]._id, estado);
                    window.location.reload();
                });
                icon.addEventListener('click', function () {
                    window.location.href = `al-modificar-genero.html?_id=${lista_generos[i]['_id']}`;
                });
            } else {
                aIcono.className = 'list-iconDisable';
                iconAc.addEventListener('click', function () {
                    let estado = 'habilitado';
                    cambiarEstadoGeneros(lista_generos[i]._id, estado);
                    window.location.reload();
                });
            }

            celdaIcono.appendChild(aIcono);
            celdaIconoActivar.appendChild(aIconoAc);
        }
    }
};

mostrar_tabla();

txt_filtro.addEventListener('keyup', filtrar_tabla);



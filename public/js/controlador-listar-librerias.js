'use strict';

const tbody = document.querySelector('#tabla-filtrado tbody');
let lista_librerias = [];
let txt_filtro = document.querySelector('#txt-filtro');

let mostrar_tabla = async () => {

    lista_librerias = await obtenerLibrerias();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_librerias.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = lista_librerias[i]['empresa'];
        fila.insertCell().innerHTML = lista_librerias[i]['correo'];
        fila.insertCell().innerHTML = lista_librerias[i]['telefono'];
        fila.insertCell().innerHTML = lista_librerias[i]['provincia'];

        let celdaPerfil = fila.insertCell();
        let aPerfil = document.createElement('a');
        let iPerfil = document.createElement('i');
        iPerfil.className  = 'bx bx-show';
        aPerfil.className = 'list-icon';
        aPerfil.appendChild(iPerfil);
        celdaPerfil.appendChild(aPerfil);

        aPerfil.addEventListener('click',function(){
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
                    window.location.href = `ver-perfil-libreria.html?_id=${lista_librerias[i]._id}`;
                }
            });
            
        });

        let celdaIconoEliminar = fila.insertCell();
        let aIconoEliminar = document.createElement('a');
        aIconoEliminar.className = 'list-icon';
        let iconEliminiar = document.createElement('i');
        iconEliminiar.className  = 'bx bxs-trash';
        aIconoEliminar.appendChild(iconEliminiar);
        aIconoEliminar.addEventListener('click', function(){
            Swal.fire({
                title: '¿Está seguro de eliminar la categoría?',
                text: "Ésta acción no se puede revertir",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sí, estoy seguro'
            }).then((result) => {
                if (result.value) {
                    eliminarLibreria(lista_librerias[i]._id);

                    Swal.fire(
                        'Categoría eliminada!'
                    ).then((result) => {
                        if (result.value) {
                            window.location.reload();
                        }
                    });
                }
            })
        });



        celdaIconoEliminar.appendChild(aIconoEliminar);
    }
};


let filtrar_tabla = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_librerias.length; i++) {
        if (lista_librerias[i]['empresa'].toLowerCase().includes(filtro) || lista_librerias[i]['correo'].toLowerCase().includes(filtro) || lista_librerias[i]['telefono'].toLowerCase().includes(filtro) || lista_librerias[i]['provincia'].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_librerias[i]['empresa'];
            fila.insertCell().innerHTML = lista_librerias[i]['correo'];
            fila.insertCell().innerHTML = lista_librerias[i]['telefono'];
            fila.insertCell().innerHTML = lista_librerias[i]['provincia'];

            let celda_perfil = fila.insertCell();
            let boton_perfil = document.createElement('button');
            boton_perfil.type = 'button';
            boton_perfil.innerText = 'Ver perfil';
            boton_perfil.dataset._id = lista_librerias[i]['_id'];
    
            celda_perfil.appendChild(boton_perfil);
    
            boton_perfil.addEventListener('click',function(){
                window.location.href = `ver-perfil-libreria.html?_id=${this.dataset._id}`;
            });
        }

    }


};


mostrar_tabla();
txt_filtro.addEventListener('keyup', filtrar_tabla);

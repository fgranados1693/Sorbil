'use strict';

const tbody = document.querySelector('#tabla-filtrado tbody');
let lista_categoria = [];
const txt_filtro = document.querySelector('#txt-filtro');
let usuarioActivolis = JSON.parse(sessionStorage.getItem('activo'));
let tipoUserlis = usuarioActivo.tipo_usuario;



let mostrar_tabla = async () => {

    lista_categoria = await obtenerCategorias();
    tbody.innerHTML = '';

    for (let i = 0; i < lista_categoria.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = lista_categoria[i]['categoria'];

        let celdaIcono = fila.insertCell();
        let aIcono = document.createElement('a');
        let icon = document.createElement('i');
        icon.className  = 'bx bxs-edit-alt';
        aIcono.appendChild(icon);

        let celdaIconoActivar = fila.insertCell();
        let aIconoAc = document.createElement('a');
        aIconoAc.className = 'list-icon';
        let iconAc = document.createElement('i');
        iconAc.className  = 'bx bxs-check-square';
        aIconoAc.appendChild(iconAc);

        let celdaIconoEliminar = fila.insertCell();
        let aIconoEliminar = document.createElement('a');
        aIconoEliminar.className = 'list-icon';
        let iconEliminiar = document.createElement('i');
        iconEliminiar.className  = 'bx bxs-trash';
        aIconoEliminar.appendChild(iconEliminiar);

        if(lista_categoria[i].estado == 'habilitado'){
            iconAc.id = 'habilitadoIon';
            aIcono.className = 'habilitadoIon';
            iconAc.addEventListener('click', function(){
                let estado = 'desabilitado';
                cambiarEstadoCatergorias(lista_categoria[i]._id, estado);
                window.location.reload();
            });
            icon.addEventListener('click', function(){
                switch(tipoUserlis){
                    case 'al': {window.location.href = `al-modificar-categoria.html?_i=${i}`;
                break;}
                    case 'ap' :{ window.location.href = `ap-modificar-categoria.html?_i=${i}`;
                    break;}
                }
                
            });
        }else{
            aIcono.className = 'list-iconDisable';
            iconAc.addEventListener('click', function(){
                let estado = 'habilitado';
                cambiarEstadoCatergorias(lista_categoria[i]._id, estado);
                window.location.reload();
            });
        }
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
                    eliminarcategoria(lista_categoria[i]._id);

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

        celdaIcono.appendChild(aIcono);
        celdaIconoActivar.appendChild(aIconoAc);
        celdaIconoEliminar.appendChild(aIconoEliminar);
    }
};


let filtrar_tabla = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_categoria.length; i++) {
        if (lista_categoria[i]['categoria'].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_categoria[i]['categoria'];
        }

    }


};

mostrar_tabla();

txt_filtro.addEventListener('keyup', filtrar_tabla);
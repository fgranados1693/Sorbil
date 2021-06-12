'use strict';

const tbody = document.querySelector('#tabla-filtrado tbody');
let lista_libros = [];
let txt_filtro = document.querySelector('#txt_filtro');


let lista_ofertas = [];

let mostrar_tabla = async () => {

    lista_libros = await obtenerLibros();
    lista_ofertas = await obtenerOfertas();
    tbody.innerHTML = '';

    for (let i = 0; i < lista_libros.length; i++) {

        lista_ofertas = lista_libros[i]['ofertas'];

        for (let j = 0; j < lista_ofertas.length; j++) {

            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_libros[i]['titulo'];
            fila.insertCell().innerHTML = lista_libros[i]['autor'];
            fila.insertCell().innerHTML = lista_libros[i]['precio'];
            fila.insertCell().innerHTML = lista_libros[i]['tipo'];
            fila.insertCell().innerHTML = lista_ofertas[j]['porcentaje'];
            

            let celdaIcono = fila.insertCell();
            let aIcono = document.createElement('a');

            let icon = document.createElement('i');
            icon.className = 'bx bxs-edit-alt';
            aIcono.appendChild(icon);

            let celdaIconoActivar = fila.insertCell();
            let aIconoActivar = document.createElement('a');
            aIconoActivar.className = 'list-icon';
            let iconActivar = document.createElement('i');
            iconActivar.className = 'bx bxs-check-square';
            aIconoActivar.appendChild(iconActivar);

            let celdaIconoEliminar = fila.insertCell();
            let aIconoEliminar = document.createElement('a');
            aIconoEliminar.className = 'list-icon';
            let iconEliminiar = document.createElement('i');
            iconEliminiar.className = 'bx bxs-trash';
            aIconoEliminar.appendChild(iconEliminiar);

            if( lista_libros[i].ofertas[j].estado == 'habilitado'){
                iconActivar.id = 'habilitadoIon';
                aIcono.id = 'list-icon';
                icon.addEventListener('click', function(){
                    Swal.fire({
                        title: 'Modificar oferta de este libro',
                        html: '<input type="number" id="txt-porcentaje" placeholder="Ingresá el porcentaje de descuento">'
                    }).then(() => {
                        let input_porcentaje = document.querySelector('#txt-porcentaje').value;
                        if(input_porcentaje > 0 && input_porcentaje < 101) {

                            lista_libros[i].ofertas[j].porcentaje = input_porcentaje;
                            modificarOferta(lista_libros[i], lista_libros[i]._id);
                            Swal.fire({
                                title: 'Oferta registrada',
                                text:'La oferta fue registrada existosamente',
                                type: 'success'
                            })
                            window.location.reload();
                        } else {
                            Swal.fire({ 
                                title: 'No se ha registrado la oferta',
                                type: 'warning',
                                text: 'Revisá los campos resaltados e intentalo de nuevo'
                            })
                        }
                    })
                });
                aIcono.className = 'list-icon';
                iconActivar.addEventListener('click', function(){
                    lista_libros[i].ofertas[j].estado = 'deshabilitado'
                       
                    cambiarEstadoOferta(lista_libros[i].ofertas[j], lista_libros[i]._id);
                    window.location.reload();
                });
            }else{
                aIcono.className = 'list-iconDisable';
                iconActivar.addEventListener('click', function(){
                    lista_libros[i].ofertas[j].estado = 'habilitado';
    
                    cambiarEstadoOferta( lista_libros[i].ofertas[j], lista_libros[i]._id);
                    window.location.reload();
                });
            }
            // ELIMINAR OFERTAS
            iconEliminiar.addEventListener('click', function () {
                Swal.fire({
                    title: '¿Está seguro de eliminar la oferta?',
                    text: "Ésta acción no se puede revertir",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sí, estoy seguro'
                }).then((result) => {
                    if (result.value) {
                        eliminarOferta(lista_libros[i]._id, lista_libros[i].ofertas[j]._id);
                       
                        Swal.fire(
                            'Oferta eliminada!',
                            
                        ).then((result) => {
                            if (result.value) {
                                window.location.reload();
                            }
                        });
                    }
                })
            });

            celdaIcono.appendChild(aIcono);
            celdaIconoActivar.appendChild(aIconoActivar);
            celdaIconoEliminar.appendChild(aIconoEliminar);

        }
    }
};

let filtrar_tabla = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';

    for (let i = 0; i < lista_libros.length; i++) {

        lista_ofertas = lista_libros[i]['ofertas'];
        for (let j = 0; j < lista_ofertas.length; j++) {
            if (lista_libros[i]['tipo'].toLowerCase().includes(filtro) || lista_libros[i]['genero'].toLowerCase().includes(filtro) || lista_libros[i]['categoria'].toLowerCase().includes(filtro) || lista_libros[i]['titulo'].toLowerCase().includes(filtro) || lista_libros[i]['autor'].toLowerCase().includes(filtro)) {
                let fila = tbody.insertRow();
                fila.insertCell().innerHTML = lista_libros[i]['titulo'];
                fila.insertCell().innerHTML = lista_libros[i]['autor'];
                fila.insertCell().innerHTML = lista_libros[i]['categoria'];
                fila.insertCell().innerHTML = lista_libros[i]['genero'];
                fila.insertCell().innerHTML = lista_libros[i]['precio'];
                fila.insertCell().innerHTML = lista_libros[i]['tipo'];
                fila.insertCell().innerHTML = lista_ofertas[j]['porcentaje'];

                let celdaIcono = fila.insertCell();
                let aIcono = document.createElement('a');
    
                let icon = document.createElement('i');
                icon.className = 'bx bxs-edit-alt';
                aIcono.appendChild(icon);
    
                let celdaIconoActivar = fila.insertCell();
                let aIconoActivar = document.createElement('a');
                aIconoActivar.className = 'list-icon';
                let iconActivar = document.createElement('i');
                iconActivar.className = 'bx bxs-check-square';
                aIconoActivar.appendChild(iconActivar);
    
                let celdaIconoEliminar = fila.insertCell();
                let aIconoEliminar = document.createElement('a');
                aIconoEliminar.className = 'habilitadoIon list-icon';
                let iconEliminiar = document.createElement('i');
                iconEliminiar.className = 'bx bxs-trash';
                aIconoEliminar.appendChild(iconEliminiar);
    
                if( lista_libros[i].ofertas[j].estado == 'habilitado'){
                    iconActivar.id = 'habilitadoIon';
                    icon.addEventListener('click', function(){
                        Swal.fire({
                            title: 'Modificar oferta de este libro',
                            html: '<input type="number" id="txt-porcentaje" placeholder="Ingresá el porcentaje de descuento">'
                        }).then(() => {
                            let input_porcentaje = document.querySelector('#txt-porcentaje').value;
                            if(input_porcentaje > 0 && input_porcentaje < 101) {
    
                                lista_libros[i].ofertas[j].porcentaje = input_porcentaje;
                                modificarOferta(lista_libros[i], lista_libros[i]._id);
                                Swal.fire({
                                    title: 'Oferta registrada',
                                    text:'La oferta fue registrada existosamente',
                                    type: 'success'
                                })
                                window.location.reload();
                            } else {
                                Swal.fire({ 
                                    title: 'No se ha registrado la oferta',
                                    type: 'warning',
                                    text: 'Revisá los campos resaltados e intentalo de nuevo'
                                })
                            }
                        })
                    });
                    aIcono.className = 'header-icon';
                    iconActivar.addEventListener('click', function(){
                        lista_libros[i].ofertas[j].estado = 'deshabilitado'
                           
                        cambiarEstadoOferta(lista_libros[i].ofertas[j], lista_libros[i]._id);
                        window.location.reload();
                    });
                }else{
                    aIcono.className = 'header-iconDisable';
                    iconActivar.addEventListener('click', function(){
                        lista_libros[i].ofertas[j].estado = 'habilitado';
        
                        cambiarEstadoOferta( lista_libros[i].ofertas[j], lista_libros[i]._id);
                        window.location.reload();
                    });
                }
                // ELIMINAR OFERTAS
                iconEliminiar.addEventListener('click', function () {
                    Swal.fire({
                        title: '¿Está seguro de eliminar la oferta?',
                        text: "Ésta acción no se puede revertir",
                        type: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Sí, estoy seguro'
                    }).then((result) => {
                        if (result.value) {
                            eliminarOferta(lista_libros[i]._id, lista_libros[i].ofertas[j]._id);
                           
                            Swal.fire(
                                'Oferta eliminada!',
                                
                            ).then((result) => {
                                if (result.value) {
                                    window.location.reload();
                                }
                            });
                        }
                    })
                });
    
                celdaIcono.appendChild(aIcono);
                celdaIconoActivar.appendChild(aIconoActivar);
                celdaIconoEliminar.appendChild(aIconoEliminar);
    
               
            }
        }
    }
};


mostrar_tabla();
txt_filtro.addEventListener('keyup', filtrar_tabla);

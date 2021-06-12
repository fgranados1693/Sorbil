
'use strict';

const tbody = document.querySelector('#tabla-filtrado tbody');
let lista_libros = [];
let txt_filtro = document.querySelector('#txt_filtro');
const input_porcentaje = document.querySelector('#txt-porcentaje');

let mostrar_tabla = async () => {

    lista_libros = await obtenerLibros();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_libros.length; i++) {
        let fila = tbody.insertRow();
        fila.insertCell().innerHTML = lista_libros[i]['titulo'];
        fila.insertCell().innerHTML = lista_libros[i]['autor'];
        fila.insertCell().innerHTML = lista_libros[i]['categoria'];
        fila.insertCell().innerHTML = lista_libros[i]['genero'];
        fila.insertCell().innerHTML = lista_libros[i]['isbn'];
        fila.insertCell().innerHTML = lista_libros[i]['tipo'];

        let celdaOferta = fila.insertCell();
        let btn_oferta = document.createElement('button');
        btn_oferta.type = 'button';
        btn_oferta.innerText = 'Registrar Oferta';
        btn_oferta.dataset._id = lista_libros[i]['_id'];
       
        celdaOferta.appendChild(btn_oferta);

        btn_oferta.addEventListener('click', async function () {
            Swal.fire({
                title: 'Añadir oferta a este libro',
                html: '<input type="number" id="txt-porcentaje" placeholder="Ingresá el porcentaje de descuento">'
            }).then(() => {
                let porcentaje = document.querySelector('#txt-porcentaje').value;
                if(porcentaje > 0 && porcentaje < 101) {
                    registrarOferta(this.dataset._id, porcentaje);
                    Swal.fire({
                        title: 'Oferta registrada',
                        text:'La oferta fue registrada existosamente',
                        type: 'success'
                    })
                } else {
                    Swal.fire({ 
                        title: 'No se ha registrado la oferta',
                        type: 'warning',
                        text: 'Revisá los campos resaltados e intentalo de nuevo'
                    })
                }
            })
        });
    }
};


let filtrar_tabla = async () => {

    let filtro = txt_filtro.value.toLowerCase();
    tbody.innerHTML = '';


    for (let i = 0; i < lista_libros.length; i++) {
        if (lista_libros[i]['tipo'].toLowerCase().includes(filtro) || lista_libros[i]['genero'].toLowerCase().includes(filtro) || lista_libros[i]['categoria'].toLowerCase().includes(filtro) || lista_libros[i]['titulo'].toLowerCase().includes(filtro) || lista_libros[i]['autor'].toLowerCase().includes(filtro)) {
            let fila = tbody.insertRow();
            fila.insertCell().innerHTML = lista_libros[i]['titulo'];
            fila.insertCell().innerHTML = lista_libros[i]['autor'];
            fila.insertCell().innerHTML = lista_libros[i]['categoria'];
            fila.insertCell().innerHTML = lista_libros[i]['genero'];
            fila.insertCell().innerHTML = lista_libros[i]['isbn'];
            fila.insertCell().innerHTML = lista_libros[i]['tipo'];

            let celdaOferta = fila.insertCell();
            let btn_oferta = document.createElement('button');
            btn_oferta.type = 'button';
            btn_oferta.innerText = 'Registrar Oferta';
            btn_oferta.dataset._id = lista_libros[i]['_id'];
           
            celdaOferta.appendChild(btn_oferta);
    
            btn_oferta.addEventListener('click', async function () {
                Swal.fire({
                    title: 'Añadir oferta a este libro',
                    html: '<input type="number" id="txt-porcentaje" placeholder="Ingresá el porcentaje de descuento">'
                }).then(() => {
                    let porcentaje = document.querySelector('#txt-porcentaje').value;
                    if(porcentaje > 0 && porcentaje < 101) {
                        registrarOferta(this.dataset._id, porcentaje);
                        Swal.fire({
                            title: 'Oferta registrada',
                            text:'La oferta fue registrada existosamente',
                            type: 'success'
                        })
                    } else {
                        Swal.fire({ 
                            title: 'No se ha registrado la oferta',
                            type: 'warning',
                            text: 'Revisá los campos resaltados e intentalo de nuevo'
                        })
                    }
                })
            });
        }   
    }
};


mostrar_tabla();
txt_filtro.addEventListener('keyup', filtrar_tabla);

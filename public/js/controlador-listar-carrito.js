'use strict';
const tbody = document.querySelector('#tabla-filtrado tbody');
const totalPagar = document.querySelector('#precio-total');
const btn_comprar = document.querySelector('#p-formulario-compra');
let lista_carrito = [];
let lista_libros = [];
let lista_librerias = [];
let sumatotalAPagar = 0;
let ultimoLibro = [];
let UsuarioEnSesionPriv = JSON.parse(sessionStorage.getItem('activo'));
let UsuarioIdSucursalPriv = UsuarioEnSesionPriv._id;

let encontrarLib = async (pidLib) => {
    lista_librerias = await obtenerLibrerias();
    let posicionLib;
    for (let i = 0; i < lista_librerias.length; i++) {
        if (lista_librerias[i]._id == pidLib) {
            posicionLib = i;
        }
    }

    return posicionLib;
}

let encontrarSuc = async (posicionLib, pidSuc) =>{
    lista_librerias = await obtenerLibrerias();
    let posicionSuc;
    for (let i = 0; i < lista_librerias[posicionLib].sucursales.length; i++) {
        if (lista_librerias[posicionLib].sucursales[i]._id == pidSuc) {
            posicionSuc = i;
        }
    }
    return posicionSuc;
}

let mostrar_tabla = async () => {

    lista_carrito = await obtenerCarrito();
    lista_libros = await obtenerLibros();
    lista_librerias = await obtenerLibrerias();

    tbody.innerHTML = '';

    for (let i = 0; i < lista_carrito.length; i++) {
        if (lista_carrito[i].idUsuario == UsuarioIdSucursalPriv) {
            for (let j = 0; j < lista_libros.length; j++) {
                if (lista_libros[j]._id == lista_carrito[i].idLibro) {

                    let lib = await encontrarLib(lista_carrito[i].idLib);
                    let suc = await encontrarSuc(lib, lista_carrito[i].idSuc)
                    //Sacar el total del precio (falta pasarlo a string y formatearlo)

                        let precio = lista_libros[j]['precio'];
                        precio = precio.substr(1);
                        precio = precio.replace('.', '');
                        let precioInt = parseInt(precio);
                            
                        let fila = tbody.insertRow();
                        fila.insertCell().innerHTML = lista_libros[j]['titulo'];
                        fila.insertCell().innerHTML = lista_librerias[lib].empresa;
                        fila.insertCell().innerHTML = lista_librerias[lib].sucursales[suc].nombre;
                        fila.insertCell().innerHTML = '1';
                        fila.insertCell().innerHTML = lista_libros[j]['precio'];
                        sumatotalAPagar = sumatotalAPagar + precioInt;
                        
                        let celdaIconoEliminar = fila.insertCell();
                        let aIconoEliminar = document.createElement('a');
                        aIconoEliminar.className = 'list-icon';
                        let iconEliminiar = document.createElement('i');
                        iconEliminiar.className = 'bx bxs-trash';
                        aIconoEliminar.appendChild(iconEliminiar);

                    iconEliminiar.addEventListener('click', function () {
                        Swal.fire({
                            title: '¿Está seguro de eliminar el carrito?',
                            // text: "Ésta acción no se puede revertir",
                            type: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Sí, estoy seguro'
                        }).then((result) => {
                            if (result.value) {
                                eliminarProductoCarrito(lista_carrito[i]._id);
                                Swal.fire(
                                    'Carrito eliminado!',
                                    'success'
                                ).then((result) => {
                                    if (result.value) {
                                        window.location.reload();
                                    }
                                });
                            }
                        })
                    });

                    celdaIconoEliminar.appendChild(aIconoEliminar);
                    ultimoLibro = lista_libros[j]._id;

                    totalPagar.innerHTML = [sumatotalAPagar]
                }
            }
        }
    }
};

btn_comprar.addEventListener('click', function(){
    window.location.href = 'p-comprar.html';
});


mostrar_tabla();

'use strict';
const totalPagar = document.querySelector('#precio-total');
const btn_confirmar_Compra = document.querySelector('#btn-enviar');
let select = document.getElementById("txt-tarjetas");
let lista_carrito = [];
let lista_libros = [];
let lista_librerias = [];

let UsuarioEnSesionPrivCompra = JSON.parse(sessionStorage.getItem('activo'));
let UsuarioIdSucursalPrivCompra = UsuarioEnSesionPrivCompra._id;
let UsuarioCorreoSucursalPrivCompra = UsuarioEnSesionPrivCompra.correo;
let UsuarioNombreSucursalPrivCompra = UsuarioEnSesionPrivCompra.nombre;
let UsuarioApellidoSucursalPrivCompra = UsuarioEnSesionPrivCompra.primer_apellido;

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

let agregar_tarjetas = async () => {
    select = document.getElementById("txt-tarjetas");
    let lista_tarjetas = await obtenerTarjetas(UsuarioIdSucursalPrivCompra);
    
    for(let i = 0; i < lista_tarjetas.length; i++)
    {
        let option = new Option(lista_tarjetas[i]['num_tarjeta']+ ' - '+ lista_tarjetas[i]['nombre']);
        select.add(option);
    }    
    
};

let PrecioApagar = async()=>{
    lista_carrito = await obtenerCarrito();
    lista_libros = await obtenerLibros();
    lista_librerias = await obtenerLibrerias();

    let sumatotalAPagar = 0;

    for (let i = 0; i < lista_carrito.length; i++) {
        if (lista_carrito[i].idUsuario == UsuarioIdSucursalPrivCompra) {
            for (let j = 0; j < lista_libros.length; j++) {
                if (lista_libros[j]._id == lista_carrito[i].idLibro) {

                    let lib = await encontrarLib(lista_carrito[i].idLib);
                    let suc = await encontrarSuc(lib, lista_carrito[i].idSuc)
                    //Sacar el total del precio (falta pasarlo a string y formatearlo)

                        let precio = lista_libros[j]['precio'];
                        precio = precio.substr(1);
                        precio = precio.replace('.', '');
                        let precioInt = parseInt(precio);
                        sumatotalAPagar = sumatotalAPagar + precioInt;

                }
            }
        }
    }
    return sumatotalAPagar;

};

let EjecutarCompra = async () => {

    lista_carrito = await obtenerCarrito();
    lista_libros = await obtenerLibros();
    lista_librerias = await obtenerLibrerias();
    let suma = await PrecioApagar();
    

    for (let i = 0; i < lista_carrito.length; i++) {
        if (lista_carrito[i].idUsuario == UsuarioIdSucursalPrivCompra) {
            for (let j = 0; j < lista_libros.length; j++) {
                if (lista_libros[j]._id == lista_carrito[i].idLibro) {

                    let lib = await encontrarLib(lista_carrito[i].idLib);
                    let suc = await encontrarSuc(lib, lista_carrito[i].idSuc);

                    let libreria = lista_librerias[lib]._id;
                    let sucursal = lista_librerias[lib].sucursales[suc]._id;
                    let libro = lista_libros[j]._id;
                    let idCarrito = lista_carrito[i]._id;

                    registrarVenta(libreria, sucursal, UsuarioIdSucursalPrivCompra, libro);
                    eliminarProductoCarrito(idCarrito);

                    for (let p = 0; p < lista_librerias[lib].librosSuc.length; p++) {
                        if(lista_librerias[lib].librosSuc[p].idlibro == libro && lista_librerias[lib].librosSuc[p].idSuc == sucursal){
                            let cantidad = parseInt(lista_librerias[lib].librosSuc[p].cantidad);
                            cantidad = cantidad - 1;
                            let canString = cantidad.toString();
                            lista_librerias[lib].librosSuc[p].cantidad = canString;
                        }
                    }
                    let correo_libreria = lista_librerias[lib].correo;
                    modificarSucursal(correo_libreria, lista_librerias[lib]);

                    

                }
            }
        }
    }

    factura(UsuarioCorreoSucursalPrivCompra, UsuarioNombreSucursalPrivCompra,UsuarioApellidoSucursalPrivCompra, suma);
};
agregar_tarjetas();

btn_confirmar_Compra.addEventListener('click', function(){
    if (select.value == ''){
        select.classList.add('input_error');
        Swal.fire({ //formato json
            title: 'No se ha registrado la información',
            type: 'warning',
            text: 'Revise los campos resaltados e inténtelo de nuevo'
        })
    }else{
        select.classList.remove('input_error');
        Swal.fire({
            title: '¿Está seguro de esta compra?',
            text: "Ésta acción no se puede revertir",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, estoy seguro'
        }).then((result) => {
            if (result.value) {
                EjecutarCompra();
    
                Swal.fire(
                    'Compra realizada!'
                ).then((result) => {
                    if (result.value) {
                        window.location.href = `ver-perfil-usuario.html?_id=${_id2}`;
                    }
                });
            }
        })
    }

    
});

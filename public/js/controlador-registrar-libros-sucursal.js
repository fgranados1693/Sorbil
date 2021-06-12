'use scrict';

let selectSucursales = document.querySelector('#input_suc');
let cantidad = document.querySelector('#input_cantidad');
let btn_registrar = document.querySelector('#btn-registrar');
let cantidad_disponible = document.querySelector('#cantidad_libros_disponible');
let libreria = [];
let correoLibrosSucursal;
let idSuc;

const urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get('_id');

let agregar_sucursales = async () => {
    let user =  JSON.parse(sessionStorage.getItem('activo'));
    correoLibrosSucursal = user.correo;
    libreria = await obtenerLibreriaPorCorreo(correoLibrosSucursal);

    let lista_suc = libreria[0].sucursales;
    
    for(i = 0; i < lista_suc.length; i++)
    {
        let option = new Option(lista_suc[i].nombre);
        selectSucursales.add(option);
    }

    for (let x = 0; x < libreria[0].libros.length; x++) {
        if(libreria[0].libros[x].idlibro == id){
            cantidad_disponible.innerHTML = libreria[0].libros[x].cantidad;
        }
        
    }
    
    
    
};

let posicionSucursal=(psucursal)=>{
    let posicion;
    for (let i = 0; i < libreria[0].sucursales.length; i++) {
        if(psucursal == libreria[0].sucursales[i].nombre)
        posicion = i;
        
    }
    return posicion;
}


let validar = (pselect, pcantidad)=>{
    let error = false;

    if (pselect == 0 ){
        error = true;
        selectSucursales.classList.add('input_error');
    } else {
        selectSucursales.classList.remove('input_error');
    }
    pcantidad = parseInt(pcantidad);
    let posicionLib = posicionLibro();
    let cantidadparavalidar = parseInt(libreria[0].libros[posicionLib].cantidad);
    if(pcantidad > cantidadparavalidar || pcantidad == '' || pcantidad <= 0){
        error = true;
        cantidad.classList.add('input_error');
    } else {
        cantidad.classList.remove('input_error');
    }

    return error;
}

let obteneridsuc =(psucursal)=>{
    let id;
    for (let i = 0; i < libreria[0].sucursales.length; i++) {
        if(psucursal == libreria[0].sucursales[i].nombre){
            id =libreria[0].sucursales[i]._id;
        }
    }
    return id;
}



let validarSiYaExisteLibro = (pcantidadIngresada) =>{
    let existe = false;
    let posicionLib = posicionLibro();
    idSuc = obteneridsuc(selectSucursales.value);
    for (let i = 0; i < libreria[0].librosSuc.length; i++) {
       if(libreria[0].librosSuc[i].idlibro == id && libreria[0].librosSuc[i].idSuc == idSuc){
        existe = true;
        let num1 = parseInt(libreria[0].librosSuc[i].cantidad);
        let num2 = parseInt(pcantidadIngresada);
        let suma = num1 + num2;
        let sumString = suma.toString(); 
        libreria[0].librosSuc[i].cantidad = sumString;
        // Resta de libros en Libreria
        let CantidadTotalLibroLibreria = libreria[0].libros[posicionLib].cantidad;
        let res1 = parseInt(CantidadTotalLibroLibreria);
        let resta = res1 - num2;
        let reString = resta.toString();
        libreria[0].libros[posicionLib].cantidad = reString;

        existe = true;
        }
    }
    return existe;
};

let restarLibros =(pcantidad)=>{
    let posicionLib = posicionLibro();
    let CantidadTotalLibroLibreria = libreria[0].libros[posicionLib].cantidad;
    let res1 = parseInt(CantidadTotalLibroLibreria);
    let res2 = parseInt(pcantidad);
    let resta = res1 - res2;
    let reString = resta.toString();
    libreria[0].libros[posicionLib].cantidad = reString;
}

let posicionLibro= ()=>{
    let posicion;
    for (let i = 0; i < libreria[0].libros.length; i++) {
        if(id == libreria[0].libros[i].idlibro){
            posicion = i;
        }
    }
    return posicion;
}

let llamar =()=>{
let error = validar(selectSucursales.value, cantidad.value);
let idSuc = obteneridsuc(selectSucursales.value);
if (!error){
    let existe = validarSiYaExisteLibro(cantidad.value);
    if (existe){
        
        modificarSucursal(correoLibrosSucursal ,libreria[0]);
    }else{
        restarLibros(cantidad.value);
        modificarSucursal(correoLibrosSucursal ,libreria[0]);
        registrarLibrosSuc(id, idSuc, cantidad.value, correoLibrosSucursal);
        
    }

    Swal.fire({ //formato json
        title: 'Se ha registrado la información exitosamente',
        type: 'success',
    }).then((result) => {
        if (result.value) {
            window.location.href = `al-listar-libros-liberia.html`;
        }
    })
}




}


agregar_sucursales();
btn_registrar.addEventListener('click', llamar);


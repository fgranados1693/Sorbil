'use strict';

const urlParams = new URLSearchParams(window.location.search);
const posicion = urlParams.get('_i');

// Aqui empiezan todas las variables para subir las fotos a cloudinary
const imgpreview = document.getElementById('img_preview');
const uploader_portada = document.getElementById('img_uploader_portada');
const uploader_contraportada = document.getElementById('img_uploader_contraportada');
const progress_bar = document.getElementById('progress_bar');
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/fenixsorbil/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'gmqflv3u';

// Aqui terminan las variables para subir las fotos a cloudinary
let UsuarioModificarLibros = JSON.parse(sessionStorage.getItem('activo'));
let id_usuario_activo_modificar_libros = UsuarioModificarLibros._id;

const img_uploader_portada = document.querySelector('#portada');
const img_uploader_contraportada = document.querySelector('#contraportada');
const input_titulo = document.querySelector('#input_titulo');
const input_autor = document.querySelector('#input_autores');
const input_edicion = document.querySelector('#input_edicion');
const input_editorial = document.querySelector('#input_editorial');
const input_fecha = document.querySelector('#input_fecha');
const input_categorias = document.querySelector('#input_categorias');
const input_generos = document.querySelector('#input_generos');
const input_idioma = document.querySelector('#input_idioma');
const input_precio = document.querySelector('#input_precio');
const input_tipo_libro = document.querySelector('#input_tipo_libro');
const input_isbn = document.querySelector('#input_isbn');
const btn_actualizar = document.querySelector('#btn_enviar');
const input_psinopsis = document.querySelector('#input_sinopsis');
const input_cantidad = document.querySelector('#input_cantidad');

const anElement = new AutoNumeric('#input_precio', {
    currencySymbol : '₡',
    decimalCharacter : ',',
    digitGroupSeparator : '.',
});

let validar = (ptitulo, pautor, pedicion, peditorial, pfecha, pcategorias, pgeneros, pidioma, pprecio, plibro, pisbn, psinopsis, pcantidad) => {
    let error = false;

    let fecha_formateada = new Date(pfecha.value);
    
    if (img_uploader_portada.src == 'http://localhost:3000/public/imgs/book-placeholder.png'){
        error = true;
        img_uploader_portada.classList.add('input_error');
    } else {
        img_uploader_portada.classList.remove('input_error');
    }
    
    if (img_uploader_contraportada.src == 'http://localhost:3000/public/imgs/book-placeholder.png'){
        error = true;
        img_uploader_contraportada.classList.add('input_error');
    } else {
        img_uploader_contraportada.classList.remove('input_error');
    }

    if (ptitulo.value == ''){
        error = true;
        input_titulo.classList.add('input_error');
    } else {
        input_titulo.classList.remove('input_error');
    }

    if (pautor.value == 0){
        error = true;
        input_autor.classList.add('input_error');
    } else {
        input_autor.classList.remove('input_error');
    }

    if (pedicion.value == ''){
        error = true;
        input_edicion.classList.add('input_error');
    } else {
        input_edicion.classList.remove('input_error');
    }

    if (peditorial.value == ''){
        error = true;
        input_editorial.classList.add('input_error');
    } else {
        input_editorial.classList.remove('input_error');
    }

    if (fecha_formateada == 'Invalid Date'){
        error = true;
        input_fecha.classList.add('input_error');
    } else {
        input_fecha.classList.remove('input_error');
    }

    if (pcategorias.value == 0){
        error = true;
        input_categorias.classList.add('input_error');
    } else {
        input_categorias.classList.remove('input_error');
    }

    if (pgeneros.value == 0){
        error = true;
        input_generos.classList.add('input_error');
    } else {
        input_generos.classList.remove('input_error');
    }

    if (pidioma.value == ''){
        error = true;
        input_idioma.classList.add('input_error');
    } else {
        input_idioma.classList.remove('input_error');
    }
    
    if (pprecio.value < 0 || pprecio.value == '') {
        error = true;
        input_precio.classList.add('input_error');
    } else {
        input_precio.classList.remove('input_error');
    }
    
    if(plibro.value == 0){
        error = true;
        input_tipo_libro.classList.add('input_error');
    }else{
        input_tipo_libro.classList.remove('input_error');
    }

    if(pisbn.value == 0 && pisbn.value == ''){
        error = true;
        input_isbn.classList.add('input_error');
    }else{
        input_isbn.classList.remove('input_error');
    }

    if(psinopsis == ''){
        error = true;
        input_psinopsis.classList.add('input_error');
    }else{
        input_psinopsis.classList.remove('input_error');
    }

    if(pcantidad == '' || pcantidad < 0){
        error = true;
        input_cantidad.classList.add('input_error');
    }else{
        input_cantidad.classList.remove('input_error');
    }

    return error;

};

// Inicio Validacion de ISBN
let validarISBN10 =(pisbn) =>{
    let errorISBN = false;

    let regexISBN10 = /^(?:ISBN(?:-10)?:? )?(?=[0-9X]{10}$|(?=(?:[0-9]+[- ]){3})[- 0-9X]{13}$)[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9X]$/;


    if (!regexISBN10.test(pisbn)) {
        errorISBN = true;
        input_isbn.classList.add('input_error');
    }
    else {
        errorISBN = false;
        input_isbn.classList.remove('input_error');
    }
    return errorISBN;
}

let validarISBN13 =(pisbn) =>{
    let errorISBN = false;
    let regexISBN13 = /^(?:ISBN(?:-13)?:? )?(?=[0-9]{13}$|(?=(?:[0-9]+[- ]){4})[- 0-9]{17}$)97[89][- ]?[0-9]{1,5}[- ]?[0-9]+[- ]?[0-9]+[- ]?[0-9]$/;   

    if (!regexISBN13.test(pisbn)) {
        errorISBN = true;
        input_isbn.classList.add('input_error');
    }
    else {
        errorISBN = false;
        input_isbn.classList.remove('input_error');
    }
    return errorISBN;
}

let resultadoisbn =(pisbn) =>{
    let error = false; 
    let resultado10 = validarISBN10(pisbn);
    
    if(resultado10){
        let resultado13 = validarISBN13(pisbn);
        if (resultado13){
            error = true;
            input_isbn.classList.add('input_error');
        }else{
            input_isbn.classList.remove('input_error');
        }
    }

    return error;
}

let lista_generos = [];

let agregar_generos = async () => {
    let select = document.getElementById("input_generos");
    lista_generos = await obtenerGeneros();
    
    for(let i = 0; i < lista_generos.length; i++)
    {
        let option = new Option(lista_generos[i]['genero']);
        select.add(option);
    }    
    
};

let agregar_categorias = async () => {
    let select = document.getElementById("input_categorias");
    let lista_catergorias = await obtenerCategorias();
    
    for(let i = 0; i < lista_catergorias.length; i++)
    {
        let option = new Option(lista_catergorias[i]['categoria']);
        select.add(option);
    }
};

let agregar_autores = async () => {
    let select = document.getElementById("input_autores");
    let lista_autores = await obtenerAutor();
    
    for(let i = 0; i < lista_autores.length; i++)
    {
        let option = new Option(lista_autores[i]['autor']);
        select.add(option);
    }
};

let datosFuncion = async() =>{
    let Datoslibros = await obtenerLibros();
    
    let libro = Datoslibros[posicion];
    return libro;
}

agregar_generos();
agregar_categorias();
agregar_autores();

let llenarInputs = async()=>{
    let libro = await datosFuncion();

    img_uploader_portada.src = libro.portada;
    img_uploader_contraportada.src = libro.contraportada;
    input_titulo.value = libro.titulo;
    input_autor.value = libro.autor;
    input_edicion.value = libro.edicion;
    input_editorial.value = libro.editorial;
    // Formatear fecha
    let fecha_original = new Date(libro.fecha);
    let mes = fecha_original.getUTCMonth() + 1;
    if (mes < 10) {
        mes = '0' + mes;
    }

    let dia = fecha_original.getDate();
    if (dia < 10) {
        dia = '0' + dia;
    }
    input_fecha.value = fecha_original.getFullYear() + '-' + mes + '-' + dia;
    //Aqui termina la formateada de la fech

    input_categorias.value = libro.categoria;
    input_generos.value = libro.genero;
    input_idioma.value = libro.idioma;
    input_precio.value = libro.precio;
    input_tipo_libro.value = libro.tipo;
    input_isbn.value =  libro.isbn;
    input_psinopsis.value = libro.sinopsis;
    input_cantidad.value = libro.cantidad;

}

let llamar = async() =>{
    let libro = await datosFuncion();
    let titulo = input_titulo.value;
    let autor = input_autor.value;
    let edicion = input_edicion.value;
    let editorial = input_editorial.value;
    let fecha = new Date(input_fecha.value);
    let categorias = input_categorias.value;
    let generos = input_generos.value;
    let precio = input_precio.value;
    let idioma = input_idioma.value;
    let tipo_libro = input_tipo_libro.value;
    let isbn = input_isbn.value;
    let src_portada = img_uploader_portada.src;
    let src_contraportada = img_uploader_contraportada.src;
    let sinopsis = input_psinopsis.value;
    let cantidad = input_cantidad.value;

    

    let resultado_validaciones = validar(input_titulo, input_autor, input_edicion, input_editorial, input_fecha, input_categorias, input_generos, input_idioma, input_precio, input_tipo_libro, input_isbn, sinopsis, cantidad);
    let resultadoFuncionISBN = resultadoisbn(isbn);

    if(!resultado_validaciones && !resultadoFuncionISBN){
        libro.portada = src_portada
        libro.contraportada = src_contraportada;
        libro.titulo = titulo;
        libro.autor = autor;
        libro.edicion = edicion;
        libro.editorial = editorial;
        libro.fecha = fecha;
        libro.genero = generos;
        libro.idioma = idioma;
        libro.precio = precio;
        libro.tipo = tipo_libro;
        libro.isbn = isbn;
        libro.sinopsis = sinopsis;
        libro.cantidad = cantidad;
        libro.categoria = categorias;

        modificarLibros(libro._id, libro);
        window.location.href = `ap-listar-libros.html?_id=${id_usuario_activo_modificar_libros}`;
        
    }else{
        Swal.fire({ //formato json
            title: 'No se ha registrado la información',
            type: 'warning',
            text: 'Revise los campos resaltados e inténtelo de nuevo'
        })
    }    
};


llenarInputs();
btn_actualizar.addEventListener('click', llamar);

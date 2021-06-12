'use strict';
let lista_generos = [];
let lista_catergorias = [];
let lista_libros = [];

let agregar_generos = async () => {
    let select = document.querySelector(".opt-generos");
    let lista_generos = await obtenerGeneros();

    for (let i = 0; i < lista_generos.length; i++) {
        // let option = new Option(lista_generos[i]['genero']);
        // select.add(option);
        if (lista_generos[i].estado == 'habilitado') {
            let option = new Option(lista_generos[i]['genero']);
            select.add(option);
        }
    }
};

let agregar_categorias = async () => {
    let select = document.querySelector(".opt-categorias");
    let lista_catergorias = await obtenerCategorias();

    for (let i = 0; i < lista_catergorias.length; i++) {
        if (lista_catergorias[i].estado == 'habilitado') {
            let option = new Option(lista_catergorias[i]['categoria']);
            select.add(option);
        }
    }
};

agregar_generos();
agregar_categorias();
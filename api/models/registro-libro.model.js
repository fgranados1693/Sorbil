'use-strict';

const mongoose = require('mongoose');

//Esquema del registro del libro

let registro_libro_schema = new mongoose.Schema({
    titulo: { type: String, required: false, unique: false },
    autor: { type: String, required: false, unique: false },
    edicion: { type: String, required: false, unique: false},
    editorial: {type: String, required: false, unique: false},
    fecha: {type: Date, required: false, unique: false},
    categoria: {type: String, required: false, unique: false},
    genero: {type: String, required: false, unique: false},
    idioma: {type: String, required: false, unique: false},
    precio: {type: String, required: false, unique: false},
    tipo: {type: String, required: false, unique: false},
    isbn: {type: String, required: false, unique: false},
    portada: {type: String, required: false, unique: false},
    contraportada: {type: String, required: false, unique: false},
    sinopsis: {type: String, required: false, unique: false},
    ofertas: [{
        porcentaje: { type: String, required: false, unique: false},
        estado: {type: String, required: false, unique: false}
    }],
    cantidad: {type: Number, required: false, unique: false},
    estado: {type: String, required: false, unique: false}
});

module.exports =  mongoose.model('Libro', registro_libro_schema);
'use-strict';

const mongoose = require('mongoose');

//Esquema del registro del libro

let libreria_schema = new mongoose.Schema({
    //Info de la librería
    imagen: { type: String, required: false, unique: false },
    usuario: { type: String, required: false, unique: false },
    correo: { type: String, required: false, unique: false },
    empresa: { type: String, required: false, unique: false },
    telefono: { type: String, required: false, unique: false },
    descripcion: { type: String, required: false, unique: false },
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    direccion_exacta: { type: String, required: false, unique: false },
    direccion_latitud: { type: Number, required: false, unique: false },
    direccion_longitud: { type: Number, required: false, unique: false },
    sucursales: [{
        nombre: {type: String, required: false, unique: false},
        telefono: { type: String, required: false, unique: false },   
        provincia: {type: String, required: false, unique: false},
        canton: {type: String, required: false, unique: false},
        distrito: {type: String, required: false, unique: false},
        direccion_latitud: {type: Number, required: false, unique: false},
        direccion_longitud: {type: Number, required: false, unique: false},
        estado: {type: String, required: false, unique: false}
    }],
    libros: [{
        idlibro: {type: String, required: false, unique: false},
        cantidad: { type: String, required: false, unique: false }
    }],
    estado: { type: String, required: false, unique: false },
    librosSuc: [{
        idlibro: {type: String, required: false, unique: false},
        idSuc :{type: String, required: false, unique: false},
        cantidad: { type: String, required: false, unique: false }
    }],
});

module.exports = mongoose.model('Libreria', libreria_schema);
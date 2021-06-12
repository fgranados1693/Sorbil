'use-strict';

const mongoose = require('mongoose');

//Esquema del registro del libro

let resenna_schema = new mongoose.Schema({
    comentario: { type: String, required: false, unique: false },
    calificacion: { type: Number, required: false, unique: false },
    idUsuario: { type: String, required: false, unique: false},
    idLibro: { type: String, required: false, unique: false},
});

module.exports =  mongoose.model('resenna', resenna_schema);
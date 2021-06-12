'use strict';

const mongoose = require('mongoose');

//Esquema del genero

let genero_schema = new mongoose.Schema({
    genero: { type: String, required: false, unique: false },
    estado: { type: String, required: false, unique: false }
});

module.exports = mongoose.model('Genero', genero_schema);
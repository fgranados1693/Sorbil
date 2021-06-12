'use strict';

const mongoose = require('mongoose');

//Esquema de la categoría

let categoria_schema = new mongoose.Schema({
    categoria: { type: String, required: false, unique: false },
    estado: {type: String, required: false, unique: false}
});

module.exports = mongoose.model('categoria', categoria_schema);
'use strict';

const mongoose = require('mongoose');

//Esquema del autor

let carrito_schema = new mongoose.Schema({
    idUsuario: { type: String, required: false, unique: false },
    idLibro: { type: String, required: false, unique: false },
    idLib: { type: String, required: false, unique: false },
    idSuc: { type: String, required: false, unique: false }
});

module.exports = mongoose.model('carrito', carrito_schema);
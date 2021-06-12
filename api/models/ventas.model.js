'use strict';

const mongoose = require('mongoose');

//Esquema del autor

let ventas_schema = new mongoose.Schema({
    idlibreria: { type: String, required: false, unique: false },
    idSuc: { type: String, required: false, unique: false },
    idUser: { type: String, required: false, unique: false },
    idLibro: { type: String, required: false, unique: false }
});

module.exports = mongoose.model('venta', ventas_schema);
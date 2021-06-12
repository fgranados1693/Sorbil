'use strict';

const mongoose = require('mongoose');

//Esquema del autor

let autor_schema = new mongoose.Schema({
    imagen: { type: String, required: false, unique: false },
    autor: { type: String, required: false, unique: false },
    nacionalidad: { type: String, required: false, unique: false },
    fecha_nacimiento: { type: String, required: false, unique: false },
    fecha_defuncion: { type: String, required: false, unique: false },
    biografia: { type: String, required: false, unique: false },
    estado: {type: String, required: false, unique: false}
});

module.exports = mongoose.model('autor', autor_schema);
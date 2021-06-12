'use strict';

const mongoose = require('mongoose');


let usuario_schema = new mongoose.Schema({
    avatar: { type: String, required: false, unique: false },
    usuario: { type: String, required: false, unique: false },
    correo: { type: String, required: false, unique: false },
    contrasena: { type: String, required: false, unique: false },
    nombre: { type: String, required: false, unique: false },
    id: { type: String, required: false, unique: false },
    primer_apellido: { type: String, required: false, unique: false },
    segundo_apellido: { type: String, required: false, unique: false },
    sexo: { type: String, required: false, unique: false },
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    direccion_exacta: { type: String, required: false, unique: false },
    direccion_latitud: { type: Number, required: false, unique: false },
    direccion_longitud: { type: Number, required: false, unique: false },
    tipo_usuario: { type: String, required: false, unique: false },
    edad: { type: String, required: false, unique: false },
    fecha: { type: Date, required: false, unique: false },
    tarjetas: [{
        nombre: { type: String, required: false, unique: false },
        num_tarjeta: { type: String, required: false, unique: false },
        fecha_ven: { type: String, required: false, unique: false },
        cvv: { type: String, required: false, unique: false },
        estado: { type: String, required: false, unique: false }
    }],
    estado: { type: String, required: false, unique: false }
});

module.exports = mongoose.model('Usuario', usuario_schema);
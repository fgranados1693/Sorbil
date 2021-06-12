'use-strict';

const mongoose = require('mongoose');

//Esquema del registro del club presencial

let club_schema = new mongoose.Schema({
    imagen: { type: String, required: false, unique: false },
    tipo: { type: String, required: false, unique: false },
    nombre: { type: String, required: true, unique: false },
    tema: { type: String, required: false, unique: false },
    correo: { type: String, required: false, unique: false },
    telefono: { type: String, required: false, unique: false },
    categoria: { type: String, required: false, unique: false },
    genero: { type: String, required: false, unique: false },
    fecha: { type: Date, required: false, unique: false },
    hora: { type: String, required: false, unique: false },
    frecuencia: { type: String, required: false, unique: false },
    descripcion: { type: String, required: false, unique: false },
    usuarios: [{
        usuario_id: { type: String, required: false, unique: false },
        nombre: { type: String, required: false, unique: false },
        correo: { type: String, required: false, unique: false }
    }],
    //Solamente para el club presencial
    provincia: { type: String, required: false, unique: false },
    canton: { type: String, required: false, unique: false },
    distrito: { type: String, required: false, unique: false },
    direccion_exacta: { type: String, required: false, unique: false },
    estado: { type: String, required: false, unique: false }
});

module.exports = mongoose.model('Club', club_schema);
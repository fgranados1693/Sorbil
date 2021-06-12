'use strict';

const express = require('express'),
    router = express.Router(),
    Sucursal = require('../models/sucursal.model');

//Definición de la ruta para registrar contactos

router.post('/registrar-sucursal', function (req, res) {
    let body = req.body;

    console.log(body);

    let nuevo_sucursal = new Sucursal({
        nombre: body.nombre,
        telefono: body.telefono,
        correo: body.correo,
        provincia: body.provincia,
        canton: body.canton,
        distrito: body.distrito,   
        direccion_latitud: body.direccion_latitud,
        direccion_longitud: body.direccion_longitud 
    });

    nuevo_sucursal.save(
        function (err, sucursalesBD) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'La sucursal no se pudo guardar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    msj: 'La sucursal se guardó con éxito'
                });
                console.log("resouesta");
                console.log(res);
            }
        }
    );
});


module.exports = router;
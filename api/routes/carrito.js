'use strict';

const express = require('express'),
    router = express.Router(),
    carrito = require('../models/carrito.model');


router.param('_id', function (req, res, next, _id) {
    req.body._id = _id;
    next();
});

//Definición de la ruta para registrar carrito de compras

router.post('/registrar-carrito', function(req, res) {
    let body = req.body;

    let nuevo_carrito = new carrito({
        idUsuario: body.idUsuario,
        idLibro: body.idLibro,
        idLib: body.idLib,
        idSuc: body.idSuc
    });

    nuevo_carrito.save(
        function(err, carritoBD) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'El objeto no se pudo guardar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    msj: 'El objeto se guardó con éxito'
                });
            }
        }
    );
});

router.get('/listar-carrito', function (req, res) {
    carrito.find(function (err, carritosDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los clubes',
                err
            });
        } else {
            return res.json({
                success: true,
                lista_carrito: carritosDB
            });
        }
    })
});

router.post('/eliminar-carrito', function (req, res) {
    let body = req.body;

    carrito.findByIdAndRemove(body._id,
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo eliminar el producto' });
            } else {
                res.json({ success: true, msg: 'El producto se eliminar con éxito' });
            }
        }
    )
});

module.exports = router;
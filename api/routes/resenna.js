'use strict';

const express = require('express'),
    router = express.Router(),
    resenna = require('../models/resennas.model');

router.param('_id', function (req, res, next, _id) {
    req.body._id = _id;
    next();
});

router.post('/registrar-resenna', function(req, res) {
    let body = req.body;

    let nuevo_resenna = new resenna({
        comentario: body.comentario,
        calificacion: body.calificacion,
        idUsuario: body.idUsuario,
        idLibro: body.idLibro
    });

    nuevo_resenna.save(
        function(err, resennaDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'La resenna no se pudo guardar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    msj: 'La resenna se guardó con éxito'
                });
            }
        }
    );
});

router.get('/listar-resennas', function(req, res) {
    resenna.find(function(err, resennaesBD) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los resennaes',
                err
            });
        } else {
            return res.json({
                success: true,
                lista_resennas: resennaesBD
            });
        }
    })
});

module.exports = router;
'use strict';

const express = require('express'),
    router = express.Router(),
    Genero = require('../models/genero.model');

router.param('_id', function (req, res, next, _id) {
    req.body._id = _id;
    next();
});

//Definición de la ruta para registrar generos

router.post('/registrar-genero', function (req, res) {
    let body = req.body;

    let nuevo_genero = new Genero({
        genero: body.genero,
        estado: 'habilitado'
    });

    nuevo_genero.save(
        function (err, generoDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'El genero no se pudo guardar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    msj: 'El genero se guardó con éxito'
                });
            }
        }
    );
});

router.get('/listar-generos', async function (req, res) {
    Genero.find(function (err, generosDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los contactos',
                err
            });
        } else {
            return res.json({
                success: true,
                lista_generos: generosDB
            });
        }
    })
});

router.get('/buscar-genero/:_id', function (req, res) {
    Genero.findById(req.body._id, function (err, generoDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se encontro ningun género con ese id.',
                err
            });
        } else {
            return res.json({
                success: true,
                genero: generoDB
            });
        }
    })
});


router.post('/deshabilitar-genero', function (req, res) {
    let body = req.body;

    Genero.findByIdAndUpdate(body._id, {
        $set: {
            estado: 'deshabilitado'
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo deshabilitar el género' });
            } else {
                res.json({ success: true, msg: 'El género se deshabilitó con éxito' });
            }
        }
    )
});

router.post('/habilitar-genero', function (req, res) {
    let body = req.body;

    Genero.findByIdAndUpdate(body._id, {
        $set: {
            estado: 'habilitado'
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo habilitar el género' });
            } else {
                res.json({ success: true, msg: 'El género se habilitó con éxito' });
            }
        }
    )
});


router.post('/modificar-genero', function (req, res) {
    let body = req.body;

    Genero.findByIdAndUpdate(body._id, {
        $set: req.body
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo modificar el género' });
            } else {
                res.json({ success: true, msg: 'El género se modificó con éxito' });
            }
        }
    )
});

router.post('/eliminar-genero', function (req, res) {
    let body = req.body;

    Genero.findByIdAndRemove(body._id,
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo eliminar el género' });
            } else {
                res.json({ success: true, msg: 'El género se eliminó con éxito' });
            }
        }
    )
});

module.exports = router; 



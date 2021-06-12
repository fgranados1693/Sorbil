'use strict';

const express = require('express'),
    router = express.Router(),
    Categoria = require('../models/categoria.model');

//Definición de la ruta para registrar categorias

router.post('/registrar-categoria', function (req, res) {
    let body = req.body;

    let nuevo_categoria = new Categoria({
        categoria: body.categoria,
        estado: 'habilitado'
    });

    nuevo_categoria.save(
        function (err, categoriaDB) {
            if (err) {
                return res.status(400).json({
                    success: false,
                    msj: 'El categoria no se pudo guardar',
                    err
                });
            } else {
                res.json({
                    success: true,
                    msj: 'El categoria se guardó con éxito'
                });
            }
        }
    );
});

router.get('/listar-categorias', async function (req, res) {
    Categoria.find(function (err, categoriasDB) {
        if (err) {
            return res.status(400).json({
                success: false,
                msj: 'No se pueden listar los contactos',
                err
            });
        } else {
            return res.json({
                success: true,
                lista_categorias: categoriasDB
            });
        }
    })
});

router.post('/modificar-estado-categorias', function (req, res) {
    let body = req.body;

    Categoria.findByIdAndUpdate(body._id, {
        $set: {
            'estado': req.body.estado
        }
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo modificar la tarjeta' });
            } else {
                res.json({ success: true, msg: 'La tarjeta se modificó con éxito' });
            }
        }
    )
});

router.post('/modificar-categorias', function (req, res) {
    let body = req.body;

    Categoria.findByIdAndUpdate(body._id, {
        $set: req.body.categoria
    },
        function (error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo modificar el libro' });

            } else {
                res.json({ success: true, msg: 'EL libro se modificó con éxito' });
            }
        }
    )
});

router.post('/eliminar-categorias', function(req, res) {
    let body = req.body;

    Categoria.findByIdAndRemove(body._id,
        function(error) {
            if (error) {
                res.json({ success: false, msg: 'No se pudo modificar la tarjeta' });
            } else {
                res.json({ success: true, msg: 'La tarjeta se modificó con éxito' });
            }
        }
    )
});

module.exports = router;


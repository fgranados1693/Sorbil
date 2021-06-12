'use strict';

const express = require("express");
const body_parser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');

//Se declaran todos los accesos de los archivos routes.
const libro_route = require('./routes/registrar-libro');
const genero_route = require('./routes/genero');
const categoria_route = require('./routes/categoria');
const libreria_route = require('./routes/libreria');
const usuario_route = require('./routes/usuario');
const club_presencial_route = require('./routes/club-presencial');
const club_virtual_route = require('./routes/club-virtual');
const autor_route = require('./routes/autor');
const carrito_route = require('./routes/carrito');
const venta_route = require('./routes/ventas');
const resenna_route = require('./routes/resenna');



const app = express();
app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// Se crea variable db para ser reutilizada en el "callback".
let db;


//Se conecta la base de datos antes de levantar el servidor, mediante los datos del archivo .env en la raiz del proyecto.
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }, function(err, database) {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    //Guarda el objeto db para que el callback la pueda reutilizar.
    db = database;
    console.log("Se estableció la conexión con la base datos.");

    // Se inicia la aplicacion.
    const server = app.listen(process.env.PORT || 8000, function() {
        let port = server.address().port;
        console.log("El backend está levantado en el puerto: ", port);
    });
});

//Error general en caso de que falle un "endpoint".
function handleError(res, reason, message, code) {
    console.log("ERROR: " + reason);
    res.status(code || 500).json({ "error": message });
}

// Conexion a todas la rutas.
app.use('/api', libro_route);
app.use('/api', genero_route);
app.use('/api', libreria_route);
app.use('/api', usuario_route);
app.use('/api', categoria_route);
app.use('/api', club_presencial_route);
app.use('/api', club_virtual_route);
app.use('/api', autor_route);
app.use('/api', carrito_route);
app.use('/api', venta_route);
app.use('/api', resenna_route);
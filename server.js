// Para revisar el funcionamiento del servidor, utilizar Postman con los siguientes parámetros:
// GET   http://localhost:8080/autores?accion=alta&nombre=Enrique&apellidos=Peña

require('dotenv').config();

const model = require('./model/model');

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')

// Create a new instance of express
const app = express()

// Configuramos el middleware de sesión para usar una clave secreta personalizada y permitir que las sesiones se guarden 
// automáticamente. Ahora podemos acceder a los datos de sesión en cada solicitud utilizando el objeto req.session.
app.use(session({
    // secret: 'my-secret-key',
    secret: process.env.SESSION_SECRET || 'some-secret',
    resave: false,
    saveUninitialized: true
}));

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))

// Route that receives a POST request to /sms
// app.post('/sms', function (req, res) {
//     const body = req.body.Body
//     res.set('Content-Type', 'text/plain')
//     res.send(`You sent: ${body} to Express`)
// })

// const mysql = require('mysql');
const http = require('http');
const url = require('url');

// const host = process.env.DB_HOST;
const port = process.env.PORT;

var accion = 'alta';
var nombre = 'Luis';
var apellidos = 'de la Garza';

const query = {};
var q = {};

const registro_autores1 = {
    nombre: 'Luis',
    apellidos: 'de la Garza González'
};

const registro_autores = {
    id: 72,
    nombre: 'Luis',
    apellidos: 'de la Garza González'
};

const registro_libros = {
    id: 1,
    titulo: '',
    f_publicacion: '2023-10-26 00:00:00',
    editorial: '',
    paginas: 1,
    autor: 1
}

const registro = registro_autores;
// const tabla = 'autores'

app.listen(port);
console.log("Express server running");

app.get("/autores", function (req, res) {
    const tabla = 'autores';
    const parsedUrl = url.parse(req.url, true);
    console.log("req.url = " + req.url);
    q = parsedUrl;
    accion=q.query.accion;
    nombre = q.query.nombre;
    apellidos = q.query.apellidos;
    // res.writeHead(200);
    // res.write(`Nombre: ${nombre}`);
    res.write(`<html><body>`);
    res.write(`<h1>Autores</h1>`);
    res.write(`<p>${accion}</p>`);
    res.write(`<p>${nombre}</p>`);
    res.write(`<p>${apellidos}</p>`);
    res.write(`<html><body>`);
    // res.end(); //end the response
    switch (accion) {
        case "alta":
            registro_autores1.nombre = nombre;
            registro_autores1.apellidos = apellidos;
            model.insertar(tabla, registro_autores1);
            break
        case "baja":
            id = q.query.id;
            model.eliminar(tabla, id)
            break
        case "actualizar":
            model.actualizar_autores(tabla, registro);
            break
        case "consultar":
            model.consultar(tabla, registro);
            break
        default:
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Resource not found" }));
    }
})

app.get('/libros', function (req, res) {
    res.send(`<html><body><h1>Libros</h1></body></html>`);
})

// Para revisar el funcionamiento del servidor, utilizar Postman con los siguientes parámetros:
// GET     http://localhost:8080?nombre=Luis&apellidos=delagarza

// const config = require('./config.js');
require('dotenv').config();

const model = require('./model/model');

const express = require('express')
const bodyParser = require('body-parser')

// Create a new instance of express
const app = express()

// Tell express to use the body-parser middleware and to not parse extended bodies
app.use(bodyParser.urlencoded({ extended: false }))

// Route that receives a POST request to /sms
app.post('/sms', function (req, res) {
    const body = req.body.Body
    res.set('Content-Type', 'text/plain')
    res.send(`You sent: ${body} to Express`)
})

// Tell our app to listen on port 8080
app.listen(8080, function (err) {
    if (err) {
        throw err
    }

    console.log('Server started on port 8080')
})

const mysql = require('mysql');
const http = require('http');
const url = require('url');

const host = 'localhost';
const port = 8080;

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
const tabla = 'autores'

const requestListener = function (req, res) {
    if (req.method == 'GET') {
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        const parsedUrl = url.parse(req.url, true);
        console.log("req.url = " + req.url);
        q = parsedUrl;
        console.log(q.host); //returns 'localhost:8080'
        console.log(q.pathname); //returns '/default.htm'
        console.log(q.search); //returns '?year=2017&month=february'
        console.log(q.query.accion);
        console.log(q.query.nombre);
        console.log(q.query.apellidos);
        accion = q.query.accion;
    } else if (req.method == 'POST') {
        console.log('POST')
        var body = ''
        req.on('data', function (data) {
            body += data;
            console.log('Partial body: ' + body)
        })
        req.on('end', function () {
            console.log('Body: ' + body)
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end('post received')
        })
    }

    switch (q.pathname) {
        case "/autores":
            const tabla = 'autores';
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
            break
        case "/libros":
            // res.writeHead(200);
            res.write(`<html><body><h1>Libros</h1></body></html>`);
            break
        default:
            res.writeHead(404);
            res.end(JSON.stringify({ error: "Resource not found" }));
    }
}

const server = http.createServer(requestListener);

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);

});

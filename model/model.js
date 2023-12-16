require('../node_modules/dotenv').config();

const express = require('express');
const model = express();
const mysql = require('mysql');

var accion = 'alta';
var nombre = 'Luis';
var apellidos = 'de la Garza';

const query = {};

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

const connection = mysql.createConnection({
    localhost: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
})

// Funciones CRUD
model.insertar = (tabla, registro) => {
    console.log('DB_PASS = ' + process.env.DB_PASS);
    connection.query(`insert into ${tabla} set ?`, registro, (err, result) => {
        if (err) throw err;
        console.log(result);
    });
}

model.actualizar_autores = (tabla, registro) => {
    connection.query(`update ${tabla} set nombre = ?, apellidos = ? where id = ?`, [registro.nombre, registro.apellidos, registro.id], (err, rows) => {
        if (err) throw err;
        console.log(`${rows.changedRows} Registros cambiados.`);
    });
}

model.consultar = (tabla, registro) => {
    connection.query(`select * from ${tabla}`, (err, rows) => {
        if (err) throw err;
        console.log('Datos recibidos de la base de datos: ');
        console.log(rows);
    });
}

model.eliminar = (tabla, id) => connection.query(`delete from ${tabla} where id = ?`, id, (err, rows) => {
    if (err) throw err;
    console.log(`El registro ${id} de la tabla ${tabla} se eliminó correctamente.`);
});

module.exports = model;
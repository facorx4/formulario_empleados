'use strict'

var mongoose = require('mongoose');
var Schema  = mongoose.Schema ;

var EmpleadoSchema  = Schema ({
    tipo_documento: String,
    cedula: Number,
    nombre: String,
    apellidos: String,
    genero: String,
    cargo: String,
    n_contrato: Number,
    tipo_de_contrato: String,
    fecha_ingreso: Date,
    sueldo: Number,
    eps: String,
    arl: String,
    observaciones: String,
    image: String
});

module.exports = mongoose.model('Empleado', EmpleadoSchema );
// empleado --> guarda documentos de este tipo y con estructura dentro de la colección

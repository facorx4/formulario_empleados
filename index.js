'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;

//local
//mongoose.connect('mongodb://localhost:27017/api_rest_registro', { useNewUrlParser: true })
//global
mongoose.connect('mongodb+srv://fabian:Santotomas7@cluster0.xq1hm.mongodb.net/formulario?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {

console.log('la conexion a la base de datos de ha realizado con exito');

   // Crear servidor y ponerme a escuchar peticiones HTTP
   app.listen(port, () => {
    console.log('Servidor corriendo en http://localhost:'+port);
});

});
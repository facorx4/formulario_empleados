'use strict'

var express = require('express');
var EmpleadoController = require('../controllers/empleado');

var router = express.Router();

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './upload/empleados'});

// Rutas de prueba
router.post('/prueba-autor', EmpleadoController.datosAutor);
router.get('/test-de-controlador', EmpleadoController.test);

// Rutas útiles
router.post('/save', EmpleadoController.save);
router.get('/empleados/:last?', EmpleadoController.getEmpleados);
router.get('/empleado/:id', EmpleadoController.getEmpleado);
router.put('/empleado/:id', EmpleadoController.update);
router.delete('/empleado/:id', EmpleadoController.delete);
router.post('/upload-image/:id?', md_upload, EmpleadoController.upload);
router.get('/get-image/:image', EmpleadoController.getImage);
router.get('/search/:search', EmpleadoController.search);

module.exports = router;
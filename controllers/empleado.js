'use strict'

var validator = require('validator');
var fs = require('fs');
var path = require('path');

var Empleado = require('../models/empleado');

var controller = {

    datosAutor: (req, res) => {
        var hola = req.body.hola;

        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            autor: 'Fabian Cortes',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'Soy la acción test de mi controlador de empleados'
        });

    },


    save: (req, res) => {
        // Recoger parametros por post
        var params = req.body;

        // Validar datos (validator)
        try {
            var validate_tipo_documento = !validator.isEmpty(params.tipo_documento);
            var validate_cedula = !validator.isEmpty(params.cedula);
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_apellidos = !validator.isEmpty(params.apellidos);
            var validate_genero = !validator.isEmpty(params.genero);
            var validate_cargo = !validator.isEmpty(params.cargo);


        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if (validate_tipo_documento && validate_cedula && validate_nombre && validate_apellidos
            && validate_genero && validate_cargo) {

            //Crear el objeto a guardar
            var empleado = new Empleado();

            // Asignar valores
            empleado.tipo_documento = params.tipo_documento;
            empleado.cedula = params.cedula;
            empleado.nombre = params.nombre;
            empleado.apellidos = params.apellidos;
            empleado.genero = params.genero;
            empleado.cargo = params.cargo;



            if (params.image) {
                empleado.image = params.image;
            } else {
                empleado.image = null;
            }

            // Guardar el empleado
            empleado.save((err, empleadoStored) => {

                if (err || !empleadoStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El empleado no se ha guardado !!!'
                    });
                }

                // Devolver una respuesta 
                return res.status(200).send({
                    status: 'success',
                    empleado: empleadoStored
                });

            });

        } else {
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son válidos !!!'
            });
        }

    },


    getEmpleados: (req, res) => {

        var query = Empleado.find({});

        var last = req.params.last;
        if (last || last != undefined) {
            query.limit(5);
        }

        // Find
        query.sort('-_id').exec((err, empleados) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al devolver los empleados!!!'
                });
            }

            if (!empleados) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay empleados para mostrar !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                empleados
            });

        });
    },

    getEmpleado: (req, res) => {

        // Recoger el id de la url
        var empleadoId = req.params.id;

        // Comprobar que existe
        if (!empleadoId || empleadoId == null) {
            return res.status(404).send({
                status: 'error',
                message: 'No existe el empleado !!!'
            });
        }

        // Buscar el articulo
        Empleado.findById(empleadoId, (err, empleado) => {

            if (err || !empleado) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el empleado !!!'
                });
            }

            // Devolverlo en json
            return res.status(200).send({
                status: 'success',
                empleado
            });

        });
    },

    update: (req, res) => {
        // Recoger el id del articulo por la url
        var empleadoId = req.params.id;

        // Recoger los datos que llegan por put
        var params = req.body;

        // Validar datos
        try {
            var validate_tipo_documento = !validator.isEmpty(params.tipo_documento);
            var validate_cedula = !validator.isEmpty(params.cedula);
            var validate_nombre = !validator.isEmpty(params.nombre);
            var validate_apellidos = !validator.isEmpty(params.apellidos);
            var validate_genero = !validator.isEmpty(params.genero);
            var validate_cargo = !validator.isEmpty(params.cargo);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar !!!'
            });
        }

        if (validate_tipo_documento && validate_cedula && validate_nombre && validate_apellidos
            && validate_genero && validate_cargo) {
            // Find and update
            Empleado.findOneAndUpdate({ _id: empleadoId }, params, { new: true }, (err, empleadoUpdated) => {
                if (err) {
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar !!!'
                    });
                }

                if (!empleadoUpdated) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el empleado !!!'
                    });
                }

                return res.status(200).send({
                    status: 'success',
                    empleado: empleadoUpdated
                });
            });
        } else {
            // Devolver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'La validación no es correcta !!!'
            });
        }

    },

    delete: (req, res) => {
        // Recoger el id de la url
        var empleadoId = req.params.id;

        // Find and delete
        Empleado.findOneAndDelete({ _id: empleadoId }, (err, empleadoRemoved) => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar !!!'
                });
            }

            if (!empleadoRemoved) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No se ha borrado el articulo, posiblemente no exista !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                article: empleadoRemoved
           });

        }); 
    },

    upload: (req, res) => {
        // Configurar el modulo connect multiparty router/empleados.js (hecho)

        // Recoger el fichero de la petición
        var file_name = 'Imagen no subida...';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        // Conseguir nombre y la extensión del archivo
        var file_path = req.files.file0.path;
        var file_split = file_path.split('\\');

        // * ADVERTENCIA * EN LINUX O MAC
        // var file_split = file_path.split('/');

        // Nombre del archivo
        var file_name = file_split[2];

        // Extensión del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];

        // Comprobar la extension, solo imagenes, si es valida borrar el fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif'){
            
            // borrar el archivo subido
            fs.unlink(file_path, (err) => {
                return res.status(200).send({
                    status: 'error',
                    message: 'La extensión de la imagen no es válida !!!'
                });
            });
        
        }else{
             // Si todo es valido, sacando id de la url
             var empleadoId = req.params.id;

             if(empleadoId){
                // Buscar el articulo, asignarle el nombre de la imagen y actualizarlo
                Empleado.findOneAndUpdate({_id: empleadoId}, {image: file_name}, {new:true}, (err, empleadoUpdated) => {

                    if(err || !empleadoUpdated){
                        return res.status(200).send({
                            status: 'error',
                            message: 'Error al guardar la imagen del empleado !!!'
                        });
                    }

                    return res.status(200).send({
                        status: 'success',
                        empleado: empleadoUpdated
                    });
                });
             }else{
                return res.status(200).send({
                    status: 'success',
                    image: file_name
                });
             }
            
        }   
    }, // end upload file

    getImage: (req, res) => {
        var file = req.params.image;
        var path_file = './upload/empleados/'+file;

        fs.exists(path_file, (exists) => {
            if(exists){
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'La imagen no existe !!!'
                });
            }
        });
    },

    search: (req, res) => {
        // Sacar el string a buscar
        var searchString = req.params.search;
        //var searchNumber = rer.params.search;

        // Find or
        Empleado.find({ "$or": [
            { "nombre": { "$regex": searchString, "$options": "i"}},
            { "apellidos": { "$regex": searchString, "$options": "i"}},
            { "cargo": { "$regex": searchString, "$options": "i"}},
            { "genero": { "$regex": searchString, "$options": "i"}},
            //{ "cedula": { "$regex": searchNumber, "$options": "i"}},
            
        ]})
        .sort([['date', 'descending']])
        .exec((err, empleados) => {

            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error en la petición !!!'
                });
            }
            
            if(!empleados || empleados.length <= 0){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay empleados que coincidan con tu busqueda !!!'
                });
            }

            return res.status(200).send({
                status: 'success',
                empleados
            });

        });
    }

};  // end controller

module.exports = controller;
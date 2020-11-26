'use strict'

require('dotenv').config()

require('./database')
var mongoose = require('mongoose');
var app = require('./app');

const PORT = process.env.PORT || 8080
// Server is listening
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
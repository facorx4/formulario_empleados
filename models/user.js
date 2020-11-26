'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
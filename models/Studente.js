// models/Studente.js
// 'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studenteSchema = new Schema({
    nome: {
        type: String,
        required: true
    },
    cognome: {
        type: String,
        required: true
    },
    classe: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Studente', studenteSchema);

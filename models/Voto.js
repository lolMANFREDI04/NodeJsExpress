// models/Voto.js
// 'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votoSchema = new Schema({
    studenteId: {
        type: Schema.Types.ObjectId,
        ref: 'Studente',
        required: true
    },
    materia: {
        type: String,
        required: true
    },
    voto: {
        type: Number,
        required: true
    },
    dataVoto: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Voto', votoSchema);


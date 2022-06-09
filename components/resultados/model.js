const mongoose = require('mongoose');
const { Schema } = mongoose;

const Resultados = new Schema({
    number: {
        type: Number,
        required: true
    },
    sorteo: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Resultados', Resultados);
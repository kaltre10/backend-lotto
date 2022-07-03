const mongoose = require('mongoose');
const { Schema } = mongoose;

const Resultados = new Schema({
    number: {
        type: Number,
        required: true
    },
    sorteo: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Resultados', Resultados);
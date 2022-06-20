const mongoose = require('mongoose');
const { Schema } = mongoose;

const Precios = new Schema({
    precio: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Precios', Precios);
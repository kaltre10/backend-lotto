const mongoose = require('mongoose');
const { Schema } = mongoose;

const Premios = new Schema({
    premio: {
        type: Number,
        required: true
    },
    type: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Premios', Premios);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
    name: {
        type: String,
        min: 3,
        required: true
    },
    user: {
        type: String,
        min: 3,
        required: true
    },
    pass: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        default: 0
    },
    saldo: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('User', User);
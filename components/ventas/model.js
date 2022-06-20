const mongoose = require('mongoose');
const { Schema } = mongoose;

// status
// 0 -> "proceso"
// 1 -> "anulado"
// 2 -> "pagado"
// 3 -> "ganador"

const Ticket = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    numbers: {
        type: Array,
        default: []
    },
    count: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        default: 0
    },
    premio: {
        type: Number,
        required: true,
        default: 0
    },
    precio: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Ticket', Ticket);
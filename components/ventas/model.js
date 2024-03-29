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
        default: {}
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
        default: 0
    },
    aciertos: {
        type: Number,
        default: 0
    },
    precio: {
        type: Number,
        required: true,
    },
    pago: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    
}, { timestamps: true });

module.exports = mongoose.model('Ticket', Ticket);
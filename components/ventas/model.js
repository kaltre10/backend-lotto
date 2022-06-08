const mongoose = require('mongoose');
const { Schema } = mongoose;

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
    status: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Ticket', Ticket);
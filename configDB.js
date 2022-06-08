const mongoose = require('mongoose');
const CONNECT_DEVELOPMENT = require('dotenv').config();
const connection = async () => {
    try {
        await mongoose.connect(process.env.CONNECT_DEVELOPMENT);
        console.log('DB connected');
    } catch (error) {
        console.log('DB error', error);
    }
}

module.exports = connection;
const express = require('express');

const home = require('../components/home/network');
const auth = require('../components/auth/network');
const ventas = require('../components/ventas/network');

const routerApi = app => {
    const router = express.Router();
    app.use('/api/v1/', router);
    router.use('/home', home);
    router.use('/auth', auth);
    router.use('/ventas', ventas);
}

module.exports = routerApi;

const express = require('express');

const auth = require('../components/auth/network');
const ventas = require('../components/ventas/network');
const resultados = require('../components/resultados/network');
const premios = require('../components/premios/network');
const precios = require('../components/precioTicket/network');

const routerApi = app => {
    const router = express.Router();
    app.use('/api/v1/', router);
    router.use('/auth', auth);
    router.use('/ventas', ventas);
    router.use('/resultados', resultados);
    router.use('/premios', premios);
    router.use('/precios', precios);
}

module.exports = routerApi;

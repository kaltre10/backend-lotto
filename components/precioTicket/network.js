const express = require('express');
const response = require('../../network/response');
const responseController = require('./controller');
const route = express.Router();

route.get('/', async (req, res) => {
    try {
        const controller = await responseController.get();
        response.success(req, res, controller, 200);
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }
});

route.put('/', async (req, res) => {
    const { token, precio } = req.body;
    try {
        if(!token || !precio) throw "Datos Invalidos";
        const controller = await responseController.update(token, precio);
        response.success(req, res, controller, 200);
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }
});

module.exports = route;
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

route.post('/', async (req, res) => {
    const { token, date } = req.body;
    try {
        if(!token || !date) throw "Datos Invalidos";
        const controller = await responseController.query(token, date);
        response.success(req, res, controller, 200);
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }
});

route.post('/save-resultado', async (req, res) => {
    const {number, resultado, date} = req.body;
    try { 
        if(!number || !resultado || !date) throw 'Datos Invalidos';
        const controller = await responseController.save(number, resultado, date);
        response.success(req, res, controller, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 400);
    }
});

module.exports = route;
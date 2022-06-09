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

route.post('/save-resultado', async (req, res) => {
    const {number, sorteo, date} = req.body;
    console.log(number, sorteo, date)
    try { 
        if(!number || !sorteo || !date) throw 'Datos Invalidos';
        const controller = await responseController.save(number, sorteo, date);
        response.success(req, res, controller, 200);
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }
});

module.exports = route;
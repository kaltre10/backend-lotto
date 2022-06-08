const express = require('express');
const route = express.Router();
const response = require('../../network/response');
const responseController = require('./controller');

route.post('/', async (req, res) => {
    const {name, pass, level} = req.body;
    try {
        if(!name || !pass) throw 'Datos Invalidos';
        const controller = await responseController.auth(name, pass, level);
        response.success(req, res, controller, 200)
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }

});

route.post('/login', async (req, res) => {
    const {name, pass} = req.body;
   
    try {
        if(!name || !pass) throw 'Datos Invalidos';
        const controller = await responseController.login(name, pass);
        response.success(req, res, controller, 200);
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }

});

module.exports = route;
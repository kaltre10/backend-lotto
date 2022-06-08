const express = require('express');
const route = express.Router();
const response = require('../../network/response');
const responseController = require('./controller');

route.post('/', async (req, res) => {
    const {ticket} = req.body;
    try {
        if(!ticket) throw 'Datos Invalidos';
        const controller = await responseController.save(ticket);
        response.success(req, res, controller, 200)
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }

});

route.get('/:user', async (req, res) => {
    const { user } = req.params;
    try {
        if(!user) throw 'Datos Invalidos';
        const controller = await responseController.ticketUser(user);
        response.success(req, res, controller, 200)
    } catch (error) {
        response.error(req, res, error, 400);
    }

});

module.exports = route;
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

route.post('/ticket-user', async (req, res) => {
    const { token, date } = req.body;
    try {
        if(!token) throw 'Datos Invalidos';
        const controller = await responseController.ticketUser(token, date);
        response.success(req, res, controller, 200)
    } catch (error) {
        response.error(req, res, error, 400);
    }

});

module.exports = route;
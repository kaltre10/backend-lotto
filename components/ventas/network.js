const express = require('express');
const route = express.Router();
const response = require('../../network/response');
const responseController = require('./controller');

route.get('/:date', async (req, res) => {
    const { date } = req.params;
    try {
        if(!date) throw 'Datos Invalidos';
        const controller = await responseController.get(date);
        response.success(req, res, controller, 200);
    } catch (error) {
        console.log(error)
        response.error(req, res, error, 400);
    }

});

route.post('/', async (req, res) => {
    const {ticket} = req.body;
    try {
        if(!ticket) throw 'Datos Invalidos';
        const controller = await responseController.save(ticket);
        response.success(req, res, controller, 200);
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }

});

route.post('/ticket-user', async (req, res) => {
    const { token, date, status } = req.body;
    try {
        if(!token || !date || !String(status)) throw 'Datos Invalidos';
        const controller = await responseController.ticketUser(token, date, status);
        response.success(req, res, controller, 200)
    } catch (error) {
        response.error(req, res, error, 400);
    }

});

route.post('/ticket-query', async (req, res) => {
    const { count } = req.body;
    try {
        if(!count) throw 'Datos Invalidos';
        const controller = await responseController.ticketQuery(count);
        response.success(req, res, controller, 200)
    } catch (error) {
        response.error(req, res, error, 400);
    }

});

route.put('/ticket-pagar', async (req, res) => {
    const { token, id, status } = req.body;
    try {
        if(!token || !id || !status) throw 'Datos Invalidos';
        const controller = await responseController.ticketPagar(token, id, status);
        response.success(req, res, controller, 200)
    } catch (error) {
        response.error(req, res, error, 400);
    }

});

route.post('/all', async (req, res) => {
    const { token, desde, hasta } = req.body;
    try {
        
        if(!token || !desde || !hasta) throw 'Datos Invalidos';
        const controller = await responseController.getVentas(token, desde, hasta);
        response.success(req, res, controller, 200)
    } catch (error) {
        response.error(req, res, error, 400);
    }
})

module.exports = route;
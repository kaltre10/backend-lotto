const express = require('express');
const route = express.Router();
const response = require('../../network/response');
const responseController = require('./controller');

route.post('/', async (req, res) => {
    const {name, user, pass} = req.body;
    try {
        if(!user || !name || !pass) throw 'Datos Invalidos';
        const controller = await responseController.auth(name, user, pass);
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

route.post('/verify', async (req, res) => {
    const {token} = req.body;
   
    try {
        if(!token) throw 'Datos Invalidos';
        const controller = await responseController.verify(token);
        response.success(req, res, controller, 200);
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }

});

route.delete('/user-delete/:id', async (req, res) => {
    const {id} = req.params;
    try {
        if(!id) throw 'Datos Invalidos';
        const controller = await responseController.deleteUser(id);
        response.success(req, res, controller, 200)
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }
});

module.exports = route;
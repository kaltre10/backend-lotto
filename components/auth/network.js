const express = require('express');
const route = express.Router();
const response = require('../../network/response');
const responseController = require('./controller');
const cors = require('cors');

route.post('/', async (req, res) => {
    const {user, name, pass, token} = req.body;
    try {
        if(!user || !name || !pass || !token) throw 'Datos Invalidos';
        const controller = await responseController.auth(name, user, pass, token);
        response.success(req, res, controller, 200)
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }
});

route.post('/login', async (req, res) => {
    const {user, pass} = req.body;
    try {
        if(!user || !pass) throw 'Datos Invalidos';
        const controller = await responseController.login(user, pass);
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

route.delete('/user-delete', async (req, res) => {
    const {id, token} = req.body;
    try {
        if(!id || !token) throw 'Datos Invalidos';
        const controller = await responseController.deleteUser(id, token);
        response.success(req, res, controller, 200)
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }
});

route.post('/users', async (req, res) => {
    const {token} = req.body;
    try {
        if(!token) throw 'Datos Invalidos';
        const controller = await responseController.getUsers(token);
        response.success(req, res, controller, 200)
    } catch (error) {
        // console.log(error)
        response.error(req, res, error, 400);
    }
});

module.exports = route;
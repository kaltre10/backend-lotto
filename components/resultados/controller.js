const store = require('./store');
const toDay = require('../../services/toDay');
const jwt = require('jsonwebtoken');

const get = () => {
    return new Promise( async (resolve, reject) => {
        try {
            
            const resultados = await store.get(toDay);
            resolve(resultados);
            
        } catch (error) {
            reject(error);
        }
    });
}

const query = (token, date) => {
    return new Promise( async (resolve, reject) => {
        try {

            const desde = date + "T00:00:00.000+00:00";
            const hasta = date + "T23:59:59.000+00:00";
            const decoded = jwt.verify(token, 'secret');

            const resultados = await store.query(decoded.data.id, desde, hasta);
            resolve(resultados);
            
        } catch (error) {
            reject(error);
        }
    });
}

const save = (number, sorteo, date) => {
    return new Promise( async (resolve, reject) => {
        try {

            await store.save({number, sorteo, date});
            resolve("Guardado Correctamente!!!");
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    get,
    query,
    save
}
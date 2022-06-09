const store = require('./store');
const toDay = require('../../services/toDay');

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

const query = (date) => {
    return new Promise( async (resolve, reject) => {
        try {
            const resultados = await store.query(toDay);
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
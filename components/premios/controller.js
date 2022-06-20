const store = require('./store');
const jwt = require('jsonwebtoken');

const get = () => {
    return new Promise( async (resolve, reject) => {
        try {
            
            const premios = await store.get();
            resolve(premios);
            
        } catch (error) {
            reject(error);
        }
    });
}

const update = (token, type, premio) => {
    return new Promise( async (resolve, reject) => {
        try {
            const decoded = jwt.verify(token, 'secret');
            if(decoded.data.level != 1) throw 'No tiene Permisos';
            await store.update(type, premio);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    get,
    update,
}
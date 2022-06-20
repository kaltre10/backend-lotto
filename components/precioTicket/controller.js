const store = require('./store');
const jwt = require('jsonwebtoken');

const get = () => {
    return new Promise( async (resolve, reject) => {
        try {
            
            const precio = await store.get();
            resolve(precio);
            
        } catch (error) {
            reject(error);
        }
    });
}

const update = (token, precio) => {
    return new Promise( async (resolve, reject) => {
        try {
            const decoded = jwt.verify(token, 'secret');
            if(decoded.data.level != 1) throw 'No tiene Permisos';
            await store.update(precio);
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
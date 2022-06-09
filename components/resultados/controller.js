const store = require('./store');

const get = () => {
    return new Promise( async (resolve, reject) => {
        try {

            const resultados = await store.get();
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
    save,
}
const store = require('./store');

const get = () => {
    return new Promise( async (resolve, reject) => {
        try {
            const date = new Date();
            const toDay = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0')) + "T00:00:00.000+00:00";
            const resultados = await store.get(toDay);
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
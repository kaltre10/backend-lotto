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

            const ventas = await getTicket();
            const premiosDB = await store.getPremios();

            const premioAciertos = {
                1: premiosDB[0].premio,
                2: premiosDB[1].premio,
                3: premiosDB[2].premio,
                4: premiosDB[3].premio
            }

            ventas.forEach( async v => {
                let aciertos = v.aciertos;
                let premio = v.premio;
                if(v.numbers.includes(sorteo)){
                    aciertos++;
                    if(aciertos > 1){
                        premio = premioAciertos[aciertos - 1];
                        await store.updateTicket(v._id, aciertos, premio);
                        await store.updateStatus(v._id, 3);
                    }else{
                        await store.updateTicket(v._id, aciertos, premio);
                    }
                }
            })

            await store.save({number, sorteo, date});
            resolve("Guardado Correctamente!!!");
            
        } catch (error) {
            reject(error);
        }
    });
}

const getTicket = async () => {
    const date = new Date();
    const day = String(date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0'));
    const desde = day + "T00:00:00.000+00:00";
    const hasta = day + "T23:59:59.000+00:00";
    const ventas = await store.getVetas(desde, hasta);
    return ventas;
}

module.exports = {
    get,
    query,
    save
}
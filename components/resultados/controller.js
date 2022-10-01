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

const save = (number, sorteo, dayFront) => {
    return new Promise( async (resolve, reject) => {
        try {
            const toDay = new Date(dayFront);
            
            const ventas = await getTicket(dayFront);
            
            ventas.forEach( async v => {
                let aciertos = v.aciertos;
                let premio = v.premio;
                let arrayNumbers = v.numbers.map(n => n.number);
               
                if(arrayNumbers.includes(sorteo)){
                    
                    v.numbers.map( async n => {
                        if(n.number == sorteo && n.status == false){
                            aciertos++;
                            //modificamos las jugadas del ticket con status true
                            const newNumbers = v.numbers.map( e => {
                                if(e.number == sorteo){
                                    e.status = true;
                                }
                                return e;
                            })
                            
                            if(aciertos > 1){  
                                //modificamos a ticket ganador y el premio
                                // premio = premioAciertos[aciertos - 1];
                                
                                await store.updateTicket(v._id, aciertos, premio, newNumbers);
                                await store.updateStatus(v._id, 3);
                            }else{
                                await store.updateTicket(v._id, aciertos, premio, newNumbers);
                            }
            
                        }
                        
                    })
                    
                }

            })

            const date = String(toDay.getFullYear() + '-' + String(toDay.getMonth() + 1).padStart(2, '0') + '-' + String(toDay.getDate() + 1).padStart(2, '0'));

            await store.save({number, sorteo, date});
            resolve("Guardado Correctamente!!!");
            
        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}

const anular = (number, sorteo) => {
   
    return new Promise( async (resolve, reject) => {
        try {
            const toD = new Date();
            const ventas = await getTicket();
            const resultados = await store.get(toDay());
            const checkResult = resultados.filter( r => r.number == sorteo);
             
            if(checkResult.length <= 0) throw 'El sorteo no se ha registrado';

            ventas.forEach( async v => {
                let aciertos = v.aciertos;
                let premio = v.premio;
                let arrayNumbers = v.numbers.map(n => n.number);
                if(arrayNumbers.includes(String(number))){
                    v.numbers.map( async n => {
                        if(n.number == number && n.status == true){
                            aciertos--;
                            //modificamos las jugadas del ticket con status true
                            const newNumbers = v.numbers.map( e => {
                                if(e.number == sorteo){
                                    e.status = false;
                                }
                                return e;
                            })
                            
                            if(aciertos < 0) aciertos = 0;
                            if(aciertos < 1){  
                                //modificamos a ticket ganador y el premio
                                
                                await store.updateTicket(v._id, aciertos, premio, newNumbers);
                                await store.updateStatus(v._id, 0);
                            }else{
                                await store.updateTicket(v._id, aciertos, premio, newNumbers);
                            }
                        }
                        
                    })
                    
                }

            })

            
            const date = String(toD.getFullYear() + '-' + String(toD.getMonth() + 1).padStart(2, '0') + '-' + String(toD.getDate()).padStart(2, '0'));
            await store.deleteResultado(checkResult[0]._id);
            resolve("Anulado Correctamente!!!");
            
        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}

const getTicket = async (date) => {

    const dayDefault = new Date();
    dayDefault.setDate(dayDefault.getDate() - 1)

    const toDay = date || dayDefault;
    const yesterday = new Date(toDay)
    const previous = new Date(toDay)
    
    //Obtenemos el dia anterior
    // yesterday.setDate(yesterday.getDate() - 1)

    //Obtenemos el mismo dia
    yesterday.setDate(yesterday.getDate() + 1)
    previous.setDate(yesterday.getDate() - 6)

    // comparar fecha anterior y ajustar si son diferentes meses
    if(yesterday.getMonth() + 1 !=  previous.getMonth() + 1){
        previous.setMonth(previous.getMonth() + 1)
        previous.setDate(previous.getDate() - 1)
    }

    const dayPrevious = String(previous.getFullYear() + '-' + String(previous.getMonth() + 1).padStart(2, '0') + '-' + String(previous.getDate()).padStart(2, '0'));

    const day = String(yesterday.getFullYear() + '-' + String(yesterday.getMonth() + 1).padStart(2, '0') + '-' + String(yesterday.getDate()).padStart(2, '0'));
    

    const desde = dayPrevious + "T00:00:00.000+00:00";
    // console.log("🚀 ~ file: controller.js ~ line 171 ~ getTicket ~ desde", desde)
    const hasta = day + "T23:59:59.000+00:00";
    // console.log("🚀 ~ file: controller.js ~ line 173 ~ getTicket ~ hasta", hasta)
   
    const ventas = await store.getVetas(desde, hasta);
    // console.log("🚀 ~ file: controller.js ~ line 177 ~ getTicket ~ ventas", ventas)
    
    return ventas;
}

module.exports = {
    get,
    query,
    save,
    anular
}
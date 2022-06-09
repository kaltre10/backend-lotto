const store = require('./store');
const jwt = require('jsonwebtoken');

const save = (ticket) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            const  decoded = await jwt.verify(ticket.token, 'secret');
            ticket.user = decoded.data.id;
            await store.save(ticket);
            resolve("Guardado con Exito!!");
            
        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}

const ticketUser = (token, date) => {
    return new Promise( async (resolve, reject) => {
        try {

            const desde = date + "T00:00:00.000+00:00";
            const hasta = date + "T23:59:59.000+00:00";
            const decoded = await jwt.verify(token, 'secret');
            const tickets = await store.getTicketUser(decoded.data.id, desde, hasta);
            resolve(tickets);
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    save,
    ticketUser
}
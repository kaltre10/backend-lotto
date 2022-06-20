const store = require('./store');
const jwt = require('jsonwebtoken');

const save = (ticket) => {
    return new Promise( async (resolve, reject) => {
        try {
            
            const  decoded = jwt.verify(ticket.token, 'secret');
            const count = await store.incrementId();
            const premio = await store.getPremio();
            const precio = await store.getPrecio();
            ticket.user = decoded.data.id;
            ticket.count = count;
            // ticket.premio = premio.premio;
            ticket.precio = precio.precio;
            await store.save(ticket);
            resolve("Guardado con Exito!!");
            
        } catch (error) {
            console.log(error)
            reject(error);
        }
    });
}

const ticketUser = (token, date, status) => {
    return new Promise( async (resolve, reject) => {
        try {

            const desde = date + "T00:00:00.000+00:00";
            const hasta = date + "T23:59:59.000+00:00";
            const decoded = await jwt.verify(token, 'secret');

            //verificar consulta por status
            let tickets;
            if(status == "0"){
                tickets = await store.getTicketUser(decoded.data.id, desde, hasta);
            }else{
                tickets = await store.getTicketUserStatus(decoded.data.id, desde, hasta, status);
            }
            
            resolve(tickets);
            
        } catch (error) {
            reject(error);
        }
    });
}

const ticketQuery = (count) => {
    return new Promise( async (resolve, reject) => {
        try {

            const ticket = await store.query(count);
            if(!ticket) resolve("Ticket no existe!")
            // resolve(ticket);
            resolve(ticket);
            
        } catch (error) {
            reject(error);
        }
    });
}

const ticketPagar = (token, id, status) => {
    return new Promise( async (resolve, reject) => {
        try {

            const decoded = jwt.verify(token, 'secret');
            if(decoded.data.level !== 1) throw 'No tiene Permisos';
            const ticket = await store.setTicket(id, status);
            if(!ticket) resolve("Ticket no existe!")
            // resolve(ticket);
            resolve("Ticket Modificado!");
            
        } catch (error) {
            reject(error);
        }
    });
}

const getVentas = (token, desde, hasta) => {

    return new Promise( async (resolve, reject) => {
        try {

            const decoded = jwt.verify(token, 'secret');
            if(decoded.data.level !== 1) throw 'No tiene Permisos';
            desde = desde + "T00:00:00.000+00:00";
            hasta = hasta + "T23:59:59.000+00:00";
            const ventas = await store.getVentas(desde, hasta);
            resolve(ventas);
            
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    save,
    ticketUser,
    ticketPagar,
    ticketQuery,
    getVentas
}
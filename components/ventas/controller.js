const store = require('./store');

const save = (ticket) => {
    return new Promise( async (resolve, reject) => {
        try {
        
            await store.save(ticket);
            resolve();
            
        } catch (error) {
            reject(error);
        }
    });
}

const ticketUser = user => {
    return new Promise( async (resolve, reject) => {
        try {
            
            const tickets = await store.getTicketUser(user);
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
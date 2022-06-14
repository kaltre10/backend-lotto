const Model = require('./model');

const save = (data) => Model(data).save();
const setTicket = (count, status) => Model.findOneAndUpdate({ count }, { status });
const query = (count) => Model.find({ count });
const getTicketUser = (user, desde, hasta) => {
    return Model.find({ user, date: {"$gte": desde, "$lt": hasta} });
} 
const incrementId = async () => {
    try {
        //consultamos el ultimo registro
        let last = await Model.find().sort({ count: 'desc' }).limit(1);

        //verificamos si no hay registros
        if(last.length === 0) last = [{ count: 0 }];

        //incrementamos en 1
        return last[0].count + 1;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    save,
    getTicketUser,
    setTicket,
    incrementId,
    query
}
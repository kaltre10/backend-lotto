const Model = require('./model');
const premioModel = require('../premios/model');
const precioModel = require('../precioTicket/model');

const get = (desde, hasta) => {
    return Model.find({ date: {"$gte": desde, "$lt": hasta} }).sort({ aciertos: 'desc' }).populate('user');
} 
const save = (data) => Model(data).save();
const setTicket = (count, status) => Model.findOneAndUpdate({ count }, { status });
const query = (count) => Model.find({ count });
const getTicketUser = (user, desde, hasta) => {
    return Model.find({ user, date: {"$gte": desde, "$lt": hasta} }).sort({ count: 'desc' });
} 
const getTicketUserStatus = (user, desde, hasta, status) => {
    return Model.find({ user, date: {"$gte": desde, "$lt": hasta}, status });
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

const getPremio = () => premioModel.findOne({ type: 4 });
const getPrecio = () => precioModel.findOne();

const getVentas = (desde, hasta) => Model.find({ date: {"$gte": desde, "$lt": hasta} }).populate('user');
const getLastTicket = () => Model.findOne().sort({count: 'desc'});

module.exports = {
    get,
    save,
    getTicketUser,
    setTicket,
    incrementId,
    query,
    getPremio,
    getPrecio,
    getVentas,
    getTicketUserStatus,
    getLastTicket
}
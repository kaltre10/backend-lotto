const Model = require('./model');
const ModelTickets = require('../ventas/model');
const ModelPremios = require('../premios/model');

const get = (toDay) => Model.find({date: toDay});
const query = (user, desde, hasta) => {
    return Model.find({ user, date: {"$gte": desde, "$lt": hasta} });
} 
const queryResult = (desde, hasta) => {
    return Model.find({ date: {"$gte": desde, "$lt": hasta} });
} 
const save = (data) => Model(data).save();

const getVetas = (desde, hasta) => ModelTickets.find({ date: {"$gte": desde, "$lt": hasta} });
const getPremios = () => ModelPremios.find();
const updateTicket = (_id, aciertos, premio, numbers) => ModelTickets.findOneAndUpdate({ _id }, { premio, aciertos, numbers});
const updateStatus = (_id, status) => ModelTickets.findOneAndUpdate({ _id }, { status });

module.exports = {
    get,
    save,
    query,
    getVetas,
    getPremios,
    updateTicket,
    updateStatus,
    queryResult
}
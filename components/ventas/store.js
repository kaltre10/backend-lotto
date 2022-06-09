const Model = require('./model');

const save = (data) => Model(data).save();
const getTicketUser = (user, desde, hasta) => {
    return Model.find({ user, date: {"$gte": desde, "$lt": hasta} });
} 

module.exports = {
    save,
    getTicketUser
}
const Model = require('./model');

const save = (data) => Model(data).save();
const getTicketUser = user => {
    return Model.find({ user });
} 

module.exports = {
    save,
    getTicketUser
}
const Model = require('./model');

const save = (data) => Model(data).save();
const get = (name) => Model.findOne({ name }); 
const deleteUser = (_id) => Model.deleteOne({ _id });

module.exports = {
    save,
    get,
    deleteUser
}
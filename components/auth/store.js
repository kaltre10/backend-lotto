const Model = require('./model');

const save = (data) => Model(data).save();
const get = (name) => Model.findOne({ name }); 
const getUsers = () => Model.find({ level: 0}); 
const deleteUser = (_id) => Model.deleteOne({ _id });

module.exports = {
    save,
    get,
    deleteUser,
    get,
    getUsers
}
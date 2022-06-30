const { modelNames } = require('mongoose');
const Model = require('./model');

const save = (data) => Model(data).save();
const get = (user) => Model.findOne({ user }); 
const getUsers = () => Model.find({ level: 0}); 
const deleteUser = (_id) => Model.deleteOne({ _id });
const userUpdate = (_id, saldo) => Model.findOneAndUpdate({ _id }, { saldo });

module.exports = {
    save,
    get,
    deleteUser,
    get,
    getUsers,
    userUpdate
}
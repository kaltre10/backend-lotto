const Model = require('./model');

const save = (data) => Model(data).save();
const get = (user) => Model.findOne({ user }); 
const userId = (_id) => Model.findOne({ _id }); 
const getUsers = () => Model.find({ level: 0}); 
const deleteUser = (_id) => Model.deleteOne({ _id });
const userUpdate = (_id, saldo) => Model.findOneAndUpdate({ _id }, { saldo });

module.exports = {
    save,
    get,
    deleteUser,
    getUsers,
    userUpdate,
    userId
}
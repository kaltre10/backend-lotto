const Model = require('./model');

const get = () => Model.find();
const save = (data) => Model(data).save();

module.exports = {
    get,
    save
}
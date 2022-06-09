const Model = require('./model');

const get = () => Model.find({date: Date.now()});
const save = (data) => Model(data).save();

module.exports = {
    get,
    save
}
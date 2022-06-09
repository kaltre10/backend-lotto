const Model = require('./model');

const get = (toDay) => Model.find({date: toDay});
const save = (data) => Model(data).save();

module.exports = {
    get,
    save
}
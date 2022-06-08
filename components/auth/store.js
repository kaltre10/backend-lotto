const Model = require('./model');

const save = (data) => Model(data).save();
const get = (name) => Model.findOne({ name }); 

module.exports = {
    save,
    get
}
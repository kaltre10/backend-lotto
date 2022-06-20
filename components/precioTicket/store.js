const Model = require('./model');

const get = () => Model.find();

const update = (precio) => Model.findOneAndUpdate({}, { precio });

module.exports = {
    get,
    update
}
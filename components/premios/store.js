const Model = require('./model');

const get = () => Model.find();

const update = (type, premio) => Model.findOneAndUpdate({ type }, { premio });

module.exports = {
    get,
    update
}
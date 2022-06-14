const Model = require('./model');

const get = (toDay) => Model.find({date: toDay});
const query = (user, desde, hasta) => {
    return Model.find({ user, date: {"$gte": desde, "$lt": hasta} });
} 
const save = (data) => Model(data).save();

module.exports = {
    get,
    save,
    query
}
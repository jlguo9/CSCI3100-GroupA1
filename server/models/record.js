const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
    dishID: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    canteen: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    }
},{timestamps:true})
const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
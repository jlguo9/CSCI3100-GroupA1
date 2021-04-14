const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    detail: {
        type: String,
        required: true// to do
    },
    ownID: {
        type: String,
        required: true// to do
    },
    userName: {
        type: String,
        required:true
    },
    likeNum:{
        type: Number,
        required: false,
        default: 0
    },
    canteen: {
        type: String,
        required: true
    },
    dish: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false,
        default: 5
    }
},{timestamps: true})

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;

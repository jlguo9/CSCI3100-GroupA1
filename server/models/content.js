const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    ownID: {
        type: String,
        required: true
    },
    publishDate: {
        type: String,
        required: true
    },
    likeNum:{
        type: String,
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
})

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;
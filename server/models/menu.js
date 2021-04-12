const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
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
    rating: {
        type: Number,
        required: false
    }
})
const Menu = mongoose.model('Menu', menuSchema);

module.exports = Menu;
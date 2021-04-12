const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
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
})
const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
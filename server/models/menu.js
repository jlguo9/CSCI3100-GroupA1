const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
MODULE OF MENU'S MODEL
MODULE NAME: MENU_MODEL
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.0 (13 APRIL 2021)
DESCRIBE: Each dish in menu has its ID (generated by the db), dish name,
price, canteen, and rating(not required)
 */
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

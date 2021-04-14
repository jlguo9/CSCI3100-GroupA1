const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default: "user"
    },
    canteen: {
        type: String,
        required: false,
        default: ""
    }
})
const User = mongoose.model("User",userSchema);

module.exports = User;

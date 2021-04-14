const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    contentID: {
        type: String,
        required:true
    },
    userID: {
        type: String,
        required: true
    }
})

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;

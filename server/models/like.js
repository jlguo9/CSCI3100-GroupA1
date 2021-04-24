const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// this collection is to store the post-user like relation
// each item has its ID(doesn't matter), ID of the post and ID of the user
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

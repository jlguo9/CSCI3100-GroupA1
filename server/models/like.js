const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*
MODULE OF LIKE'S MODEL
MODULE NAME: LIKE_MODEL
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.0 (15 APRIL 2021)
DESCRIBE: this collection is to store the post-user like relation
each item has its ID(doesn't matter), ID of the post and ID of the user
 */
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

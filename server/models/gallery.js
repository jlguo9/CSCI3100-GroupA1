const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gallerySchema = new Schema({
    username: {
        type: String,
        required:true,
    },
    dish: {
      type: String,
      required: true
    },
    canteen: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    }
})
const Gallery = mongoose.model("Gallery",gallerySchema);

module.exports = Gallery;

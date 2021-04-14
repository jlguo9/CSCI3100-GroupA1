const Gallery = require('../models/gallery');
const multer = require('multer');
const path = require('path');
//set storage engine
const storage = multer.diskStorage({
    destination: './static/uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() +
        path.extname(file.originalname));
    }
})
//Init upload
const upload = multer({
    storage: storage,
    limits: {
        filesize: 1024 * 2014 * 100
    },
    fileFilter: function(req,file,cb){

    }
}).single('dishImage');

exports.image_post = (req,res) => {
    upload(req,res,(err) => {
        if(err){
            res.status(500).json({State: "upload_failed",Data:""});
        }
        else{
            console.log(req.file);

        }
    });
}

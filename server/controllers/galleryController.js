const Gallery = require('../models/gallery');
const multer = require('multer');
const path = require('path');
//set storage engine
const storage = multer.diskStorage({
    destination: '../uploads',
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
            console.log(err);
            res.status(500).json({State: "upload_failed",Data:""});
        }
        else{
            console.log(req.file);
            const image = new Gallery({
                username: req.body.name,
                dish: req.body.dish,
                canteen: req.body.canteen,
                Image: req.file.path
            })
            image.save()
                .then(() => {
                    res.status(201).json({State: 'success',Data:""});
                })
                .catch(err => {
                    console.log(err);
                })
        }
    });
}

const Gallery = require('../models/gallery');
// const multer = require('multer');

exports.image_post = (req,res,next) => {
            console.log(req.file);
            const image = new Gallery({
                username: req.userData.name,
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

exports.image_get = (req,res) =>{
    const canteenName = req.params.canteen;
    Gallery.find({canteen: canteenName})
        .then(Data =>{
            res.status(200).json({State:"success", Data});
        })
}

const Gallery = require('../models/gallery');

// API for uploading a new image
exports.image_post = (req,res,next) => {
            console.log(req.file);
            const image = new Gallery({
                username: req.userData.name,  // read user name from the token
                dish: req.body.dish,
                canteen: req.body.canteen,
                Image: req.file.path    // store the url of the image
            })
            image.save()
                .then(() => {
                    res.status(201).json({State: 'success',Data:""});
                })
                .catch(err => {
                    console.log(err);
                })
}

// API for getting all images of a certain canteen
exports.image_get = (req,res) =>{
    const canteenName = req.params.canteen;
    Gallery.find({canteen: canteenName})
        .then(Data =>{
            res.status(200).json({State:"success", Data});
        })
}

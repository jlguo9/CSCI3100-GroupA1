/*
MODULE NAME: GALLERY
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.3.2 (16 APRIL 2021)
IS_COMPOSED_OF: IMAGE_POST, IMAGE_GET, GALLERY_MODEL
PURPOSE: Achieve image uploading and get all images of a certain canteen functions
 */
const Gallery = require('../models/gallery');
/*
MODULE TO UPLOAD A NEW IMAGE
MODULE NAME: IMAGE_POST
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 2.1 (16 APRIL 2021)
PROCEDURE INVOCATION:
    router.post("/gallery/add",upload.single('dishImage'),check_auth, galleryController.image_post);
INPUT PARAMETERS:
    json and image
OUTCOME: Add a new item to "galleries" collection in MongoDB
 */
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
/*
MODULE TO GET ALL IMAGES OF A CERTAIN CANTEEN
MODULE NAME: IMAGE_GET
PROGRAMMER: GUO Jialiang 1155124399
VERSION: 1.1 (15 APRIL 2021)
PROCEDURE INVOCATION:
    router.get("/gallery/:canteen",galleryController.image_get);
INPUT PARAMETERS:
    canteenName
OUTPUT PARAMETERS:
    State, Data
 */
exports.image_get = (req,res) =>{
    const canteenName = req.params.canteen;
    Gallery.find({canteen: canteenName})
        .then(Data =>{
            res.status(200).json({State:"success", Data});
        })
}

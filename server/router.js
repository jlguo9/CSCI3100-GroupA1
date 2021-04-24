const userController = require('./controllers/userController');
const likeController = require('./controllers/likeController');
const menuController = require('./controllers/menuController');
const contentController = require('./controllers/contentController');
const recordController = require('./controllers/recordController');
const cartController = require('./controllers/cartController');
const galleryController = require('./controllers/galleryController');

const express = require('express');
const multer = require('multer');
const router=express.Router();

const check_auth = require('./middleware/check_auth');
const path = require('path');

//set storage engine
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() +
            path.extname(file.originalname));
    }
})

//Init upload
const upload = multer({
    storage: storage,
    limits: {
        filesize: 1024 * 2014 * 100 //limited file size: 100M
    }
});

//menu routes
router.get("/menu/index", menuController.menu_get);
router.post("/menu/add", check_auth,menuController.menu_add);//check_auth,
router.delete("/menu/:id", check_auth,menuController.menu_delete);//check_auth,
router.put("/menu/:id", check_auth,menuController.menu_update);//check_auth,

//shopping cart routes
router.get("/cart/index", check_auth,cartController.cart_get);
router.post("/cart/add", check_auth,cartController.cart_add);
router.delete("/cart/:id",check_auth,cartController.cart_delete);
router.put("/cart/:id",check_auth,cartController.cart_update);

//record routes
router.get("/record/index", check_auth,recordController.record_get);
router.post("/record/add", check_auth,recordController.record_add);
router.delete("/record/:id",check_auth,recordController.record_delete);

//content routes
router.get("/content/index",contentController.content_get_all);
//router.get("/content/:id",contentController.content_get);
//router.delete("/content/:id",check_auth,contentController.content_delete);
router.put("/content/:id",check_auth,contentController.content_update);
router.post("/content/publish",check_auth,contentController.content_publish);

//like routes
router.post("/content/like",check_auth,likeController.like_it);
router.delete("/content/like/:id",check_auth,likeController.cancel_like);

//user routes
router.post("/user/register",userController.register);
router.get("/user/login",userController.login);
router.get("/user/logout",userController.logout);
router.get("/user/info/:id",userController.get_info);
//router.put("/user/password",userController.change_password);

//gallery routes
router.post("/gallery/add",upload.single('dishImage'),check_auth, galleryController.image_post);
router.get("/gallery/:canteen",galleryController.image_get);

module.exports = router;

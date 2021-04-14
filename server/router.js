const userController = require('./controllers/userController');
const likeController = require('./controllers/likeController');
const menuController = require('./controllers/menuController');
const contentController = require('./controllers/contentController');
const recordController = require('./controllers/recordController');
const cartController = require('./controllers/cartController');

const express = require('express');
const router=express.Router();

const check_auth = require('./middleware/check_auth');

//parse url sent by client and hand over to corresponding controllers
//to do...

//menu routes
router.get("/menu/index", menuController.menu_get);
router.post("/menu/add", check_auth,menuController.menu_add);//check_auth,
router.delete("/menu/:id", check_auth,menuController.menu_delete);//check_auth,
router.put("/menu/:id", check_auth,menuController.menu_update);//check_auth,

//shopping cart routes
router.get("/cart/index", check_auth,cartController.cart_get);//check_auth,
router.post("/cart/add", check_auth,cartController.cart_add);//check_auth,
router.delete("/cart/:id",check_auth,cartController.cart_delete);//check_auth,
router.put("/cart/:id",check_auth,cartController.cart_update);//check_auth,
//record routes
router.get("/record/index", check_auth,recordController.record_get);//check_auth,
router.post("/record/add", check_auth,recordController.record_add);//check_auth,
router.delete("/record/:id",check_auth,recordController.record_delete);//check_auth,

//content routes
router.get("/content/index",contentController.content_get_all);
//router.get("/content/:id",contentController.content_get);
//router.delete("/content/:id",check_auth,contentController.content_delete);//check_auth,
router.put("/content/:id",check_auth,contentController.content_update);//check_auth,
router.post("/content/publish",check_auth,contentController.content_publish);//check_auth,

//like routes
router.post("/content/like/:id",check_auth,likeController.like_it);
router.delete("/content/like/:id",check_auth,likeController.cancel_like);

//user routes
router.post("/user/register",userController.register);
router.get("/user/login",userController.login);
router.get("/user/logout",userController.logout);
router.get("/user/info/:id",userController.get_info);
//router.put("/user/password",userController.change_password);

//gallery routes

module.exports = router;

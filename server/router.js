var userController = require('./controllers/userController');
var likeController = require('./controllers/likeController');
var menuController = require('./controllers/menuController');
var contentController = require('./controllers/contentController');
var recordController = require('./controllers/recordController');
var cartController = require('./controllers/cartController');

var express = require('express');
var router=express.Router();
var passport = require('passport');

//parse url sent by client and hand over to corresponding controllers
//to do...

//menu routes
router.get("/menu/index", menuController.menu_get);
router.post("/menu/add", menuController.menu_add);
router.delete("/menu/:id", menuController.menu_delete);
router.put("/menu/:id", menuController.menu_update);

//shopping cart routes
router.get("/cart/index", cartController.cart_get);
router.post("/cart/add", cartController.cart_add);
router.delete("/cart/:id",cartController.cart_delete);

//record routes
router.get("/record/index", recordController.record_get);
router.post("/record/add", recordController.record_add);
router.delete("/record/:id",recordController.record_delete);

//content routes
router.get("/content/index",contentController.content_get_all);
router.get("/content/:id",contentController.content_get);
router.delete("/content/:id",contentController.content_delete);
router.put("/content/:id",contentController.content_update);
router.post("/content/publish",contentController.content_publish);

//like routes
router.post("/content/like/:id",likeController.like);
router.delete("/content/like/:id",likeController.cancel_like);

//user routes
router.post("/user/register",userController.register);
router.post("/user/login",userController.login);
router.post("/user/logout",userController.logout);
router.put("/user/password",userController.change_password);
router.get("/user/info/:id",userController.get_info);

module.exports = router;
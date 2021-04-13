const userController = require('./controllers/userController');
const likeController = require('./controllers/likeController');
const menuController = require('./controllers/menuController');
const contentController = require('./controllers/contentController');
const recordController = require('./controllers/recordController');
const cartController = require('./controllers/cartController');

const express = require('express');
const router=express.Router();


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
router.get("/user/login",userController.login);
router.get("/user/logout",userController.logout);
router.get("/user/info/:id",userController.get_info);
//router.put("/user/password",userController.change_password);

module.exports = router;
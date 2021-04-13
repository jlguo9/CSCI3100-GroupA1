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
router.post("/menu/add", check_auth,menuController.menu_add);
router.delete("/menu/:id", check_auth,menuController.menu_delete);
router.put("/menu/:id", check_auth,menuController.menu_update);

//shopping cart routes
router.get("/cart/index", check_auth,cartController.cart_get);
router.post("/cart/add", check_auth,cartController.cart_add);
router.delete("/cart/:id",check_auth,cartController.cart_delete);

//record routes
router.get("/record/index", check_auth,recordController.record_get);
router.post("/record/add", check_auth,recordController.record_add);
router.delete("/record/:id",check_auth,recordController.record_delete);

//content routes
router.get("/content/index",contentController.content_get_all);
router.get("/content/:id",contentController.content_get);
router.delete("/content/:id",check_auth,contentController.content_delete);
router.put("/content/:id",check_auth,contentController.content_update);
router.post("/content/publish",check_auth,contentController.content_publish);

//like routes
router.post("/content/like/:id",check_auth,likeController.like);
router.delete("/content/like/:id",check_auth,likeController.cancel_like);

//user routes
router.post("/user/register",userController.register);
router.get("/user/login",userController.login);
router.get("/user/logout",userController.logout);
router.get("/user/info/:id",userController.get_info);
//router.put("/user/password",userController.change_password);

module.exports = router;
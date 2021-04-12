var userController = require('./controllers/userController');
var ikeController = require('./controllers/likeController');
var menuController = require('./controllers/menuController');
var contentController = require('./controllers/contentController');
var recordController = require('./controllers/recordController');
var shoppingcartContorller = require('./controllers/shoppingcartController');

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

module.exports = router;
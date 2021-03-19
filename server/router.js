var userController = require('./controllers/userController');
var dishController = require('./controllers/dishController');
var restaurantController = require('./controllers/restaurantController');
var postController = require('./controllers/postController');
var recordController = require('./controllers/recordController');

var express = require('express');
var router=express.Router();
var passport = require('passport');

module.exports = function(app){
    //parse url sent by client and hand over to corresponding controllers
    //to do...
};
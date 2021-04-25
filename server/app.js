/*
PROGRAM APP – Program provide backend service for website Foodification
PROGRAMMER: GUO Jialiang 1155124399
VERSION 2: written 20-3-2021
REVISION 2.7: 15-4-2021 to allow cross domain access.
PURPOSE: Connect to MongoDB; Load express module; Route frontend requests to corresponding
middlewares and controllers and proceed by interacting with database.
ALGORITHM: Accept HTTP request, pass it to handlers and proceed.
 */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./router');
const bodyParser = require('body-parser');
const fs = require('fs');
//express app
const app = express();

//Allow cross domain access
app.all("*",function(req,res,next){
  res.header("Access-Control-Allow-Origin","http://localhost:8080");
  res.header("Access-Control-Allow-Headers","*");
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() === 'options')
    res.send(200);
  else
    next();
});

//set the path to static resources(uploaded pictures)
app.use('/api/gallery/uploads',express.static('uploads'));

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// the router
app.use('/api',router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

//database setting
const db_url = "mongodb+srv://CSCI3100A1:csci3100a1@cluster0.6knyz.mongodb.net/foodification?retryWrites=true&w=majority";
mongoose.connect(db_url, {useUnifiedTopology: true, useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log("Successfully connected to " + db_url);
});

module.exports = app;

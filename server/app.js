const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./router');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require("http");
const fs = require('fs');
//express app
const app = express();

/*currently no use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());*/

//set the path to rootDir and projectDir
const rootDir=path.resolve(__dirname);
const projectDir=path.resolve(__dirname,'../','client');
app.use(express.static(rootDir));
app.use(express.static(projectDir));
//middleware
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// the router
app.use('/api',router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

/* error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({code:500,msg:"error"});
});*/

//database setting
const db_url = "mongodb://localhost:27017/foodification";
mongoose.connect(db_url, {useUnifiedTopology: true, useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log("Successfully connected to " + db_url);
});

//set models
const models = path.join(__dirname,"models");
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(path.join(models, file)));

module.exports = app;

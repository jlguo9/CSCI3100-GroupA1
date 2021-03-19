var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require('./router');
var fs = require('fs');
var http = require("http");
var app = express();

/*currently no use
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());*/

//set the path to static sources
var rootDir=path.resolve(__dirname);
var projectDir=path.resolve(__dirname,'../','client');
app.use(express.static(rootDir));
app.use(express.static(projectDir));

app.use('/api',router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({code:500,msg:"error"});
});

//database setting
var mongoose = require('mongoose');
const db_url = "mongodb://localhost:27017/foodification";
mongoose.connect(db_url,{useUnifiedTopology:true, useNewUrlParser:true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log("Successfully connected to " + db_url);
});

//set models
var models = path.join(__dirname,"models");
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(join(models, file)));

module.exports = app;

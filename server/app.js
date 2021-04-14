const createError = require('http-errors');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const router = require('./router');

const bodyParser = require('body-parser');
const fs = require('fs');
//express app
const app = express();

app.all("*",function(req,res,next){
  res.header("Access-Control-Allow-Origin","http://localhost:8080");
  res.header("Access-Control-Allow-Headers","*");
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() === 'options')
    res.send(200);
  else
    next();
});

//set the path to static resources
app.use('/api/uploads',express.static('uploads'));

//middleware
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
const db_url = "mongodb+srv://CSCI3100A1:csci3100a1@cluster0.6knyz.mongodb.net/foodification?retryWrites=true&w=majority";
mongoose.connect(db_url, {useUnifiedTopology: true, useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log("Successfully connected to " + db_url);
});

//set models (no use now)
/*const models = path.join(__dirname,"models");
fs.readdirSync(models)
    .filter(file => ~file.search(/^[^\.].*\.js$/))
    .forEach(file => require(path.join(models, file)));*/

module.exports = app;

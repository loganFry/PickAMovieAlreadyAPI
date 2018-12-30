var createError = require('http-errors');
require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');


var indexRouter = require('./routes/index');

// Get the API route ...

var api = require('./routes/api.route')

var app = express();

app.set('port', process.env.PORT);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(process.env.CLIENT_FOLDER));

// Allow CORS for Angular app
app.use(cors());

//Use the API routes for all routes matching /api
app.use('/api', api);

// Routes for client app
app.use('*', indexRouter);

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
  res.render('error');
});

var bluebird = require('bluebird')
var mongoose = require('mongoose')
mongoose.Promise = bluebird
mongoose.connect(process.env.DB_URL)
.then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : ${process.env.DB_URL}`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : ${process.env.DB_URL}`)})


module.exports = app;

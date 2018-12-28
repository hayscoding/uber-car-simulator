var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var firebase = require('firebase');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var simulatorRouter = require('./routes/simulator');

var app = express();
var config = require('./config');

firebase.initializeApp({
	apiKey: config.FB_KEY,
	authDomain: config.FB_AUTH_DOMAIN,
	databaseURL: config.FB_DB_URL,
	projectId: config.FB_PROJECT,
	storageBucket: config.FB_STORAGE_BUCKET,
	messagingSenderId: config.FB_MSG_ID
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/simulator', simulatorRouter);

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

module.exports = app;

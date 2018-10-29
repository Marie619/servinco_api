var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
//this is the route that will help us to manage the user end of the app for user CRUD
var usersRouter = require('./routes/users/user');
var locatiosRouter = require('./routes/locations/location');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/location', locatiosRouter);

module.exports = app;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')
var cors = require('cors')
var dotenv = require('dotenv');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
app.use(cors())
app.use('/images',express.static('./uploads/'))
dotenv.config({path:'./config.env'})
require('./models/connecttodb')
app.use(session(
    {
      name: 'sid',
      secret: 'random message', //this is needed for making a session key
      saveUninitialized: false, //for login sessions set it to false, setting to true means store blank sessions
      resave: false,
    }
  )
  );
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

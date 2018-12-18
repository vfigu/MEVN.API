const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./config');
const cors = require('./middlewares/cors')

// router links
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const chatsRouter = require('./routes/chats');
const authnRouter = require('./routes/authn');

const router = express.Router();

const app = express();

// database
const mongoose = require('mongoose');
let db = config.database;
mongoose.Promise = require('bluebird');
mongoose.connect(db, { promiseLibrary: require('bluebird') })
  .then(() => {
    console.log('Connected successfully to server')
  })
  .catch((err) => {
    console.error(err)
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', indexRouter);
app.use('/api/auth', authnRouter);
app.use('/api/user', usersRouter);
app.use('/api/chat', chatsRouter);

// redirect home if page does not exist
app.get('*', (req, res) => {
    res.redirect(301, '/');
});

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

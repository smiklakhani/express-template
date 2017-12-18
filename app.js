// require dependencies
const express = require('express');
const path = require('path');
const logger = require('winston');
const httpLogger = require('morgan');
const helmet = require('helmet');

// require routes
const index = require('./routes/index');
const users = require('./routes/users');

// create Express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// logging setup
app.use(httpLogger('dev'));

// HTTP header security setup
app.use(helmet());

// setup to enable application to parse incoming JSON payloads
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  logger.log('error', 'Requested resource does not exist.');
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

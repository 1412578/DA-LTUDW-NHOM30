var createError = require('http-errors');
var express = require('express');
var exphbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var routes = require('./routes/routes.js');
var session = require('express-session');
var sessionPassData = require("./middle-wares/sessionPassData");
var applicationErrorHandler = require("./middle-wares/applicationErrorHandler");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'layout',
    layoutsDir: 'views/_layouts/',
    helpers:{
      if_eq: function(src, target, options){
        if (src == target) 
          return options.fn(this);
      }
    }
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session({
	secret: "...,^.^,...",
	cookie: {maxAge: 7*24*60*60*1000},
	saveUninitialized: false,
	resave: false
}));
// Routes
app.use(sessionPassData);
app.use('/', routes.index());
app.use('/user', routes.users());
app.use('/session', routes.sessions());
app.use('/product', routes.products());
app.use('/order', routes.orders());
app.use('/category', routes.categories());
app.use('/vendor', routes.vendors());
app.use('/admin', routes.admin());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(applicationErrorHandler);
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {layout: null});
});

module.exports = app;

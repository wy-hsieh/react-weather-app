var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hsitory = require('connect-history-api-fallback')


// var indexRouter = require('./routes/index');
// const { application } = require('express');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


const addSecurityHeaders = function(req, res, next) {
  res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  // res.header('Content-Security-Policy-Report-Only', "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'")
  res.header('X-Frame-Options', 'deny')
  res.header('X-Content-Type-Options', 'nosniff')

  res.header('Referrer-Policy', 'no-referrer')
  res.header('Permissions-Policy', "accelerometer 'none'; camera 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; payment 'none'; usb 'none'")
  next()
}

app.use(addSecurityHeaders)


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use(hsitory({
  verbose: true,
  index: '/'
}))

app.get('*', (req, res) => {
  console.log('404')
  res.sendFile(__dirname+'/build/index.html')
})

// app.use('/api', indexRouter);


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

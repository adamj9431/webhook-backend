const express = require("express")
const morgan = require('morgan')
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')
const fs = require('fs')
require('dotenv').config()

const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 3000;
const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Auth
const accounts = JSON.parse(fs.readFileSync("src/config/auth.json"))
app.use(basicAuth(accounts))


// log requests
app.use(morgan('dev'))

// log request coming and going
// app.use(require('morgan')(':date[iso] req :method :url', { immediate: true }));
// app.use(require('morgan')(':date[iso] res :method :url :status :response-time ms - :res[content-length]'));

app.use(require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      'errors': {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  });
});


app.listen(port, () => {
  console.log('Webhook backend running on port: %d', port);
});
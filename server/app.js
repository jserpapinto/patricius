"use strict"
// Dependências
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

// Routes Front e Back Office
let routesF = require('./routes/f');
let routesB = require('./routes/backoffice');

//Inicia App Express
let app = express();


//ENABLE CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*******************
*    MIDDLEWARE     *
*******************/
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// Mostra os pedidos no terminal
app.use(logger('dev'));
//  Faz parse do body em pedidos POST e PUT para poder-mos aceder como json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Trata cookies (?)
app.use(cookieParser());
// Server conteúdo estático (css, js, imgs)
app.use(express.static(path.join(__dirname, 'public')));

/*******************
*    ROUTERS        *
*******************/
app.use('/', routesF);
app.use('/backoffice', routesB);

/*******************
*       404         *
*******************/
// Apanha erros 404 que não deram match nas routes
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// Exporta app para bin/www
module.exports = app;

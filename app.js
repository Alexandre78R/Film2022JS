//Connexion à la bdd directement au démmarage du backend.
require('./models/db');

var createError = require('http-errors');
var express = require('express');
var expressfileupload = require("express-fileupload");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');
var session = require("express-session");

var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

var app = express();

app.use(expressfileupload());

// Relance serveur
const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

app.use(connectLiveReload());
// app.use(upload);
app.use(
  session({
      secret: 'a4f8071f-c873-4447-8ee2',
      resave: false,
      saveUninitialized: false,
  })
); 

// “secret” doit être une chaîne de caractères unique. Cette chaîne va servir à générer l’identifiant de session.

// “resave” force la session à s’enregistrer à chaque requête même s’il n’y a pas eu de modification de session.
// Il est recommandé de la mettre à false.

// “saveUninitialized” force la session à s’enregistrer même si elle n’a pas encore été utilisée.
// Il est recommandé de mettre cette option à false.

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/admin', adminRouter);

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

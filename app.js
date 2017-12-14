var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'shared')));

app.use(session({
    /*store: new RedisStore({
    	host: "127.0.0.1",
    	port: 6379
    }),*/
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 31536000000
    }
}));

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }
  req.session.views["/foo"] = (req.session.views["/foo"] || 0) + 1

  next()
})

var auth = function(req, res, next) {
  if (req.session && req.session.user === "amy" && req.session.admin)
    return next();
  else
    return res.sendStatus(401);
};
 
app.get('/login', function (req, res) {
  if (!req.query.username || !req.query.password) {
    res.send('login failed');    
  } else if(req.query.username === "amy" || req.query.password === "amyspassword") {
    req.session.user = "amy";
    req.session.admin = true;
    res.send("login success!");
  }
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.send("logout success!");
});
 
app.get('/content', auth, function (req, res) {
    res.send("You can only see this after you've logged in.");
});

app.get('/foo', function (req, res, next) {
 res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.send('error' + err);
});

module.exports = app;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var NetworkControll = require("./webServer/NetworkControll.js");

//var cors = require('cors');

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
    secret: "agsf-asdf-2r2d-SÄP#%ER-adsf",

    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 31536000000,
         secure: false,
         httpOnly: false
    }
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:9080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
 	res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

var networkControll = new NetworkControll(app);

module.exports = app;

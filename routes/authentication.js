var express = require('express');
var app = module.exports = express();
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var Account = require('../models/account');
var mongoose = require('mongoose');  
var bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

var routes = require('../routes');

router.get('/login', routes.login);

router.post('/login', passport.authenticate('local'), function(req, res) {
    
    res.redirect('/');
});


router.get('/register', routes.register);


router.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            
            res.send("Failed" + JSON.stringify(err.body));
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});


router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});


router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


router.post('/getUser', passport.authenticate('local'), function(req, res) {
    
    console.log("Getting current user");
    res.response(req.user);
});


app.use(router);
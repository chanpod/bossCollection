
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  routes = require('./routes'),
  api = require('./routes/api'),

  path = require('path');
  var socketapi = require('./routes/socket.js');
  var bossInfo = require('./routes/bossInfo.js');
  
  
var mongoose = require('mongoose');  
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var Account = require('./models/account');


var app = express();
var port = process.env.PORT || 4000;

var http = require('http').Server(app)
var io = require('socket.io')(http);

/**
 * Configuration
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.enable("jsonp callback");

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

mongoose.connect('mongodb://54.173.24.121:27017/passport_local_mongoose_express4');


/**
 * Routes
 */

var router = express.Router();


router.get('/', routes.index);
router.get('/mkdir', routes.index);
router.get('/strategyRoom', routes.index);
router.get('/progression', routes.index);
router.get('/recruitment', routes.index);
router.get('/login', routes.login);
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

router.get('/ping', function(req, res){
    
});


app.use('/', router);



/**
 * Start Server
 */

app.listen(port);
console.log("Listening on port 4000");

http.listen(4001, function(){
    console.log("Socket server listening on 4001")
});

io.on('connection', socketapi);


console.log('...');

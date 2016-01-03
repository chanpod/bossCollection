
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),  
  RESTserver = require('./routes/RestRoutes/REST.js'),
  path = require('path'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  mongoose = require('mongoose'),  
  cookieParser = require('cookie-parser'),
  socketapi = require('./routes/socket.js');
  
  
//var authentication = require('./routes/authentication.js');

  


var app = express();
var port = process.env.PORT || 4000;

var http = require('http').Server(app)
var io = require('socket.io')(http);

/**
 * Configuration
 */

__dirname = path.join(__dirname, '../');

console.log("========= Starting server ============")
console.log("App root directory: " + __dirname);

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'app/public')));
app.enable("jsonp callback");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var mongooseDB  = mongoose.connect("mongodb://localhost/bosscollection");

app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	proxy: true,
	resave: false,
	saveUninitialized: true,
	store: new MongoStore({ host: 'localhost', port: 27017, db: 'bosscollection'})
	})
);

/**
 * Routes
 */




var router = express.Router();
var routes = require('./routes/router.js')(app);




/**
 * Start Server
 */

app.listen(port);
console.log("Listening on port " + port);

http.listen(4001, function(){
    console.log("Socket server listening on 4001")
});

io.on('connection', socketapi);


console.log('...');

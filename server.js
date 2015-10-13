
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),

  routes = require('./routes'),  
  mongoApi = require('./routes/RestRoutes/REST.js')
  path = require('path');
  
var socketapi = require('./routes/socket.js');  

var authentication = require('./routes/authentication.js');
  
var mongoose = require('mongoose');  
var cookieParser = require('cookie-parser');

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

mongoose.connect('mongodb://54.173.24.121:27017/passport_local_mongoose_express4');


/**
 * Routes
 */

//app.use(authentication);

var router = express.Router();

router.get('/', routes.index);

app.use('/*', router);
app.use('/api', mongoApi)



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

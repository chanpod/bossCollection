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
  fs = require('fs'),
  tls = require('tls'),
  cookieParser = require('cookie-parser');
//socketapi = require('./routes/socket.js');


//var authentication = require('./routes/authentication.js');



var app = express();
var port = process.env.PORT || 4000;
var sslPort = process.env.SSLPORT || 4443;

//var io = require('socket.io')(http);

/**
 * Configuration
 */

__dirname = path.join(__dirname, '../');

console.log("========= Starting server ============")
console.log("App root directory: " + __dirname);

app.set('views', path.join(__dirname, 'client/dist'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'client/dist')));
app.enable("jsonp callback");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var mongooseDB = mongoose.connect("mongodb://gm:bc20@ds119598.mlab.com:19598/heroku_mx218mgg");

app.use(session({
  secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
  proxy: true,
  resave: false,
  saveUninitialized: true,
})
);

/**
 * Routes
 */


var router = express.Router();
var routes = require('./routes/router.js')(app);

var certPath = path.join(__dirname, 'server/certs/');

//function to pick out the key + certs dynamically based on the domain name
function getSecureContext(domain) {
  console.log("Getting cert for: " + `${certPath}${domain}`);
  return tls.createSecureContext({
    key: fs.readFileSync(`${certPath}${domain}/privkey.key`),
    cert: fs.readFileSync(`${certPath}${domain}/server.crt`),
    // ca: [fs.readFileSync('/path/to/CA_cert_1.crt'), fs.readFileSync('/path/to/CA_cert_2.crt'), 
  }).context;
}

//read them into memory
var secureContext = {
  'baseSite': getSecureContext('baseSite'),
  'localhost': getSecureContext('localhost'),
  'tbd': getSecureContext('tbd')
}


//provide a SNICallback when you create the options for the https server
var options = {
  SNICallback: function (domain, cb) {
    cb(null, secureContext[domain]);
  }, //SNICallback is passed the domain name, see NodeJS docs on TLS
  cert: fs.readFileSync(`${certPath}baseSite/server.crt`),
  key: fs.readFileSync(`${certPath}baseSite/privkey.key`),
};


// var privateKey = fs.readFileSync('privkey.key');
// var certificate = fs.readFileSync('server.crt');


//  var https = require('https').Server({
//   cert: fs.readFileSync(`${certPath}development/privkey.key`),
//   key: fs.readFileSync(`${certPath}development/server.key`),
//  }, app).listen(sslPort);


/**
 * Start Server
 */

var https = require('https').createServer(options, app).listen(sslPort);
var https = require('http').createServer(app).listen(port);

console.log("http Listening on port " + port);
console.log("https Listening on port " + sslPort);

console.log('...');


//http.listen(4001, function(){
//    console.log("Socket server listening on 4001")
//});

//io.on('connection', socketapi);

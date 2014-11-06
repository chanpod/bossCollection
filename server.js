
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),

  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');


var app = express();
var port = process.env.PORT || 4000;

/**
 * Configuration
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));


/**
 * Routes
 */

var router = express.Router();

router.get('/', routes.index);
router.get('/checkGuild', routes.checkGuild);



app.use('/', router);

var headers = {
  'Content-Type': 'application/json'
};

var options = {
  host: 'myServer.example.com',
  port: 80,
  path: '/user/TheReddest',
  method: 'POST',
  headers: headers
};

var req = http.request(options, function(res) {
  res.setEncoding('utf-8');

});

req.on('error', function(e) {
  // TODO: handle error.
});


req.end();

/**
 * Start Server
 */

app.listen(port);
console.log("Listening on port 4000");
console.log('...');

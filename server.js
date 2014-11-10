
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
app.enable("jsonp callback");

/**
 * Routes
 */

var router = express.Router();

router.get('/', routes.index);
router.get('/mkdir', routes.index);
router.get('/google2bb8b269f6a29fd2.jade', routes.index);

app.use('/', router);


/**
 * Start Server
 */

app.listen(port);
console.log("Listening on port 4000");
console.log('...');

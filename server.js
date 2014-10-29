
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
//app.use(bodyParser());



/**
 * Routes
 */

var router = express.Router();


router.get('/api/viewEvent', routes.viewEvent);
router.get('/api/viewEvent/:eventID', routes.viewEvent);
router.post('/api/createEvent', routes.createEvent);
router.put('/api/saveEvent/:eventID', routes.saveEvent);
router.get('/', routes.index);
router.get('/viewEvent', routes.index);
router.get('/viewEvent/:eventID', routes.index);
router.get('/createEvent', routes.index);



app.use('/', router);




/**
 * Start Server
 */

app.listen(port);
console.log("Listening on port 4000");
console.log('...');

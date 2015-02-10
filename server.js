
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  routes = require('./routes'),
  api = require('./routes/api'),

  path = require('path');




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

/**
 * Routes
 */

var router = express.Router();

router.get('/', routes.index);
router.get('/mkdir', routes.index);
router.get('/strategyRoom', routes.index);
router.get('/progression', routes.index);


app.use('/', router);



/**
 * Start Server
 */

app.listen(port);
console.log("Listening on port 4000");

http.listen(4001, function(){
    console.log("Socket listening on 4001");
})

io.on('connection', function(socket){
    var messages = []
    console.log('a user connected');

    socket.on("disconnect", function(){
        console.log("A user disconnected");
    })

    socket.on("newMessage", function(message){
        messages.push(message);
        console.log(messages);
        io.emit("messagesFromServer", messages);
    })
});



console.log('...');

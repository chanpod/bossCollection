var socketio = require('socket.io');
var io = {};

var mySocket;
var roomName;

module.exports = {

    startSocketServer: function (app) {

        io = socketio.listen(app);

        io.sockets.on('connection', bootstrapGuildSockets);
    },
    joinRoom: function(){
          
    }
}

function bootstrapGuildSockets(socket) {
    mySocket = socket;
    console.log("Starting socket");
    socket.on("init", function (data) {

        console.log(data);
        console.log("Someone connected");
    });

    socket.on("joinGuildRoom", function (data) {

        console.log("User joined room: " + data.guildName);
        roomName = data.guildName;
        socket.join(roomName);

        socket.to(roomName).emit("guildMessageBroadcast", { message: "Hello from server" });
    })

    socket.on("disconnect", function () {

        console.log("User disconnected");
    })
}
    
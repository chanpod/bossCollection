

// export function for listening to the socket
var messages = [];
var users = [];
module.exports = function (socket) {


    var userName = "";

    socket.on("init", function(username){
        var message = {
            userName: "System",
            message: "User " +username + " has connected."
        };
        userName = username;

        users.push(username);
        messages.push(message);

        console.log("User " +username + " has connected.");
        socket.broadcast.emit("messageFromServer", message);
        socket.emit("messagesFromServer", messages);
    });

    socket.on("disconnect", function(){

        console.log("User: " + userName + " has disconnected.");
        var message = {
            userName: "System",
            message: "User: " + userName + " has disconnected."
        };

        users.pop(username);
        messages.push(message);
        socket.broadcast.emit("messageFromServer", message)
        socket.emit("messagesFromServer", messages);
    });

    socket.on("newMessage", function(message){
        messages.push(message);
        console.log(messages);
        socket.broadcast.emit("messagesFromServer", messages);
        socket.emit("messagesFromServer", messages);
    })
};


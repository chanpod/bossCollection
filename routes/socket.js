

// export function for listening to the socket
var messages = [];
var users = [];

function binarySearch(key, inputArray) {

    var low  = 0,
        high = inputArray.length - 1,
        mid;

    while (low <= high) {
        mid = low + (high - low) / 2;
        if ((mid % 1) > 0) { mid = Math.ceil(mid); }

        if (key < inputArray[mid]) { high = mid - 1; }
        else if (key > inputArray[mid]) { low = mid + 1; }
        else { return mid; }
    }

    return null;
}

module.exports = function (socket) {


    var userName = "";

    socket.on("init", function(username, callback){
        var message = {
            userName: "System",
            message: "User " +username + " has connected."
        };
        userName = username;

        if(binarySearch(userName, users) == null){
            users.push(username);
        }


        messages.push(message);

        console.log("User " +username + " has connected.");
        socket.broadcast.emit("messageFromServer", messages);
        socket.broadcast.emit("userConn_Disc", users);

        //callback('error', messages, users);

    });

    socket.on("disconnect", function(){

        console.log("User: " + userName + " has disconnected.");
        var message = {
            userName: "System",
            message: "User: " + userName + " has disconnected."
        };


        messages.push(message);
        console.log(binarySearch(userName, users));
        socket.broadcast.emit("messageFromServer", message);
        socket.emit("messagesFromServer", messages);

        socket.broadcast.emit("userConn_Disc", users);
        socket.emit("userConn_Disc", users);
    });

    socket.on("newMessage", function(message){
        messages.push(message);
        console.log(messages);
        socket.broadcast.emit("messagesFromServer", messages);
        socket.emit("messagesFromServer", messages);
    })
};


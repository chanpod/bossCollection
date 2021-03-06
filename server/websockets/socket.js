"use strict";


// export function for listening to the socket
var messages = [];
var users = [];

function binarySearch(key, inputArray) {

    for(var i = 0; i < inputArray.length; i++){
        if(inputArray[i] == key){
            return i;
        }
    }

    return null;
}


function verifyYoutubeURL(url){

    return /(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/.test(url);
}

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

var roomName;

module.exports = function (socket) {
    
    console.log("It worked?");
    
    socket.on("init", function(data){
        
        console.log(data);
        console.log("Someone connected");
    });
    
    socket.on("joinGuildRoom", function(data){
        
        console.log("User joined room: " + data.guildName);
        roomName = data.guildName;
        socket.join(roomName);
        
        socket.to(roomName).emit("guildMessageBroadcast", {message: "Hello from server"});
    })
    
    socket.on("disconnect", function(){
        
        console.log("User disconnected");
    })
/*
    socket.on("init", function(username){
        var message = {
            userName: "System",
            message: "User " +username + " has connected."
        };
        userName = username;

        if(binarySearch(userName, users) == null){
            users.push(username);
            messages.push(message);

            console.log("User " +username + " has connected.");

            socket.broadcast.emit("userConn_Disc", users, messages);
            socket.emit("userConn_Disc", users, messages);
        }
        else{
            socket.emit("rejectUser", false);
        }
    });

    socket.on("disconnect", function(){

        console.log("User: " + userName + " has disconnected.");
        var message = {
            userName: "System",
            message: "User: " + userName + " has disconnected."
        };

        messages.push(message);
        console.log(users);
        var userToRemove = binarySearch(userName, users);
        console.log(userToRemove);
        if(userToRemove != null){
            users.remove(userToRemove);
        }

        socket.broadcast.emit("userConn_Disc", users, messages);
        socket.emit("userConn_Disc", users, messages);
    });

    socket.on("newMessage", function(message){
        messages.push(message);
        console.log(messages);
        socket.broadcast.emit("messagesFromServer", messages);
        socket.emit("messagesFromServer", messages);
    });


    socket.on("createChatroom", function(participants){
        socket.join(participants.user1 + "&" + participants.user2);
        socket.broadcast.emit("inviteUsersToChatroom", participants);
        console.log("Invitations sent");
    })

    socket.on("acceptInvitation", function(participants){
        socket.join(participants.user1 + "&" + participants.user2);
        console.log("User " + participants.user2 + " has joined the chat room");
    })

    socket.on("chatRoomMessage", function(message){
        messages.push(message);
        console.log(messages);
        socket.to(message.chatRoom).broadcast.emit("messagesFromServer", messages);
        socket.to(message.chatRoom).emit("messagesFromServer", messages);
    })
    
    */
};


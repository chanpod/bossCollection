"use strict";
var bossInfo = require('./bossInfo.js');
var mongo = require('./mongoFunctions.js');

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

module.exports = function (socket) {


    var userName = "";

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

    socket.on("getBossInfo", function(){
        console.log("BossInfo request made.");

        mongo.getRaidBossInfo().then(function(data){

            console.log(JSON.stringify(data));
            socket.emit("bossInfoData", data);
            return data;
        });
    });

    socket.on("saveStrats", function(newStrats){
        console.log("Saving New Boss Info");

        if(verifyYoutubeURL(newStrats.url)){
            mongo.saveRaidBossInfo(newStrats);
        }
        else{
            var errMsg = "Invalid URL. Please provide a youtube link.";
            socket.emit("saveFailed", errMsg);
        }


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
};


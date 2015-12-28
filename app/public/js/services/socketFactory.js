'use strict';



angular.module("BossCollection.services")
    .factory('socketProvider', [function () {
        
        var socket = io("http://bosscollection.net:4001");
        //var socket = io("http://localhost:4001");
         
        return socket;
    }])
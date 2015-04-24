'use strict';

/* Services */
var service = angular.module("BossCollection.services", ["ngResource"]);

var socket = io("http://localhost:4001");
//var socket = io("http://localhost:4001");

service.factory('charService', function($http, $q){

    }).factory('guildServices', function($http, $q){

        var guildApi = {
            checkGuild: function(achievements) {

            },

            getGuild: function(realm, guildName){
            }
        };

        return guildApi;
    }).factory('raidProgression', function(){

    var progressionApi = {

        getRaidsData: function() {

        }
    };

    return progressionApi;
}).factory('bossStrats', function(){

    var bossStratsApi = {

        getStrats: function() {

            console.log("Request Boss Info");
            socket.emit("getBossInfo");
        },
        saveStrats: function(updatedStrats){
            console.log("Saving info now");
            socket.emit("saveStrats", updatedStrats);
        }
    };

    return bossStratsApi;
}).factory("cookies", function($cookies, $cookieStore){
    var usernameKey = "username";

    var cookieService = {

        saveUserName: function(userName){

            $cookieStore.put(usernameKey, userName)
        },
        getUserName: function(){

            return $cookieStore.get(usernameKey);
        }
    };

    return cookieService
}).factory("socketProvider", function(){
    return socket;
});



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

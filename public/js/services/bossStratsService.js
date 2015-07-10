'use strict';

angular.module("BossCollection.services", [])
    .factory('bossStrats', ['socketProvider', function (socket) {
        
        
        
        var bossStratsApi = {

            getStrats: function () {

                console.log("Request Boss Info");
                socket.emit("getBossInfo");
            },
            saveStrats: function (updatedStrats) {
                console.log("Saving info now");
                socket.emit("saveStrats", updatedStrats);
            }
        };

        return bossStratsApi;
    }])
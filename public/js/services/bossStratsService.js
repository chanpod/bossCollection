'use strict';

angular.module("BossCollection.services", [])
    .factory('bossStrats', ['socketProvider', function (socket) {
        
        
        
        var bossStratsApi = {

            getStrats: function (boss) {

                console.log("Request Boss Info");
                socket.emit("getBossInfo", boss);
            },
            saveStrats: function (updatedStrats, url) {
                console.log("Saving info now");
                var parameters = {
                    raidData: updatedStrats,
                    url: url
                }
                parameters = angular.toJson(parameters);
                console.log(parameters); 
                socket.emit("saveStrats", parameters);
            }
        };

        return bossStratsApi;
    }])
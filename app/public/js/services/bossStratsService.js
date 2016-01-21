'use strict';

angular.module("BossCollection.services")
    .factory('bossStrats', ['socketProvider', '$resource', '$q', function (socket, $resource, $q) {
        
        var stratsAPI = $resource('/api/bossStrats', {},
            {
                update: {
                    method: 'PUT'
                }
            })
        
        
        var bossStratsApi = {

            getStrats: function (boss) {
                
                var defer = $q.defer();
                
                console.log("Request Boss Info");
                //socket.emit("getBossInfo", boss); 
                
                var data = {name: boss};
                
                stratsAPI.save(data).$promise.then(function(result){ 
                    console.log("Result: " );
                    console.log(result);
                    defer.resolve(result.result);
                })
                
                return defer.promise;
            },
            saveStrats: function (updatedStrats, url) {
                console.log("Saving info now");
                var parameters = {
                    raidData: updatedStrats,
                    url: url
                }
                parameters = angular.toJson(parameters);
                console.log(parameters); 
                //socket.emit("saveStrats", parameters);
                stratsAPI.data = parameters;
                
                stratsAPI.update(parameters, function(result){
                    console.log("Result: " + result);
                })
            }
        };

        return bossStratsApi;
    }])
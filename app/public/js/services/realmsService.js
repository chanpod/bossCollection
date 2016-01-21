angular.module("BossCollection.services")
    .factory('realmServices', ['$http','$q',function ($http, $q) {

        var getRealmsUrl = "https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d"
        var realms = [];
        
        function parseRealNames() {
            
            

        }
        
        parseRealNames();
        
        var realmApi = {             

            getRealms: function(){
                var defer = $q.defer();

                if (realms.length == 0) {

                    $http({ method: 'GET', url: getRealmsUrl }).success(function (returnedRealms) {

                        //realms = _.pluck(returnedRealms.realms, "name");
                        realms = returnedRealms.realms;
                        defer.resolve(realms);
                        realms = realms;
                        //realms
                    });

                }
                else {
                    defer.resolve(realms);
                }
                
                return defer.promise; 
            } 
        };

        return realmApi;
    }])
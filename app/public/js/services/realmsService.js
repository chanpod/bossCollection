angular.module("BossCollection.services")
    .factory('realmServices', [
        '$http','$q', 'siteServices',
        function ($http, $q, siteServices) {

        var getRealmsUrl = "https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d"
        var realms = [];
        
        
        var realmApi = {             
 
            getRealms: function(){
                var defer = $q.defer(); 

                if (realms.length == 0) {

                    $http({ method: 'GET', url: getRealmsUrl }).success(function (returnedRealms) {
                        
                        siteServices.hideLoadingModal();
                        
                        realms = returnedRealms.realms;
                        defer.resolve(realms);
                        realms = realms;
                        
                    });

                }
                else {
                    siteServices.hideLoadingModal();
                    defer.resolve(realms);
                }
                
                return defer.promise; 
            } 
        };

        return realmApi;
    }])
'use strict';



angular.module("BossCollection.services")
    .factory('guildServices', ['$http','$q', '$resource', function ($http, $q, $resource) {

        var getMembersUrl = "https://us.api.battle.net/wow/guild/Zul'jin/mkdir%20Bosscollection?fields=members,items&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d"
        var blizzardBaseUrl = "https://us.api.battle.net/wow/guild/";
        var blizzardEndingUrl = "?fields=members&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";
        
        
        
        var apply = $resource('/api/applicationSubmission', {}, {});
        var getApplicationsUrl = $resource('/api/getApplications', {}, {});
        
        var guildApi = {
            getApplications: function(){
                
                var defer = $q.defer();
                
              getApplicationsUrl.get().$promise
                .then(function(applications){
                    
                    defer.resolve(applications);
                },
                function(err){
                    
                    defer.reject(err);
                })  
                
                return defer.promise;
            },
            validateCharacterName: function(characterName, realm) {
                var defer = $q.defer();
                var getCharacterUrl = "https://us.api.battle.net/wow/character/" + realm + "/" + characterName + "?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";        
                
                var getCharacter = $resource(getCharacterUrl, {}, {});
                
                getCharacter.get().$promise.then(function(data){
                   
                   defer.resolve(data);
                },
                function(err){
                    
                    defer.reject("Character not found");
                });
                
                return defer.promise;
            },
            
            getGuild: function(realm, guildName){
                var defer = $q.defer()
                
                if(realm != "" && guildName != ""){
                    var getMembersUrl = blizzardBaseUrl + encodeURIComponent(realm) + "/" + encodeURIComponent(guildName) + blizzardEndingUrl;
                }
                
                $http({method: 'GET', url: getMembersUrl}).then(function(data){
                   
                   defer.resolve(data.members);
                });
                
                return defer.promise;
            },
            submitApplication: function(newApplicant){
                var defer = $q.defer();
                
                var getCharacterUrl = "https://us.api.battle.net/wow/character/" + newApplicant.realm.name + "/" + newApplicant.character.name + "?fields=talents&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";      
                
                var getCharacter = $resource(getCharacterUrl, {}, {});
                
                getCharacter.get().$promise
                    .then(function (characterWithSpec) {

                            return characterWithSpec;
                        },
                        function (err) {

                            defer.reject("Character not found");
                        })
                    .then(function (characterWithSpec) {
                        
                        newApplicant.character.specs = characterWithSpec.talents;
                        
                        apply.save({ "newApplicant": newApplicant }).$promise.then(function (submitted) {

                            defer.resolve(submitted);
                        },
                        function (err) {

                            defer.reject(err);
                        })

                    })
                return defer.promise;
            }
        };

        return guildApi;
    }])
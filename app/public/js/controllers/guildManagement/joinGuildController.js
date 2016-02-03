'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("joinGuildController", [
        "$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc', '$filter',
        function($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc, $filter){
          
            $scope.user = {};
            $scope.listOfGuilds = [];
            
            siteServices.updateTitle('Join Guild');
            
            $scope.init = function () {

                userLoginSrvc.getUser()
                    .then(function (user) {
                        $scope.user = user;
                    })                   
                    
                $scope.getGuilds();

            }
            
            $scope.filterSearch = function(filterSearch){
                
                return $filter('filter')($scope.listOfGuilds, filterSearch);
            }
            
            $scope.getGuilds = function(){
                
                guildServices.getListOfGuilds()
                    .then(function(guilds){
                        
                        $scope.listOfGuilds = guilds;
                    })
            } 
             
            $scope.joinGuild = function(){
                
                guildServices.joinGuild($scope.guildName.name, $scope.user.name)
                    .then(function(guild){
                        
                        siteServices.showMessageModal("Success! You will be able to access the guild services once you've been promoted to member.");
                        
                        $scope.user.guild = guild;
                        $location.path('/');        
                        
                        
                    })
                    .catch(function(err){
                        siteServices.showMessageModal(err);
                    })
            }
            
            $scope.init();
    }])

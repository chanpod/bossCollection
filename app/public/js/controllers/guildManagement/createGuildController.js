'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("createGuildController", [
        "$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc',
        function($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc){
          
            
            siteServices.updateTitle('Create Guild');
            
            $scope.guildName = "";
            $scope.loading = false;
            
            $scope.joinGuild = function(){
                $scope.loading = true;
                guildServices.createGuild($scope.guildName)
                    .then(function(){
                        
                        var user = userLoginSrvc.updateUser();
                        
                        siteServices.showMessageModal("Successfully created " + user.guild.name);
                        
                        $location.path('/');           
                    })
                    .catch(function(err){
                        siteServices.showMessageModal(err);
                    })
                    .finally(function(){
                        $scope.loading = false;
                    })
            }
    }])

'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("createGuildController", [
        "$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices',
        function($scope, $location, $http, $timeout, siteServices, guildServices){
          
            
            siteServices.updateTitle('Create Guild');
            
            $scope.guildName = "";
            
            $scope.joinGuild = function(){
                
                guildServices.createGuild($scope.guildName)
                    .then(function(response){
                        
                    })
                    .catch(function(err){
                        siteServices.showMessageModal(err);
                    })
            }
    }])

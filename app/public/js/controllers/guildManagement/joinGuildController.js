'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("joinGuildController", [
        "$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc',
        function($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc){
          
            $scope.user = {};
            
            siteServices.updateTitle('Join Guild');
            
            $scope.init = function () {

                userLoginSrvc.getUser()
                    .then(function (user) {
                        $scope.user = user;
                    })
                    .then(function () {
                        return guildServices.getGuildMembers($scope.user.guild.name);
                    })
                    .then(function (guildMembers) {
                        $scope.guildMembers = guildMembers
                    })

            }
            
            $scope.joinGuild = function(){
                
                guildServices.joinGuild($scope.guildName, $scope.user.name)
                    .then(function(result){
                        
                        siteServices.showMessageModal("Success! You will be able to access the guild services once you've been promoted to member.");
                        $location.path('/');
                    })
                    .catch(function(err){
                        siteServices.showMessageModal(err);
                    })
            }
            
            $scope.init();
    }])

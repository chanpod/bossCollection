'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.guild")
    .controller("guildSettingsController", [
        "$scope", '$rootScope', '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc', '$filter',
        function ($scope, $rootScope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc, $filter) {
            
            //user comes from parent controller navbar
            
            $scope.guildMembers;
            $scope.ranks = ['Applicant', 'Member', 'Officer', 'GM']

            $scope.init = function () {

                $scope.guildSettings();
            }

            $scope.addNewImage = function () {
                $scope.guild.images.push("");
            } 

            $scope.removeImage = function (index) {
                $scope.guild.images.splice(index, 1);
            }

            $scope.guildSettings = function(){
                
                guildServices.getGuildSettings()
                    .then(function (response) {
                        $scope.guild = response.guild
                    })
            } 
            
            $scope.updateGuildSettings = function () {

                guildServices.saveGuildSettings($scope.guild)
                    .then(function(result){
                        
                        $rootScope.$broadcast('loggedin');
                    })
            }
            
            $scope.init();
            siteServices.updateTitle('Manage Members');
        }])

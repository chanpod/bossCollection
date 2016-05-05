'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.guild")
    .controller("guildSettingsController", [
        "$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc', '$filter',
        function ($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc, $filter) {
            
            //user comes from parent controller navbar
            
            $scope.guildMembers;
            $scope.ranks = ['Applicant', 'Member', 'Officer', 'GM']

            $scope.init = function () {

                $scope.guildSettings();
            }
            
            $scope.guildSettings = function(){
                
                guildServices.getGuildSettings()
                    .then(function (response) {
                        $scope.guild = response.guild
                    })
            }
            
            $scope.promote = function (user) {

                if (user.rank == 3) {
                    siteServices.showMessageModal("Can't promote any further");
                }
                else {
                    user.rank++

                    guildServices.updateRank($scope.user.guild.name, user)
                        .then(function () {

                        })
                        .catch(function (err) {
                            siteServices.showMessageModal(err);
                        })
                }


            }

            $scope.demote = function (user) {
                if (user.rank == 1) {
                    siteServices.showMessageModal("Can't demote any further. They are effectively kicked at this rank.");
                }
                else {
                    user.rank--;

                    guildServices.updateRank($scope.user.guild.name, user)
                        .then(function () {

                        })
                        .catch(function (err) {
                            siteServices.showMessageModal(err);
                        })
                }
            }
            
            $scope.kick = function(user){
                
                var userName = user;
                var guildName = $scope.user.guild.name;
                
                guildServices.kickUser(userName, guildName)
                    .then(function(reponse) {
                        
                        $scope.getMembers();
                    })
                    .catch(function(err) {
                        
                        siteServices.showMessageModal(err);
                    })
                    .finally(function() {

                    })
            }
            
            $scope.init();
            siteServices.updateTitle('Manage Members');
        }])

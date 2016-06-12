'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.guild")
    .controller("manageMembersController", [
        "$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc', '$filter', 'permissionsService',
        function ($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc, $filter, permissionsService) {
            
            //user comes from parent controller navbar
            
            $scope.guildMembers;
            $scope.ranks = ['Applicant', 'Member', 'Officer', 'GM']

            $scope.init = function () {

                $scope.getMembers();
            }
            
            $scope.getMembers = function(){
                
                if($scope.user.name != ""){
                    
                    guildServices.getGuildMembers($scope.user.guild.name)
                        .then(function (guildMembers) {
                            $scope.guildMembers = guildMembers
                        })
                }
                else{
                    userLoginSrvc.getUser()
                        .then(function(user){
                            
                            guildServices.getGuildMembers(user.guild.name)
                                .then(function (guildMembers) {
                                    $scope.guildMembers = guildMembers
                                })
                        })
                }
            }
            
            $scope.promote = function (user) {

                if (permissionsService.isOfficer($scope.user, $scope.user.guild.members)) {
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

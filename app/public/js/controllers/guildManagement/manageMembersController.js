'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("manageMembersController", [
        "$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc',
        function ($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc) {
            
            //user comes from parent controller navbar
            $scope.user = {};
            $scope.guildMembers;
            $scope.ranks = ['Applicant', 'Member', 'Officer', 'GM']

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

            $scope.init();
            siteServices.updateTitle('Manage Members');
        }])

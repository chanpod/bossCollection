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
                $scope.getGuildSettings();
            }

            $scope.getGuildSettings = () => {

                guildServices.getGuildSettings()
                    .then((response) => {
                        $scope.guild = response.guild
                        $scope.ranks = $scope.guild.ranks;
                    })
                    .catch(function (err) {
                        siteServices.handleError(err);
                    })
                
            }

            $scope.getMembers = function () {

                if ($scope.user.name != "") {

                    guildServices.getGuildMembers($scope.user.guild.name)
                        .then(function (guildMembers) {
                            $scope.guildMembers = guildMembers
                        })
                }
                else {
                    userLoginSrvc.getUser()
                        .then(function (user) {

                            guildServices.getGuildMembers(user.guild.name)
                                .then(function (guildMembers) {
                                    $scope.guildMembers = guildMembers
                                })
                        })
                        .catch(function (err) {
                            siteServices.handleError(err);
                        })
                }
            }

            $scope.promote = function (user) {

                if (permissionsService.isOfficer($scope.user, $scope.user.guild.members)
                    && permissionsService.isOfficer(user, $scope.user.guild.members)
                    && !permissionsService.isGM($scope.user, $scope.user.guild.members)) {

                    siteServices.showMessageModal("Can't promote any further. Only the GM can do this.");
                }
                else {

                    user.rank--
                    user = updateUsersRank(user, $scope.ranks);

                    $scope.saveUser(user);
                }


            }

            $scope.showPromote = (rank) => {
                //(isGM() || (isOfficer() && rank.rank != 1)) && rank.rank != 0
                var shouldShowPromote = false;

                if ($scope.isGM() && rank.rank != 0) {
                    shouldShowPromote = true;
                }
                else if ($scope.isOfficer() && $scope.user.rank < rank.rank) {
                    shouldShowPromote = true;
                }

                return shouldShowPromote;
            }

            $scope.showDemote = (rank) => {
                //(isGM() || (isOfficer() && rank.rank != 1)) && rank.rank != 0
                var shouldShowDemote = false;

                if ($scope.isGM()) {
                    shouldShowDemote = true;
                }
                else if ($scope.isOfficer() && rank.officer != true) {
                    shouldShowDemote = true;
                }

                if (rank.rank == $scope.ranks.length - 1) {
                    shouldShowDemote = false;
                }

                return shouldShowDemote;
            }

            $scope.showKick = (rank) => {
                //(isGM() || (isOfficer() && rank.rank != 1)) && rank.rank != 0
                var shouldShowDemote = false;

                if ($scope.isGM()) {
                    shouldShowDemote = true;
                }
                else if ($scope.isOfficer() && rank.officer != true) {
                    shouldShowDemote = true;
                }                

                return shouldShowDemote;
            }

            $scope.demote = function (user) {

                if (user.rank == $scope.ranks.length) {
                    siteServices.showMessageModal("Can't demote any further. They are effectively kicked at this rank.");
                }
                else {

                    user.rank++;
                    user = updateUsersRank(user, $scope.ranks);

                    $scope.saveUser(user);
                }
            }

            function updateUsersRank(user, ranks) {

                let defaultRanks = {
                    officer: false,
                    raider: false,
                    GM: false,
                    approved: user.approved
                }

                _.extend(user, defaultRanks);

                let newRank = _.find(ranks, (rank) => {
                    return rank.rank == user.rank;
                })

                delete newRank.$$hashKey;
                delete newRank._id;

                _.extend(user, newRank);

                delete user.name;

                return user;
            }

            $scope.approve = function (user) {

                user.approved = true;
                $scope.saveUser(user);
            }

            $scope.disableUser = (user) => {
                user.approved = false;
                $scope.saveUser(user);
            }

            $scope.kick = (user) => {

                var userName = user;
                var guildName = $scope.user.guild.name;

                siteServices.confirmDelete()
                    .then(result => {

                        return guildServices.kickUser(userName, guildName)
                            .then(function (reponse) {

                                $scope.getMembers();
                            })                            
                    })
                    .catch(function (err) {
                        siteServices.handleError(err);
                    })
                    .finally(function () {

                    })
            }

            $scope.saveUser = (user) => {

                guildServices.updateRank($scope.user.guild.name, user)
                    .then(function () {

                    })
                    .catch(function (err) {
                        siteServices.handleError(err);
                    })
            }

            $scope.init();
            siteServices.updateTitle('Manage Members');
        }])

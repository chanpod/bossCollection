'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.guild")
    .controller("guildSettingsController", [
        "$scope", '$rootScope', '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc', '$filter', '$q',
        function ($scope, $rootScope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc, $filter, $q) {

            //user comes from parent controller navbar

            $scope.guildMembers;
            $scope.ranks = ['Applicant', 'Member', 'Officer', 'GM']
            $scope.changesMade = false;
            $scope.loading = false;

            var defaultRank = {
                name: "{name me}",
                raider: false,
                officer: false,
                rank: null
            }

            $scope.init = () => {

                siteServices.updateTitle('Guild Settings');
                $scope.guildSettings();
            }

            $scope.addNewImage = () => {
                $scope.guild.images.push("");
            }

            $scope.removeImage = (index) => {
                $scope.guild.images.splice(index, 1);
            }

            $scope.guildSettings = () => {

                guildServices.getGuildSettings()
                    .then((response) => {
                        $scope.guild = response.guild
                    })
            }

            $scope.changeDetected = () => {

                $scope.changesMade = true;
            }

            $scope.deleteRank = (rankIn) => {

                $scope.changeDetected();

                $scope.checkIfRankIsInUse(rankIn)
                    .then(isInUse => {

                        if (isInUse) {

                            siteServices.showMessageModal("Rank still being used by someone. Please remove all usage of the rank before deleting.")
                        }
                        else {

                            _.find($scope.guild.ranks, (rank, index) => {

                                if (rankIn.rank == rank.rank) {

                                    var ranksArray = $scope.guild.ranks
                                    ranksArray.splice(index, 1);
                                    $scope.guild.ranks = ranksArray;
                                }
                            })
                        }
                    })
            }

            $scope.checkIfRankIsInUse = (rankRemoved) => {

                var defer = $q.defer();

                guildServices.getGuildMembers($scope.guild.name)
                    .then(members => {

                        var membersRankRemoved = _.find(members, (member) => {
                            return member.rank == rankRemoved.rank
                        })
                        
                        if (membersRankRemoved != undefined) {

                            defer.resolve(true);
                        }
                        else {
                            defer.resolve(false);
                        }

                    })
                    .catch(err => {
                        siteServices.showMessageToast("Something went wrong. Try again in a few.");
                        defer.reject(err);
                    })


                return defer.promise;
            }

            $scope.updateGuildSettings = () => {

                $scope.loading = true;

                guildServices.saveGuildSettings($scope.guild)
                    .then((response) => {

                        $scope.loading = false;
                        $scope.changesMade = false;
                        $rootScope.$broadcast('loggedin');
                    })
                    .catch(err => {
                        $scope.loading = false;
                    })
            }

            $scope.addNewRank = () => {
                $scope.changesMade = true;
                var newRank = {
                    name: "{name me}",
                    raider: false,
                    officer: false,
                    rank: null
                }

                newRank.rank = $scope.guild.ranks.length
                $scope.guild.ranks.push(newRank);
            }

            $scope.promoteRank = (rankIn) => {
                $scope.changesMade = true;
                if (rankIn.rank != 0) {

                    var promotedRankindex = 0;
                    for (var i = 0; i < $scope.guild.ranks.length; i++) {

                        if (rankIn.rank == $scope.guild.ranks[i].rank) {
                            promotedRankindex = i;
                        }
                    }

                    var demotedRankindex = 0;
                    for (var i = 0; i < $scope.guild.ranks.length; i++) {

                        if ($scope.guild.ranks[i].rank == rankIn.rank - 1) {

                            demotedRankindex = i;
                        }
                    }

                    rankIn.rank = rankIn.rank - 1;
                    $scope.guild.ranks[promotedRankindex] = rankIn;

                    let tempRank = $scope.guild.ranks[demotedRankindex];
                    tempRank.rank = tempRank.rank + 1;
                    $scope.guild.ranks[demotedRankindex] = tempRank;
                }
            }

            $scope.demoteRank = (rankIn) => {
                $scope.changesMade = true;
                var promotedRankindex = 0;
                if (rankIn.rank != $scope.guild.ranks.length - 1) {

                    for (var i = 0; i < $scope.guild.ranks.length; i++) {

                        if (rankIn.rank == $scope.guild.ranks[i].rank) {
                            promotedRankindex = i;
                        }
                    }

                    var demotedRankindex = 0;
                    for (var i = 0; i < $scope.guild.ranks.length; i++) {

                        if ($scope.guild.ranks[i].rank == rankIn.rank + 1) {

                            demotedRankindex = i;
                        }
                    }

                    rankIn.rank = rankIn.rank + 1;
                    $scope.guild.ranks[promotedRankindex] = rankIn;

                    let tempRank = $scope.guild.ranks[demotedRankindex];
                    tempRank.rank = tempRank.rank - 1;
                    $scope.guild.ranks[demotedRankindex] = tempRank;

                }
            }

            $scope.init();

        }])

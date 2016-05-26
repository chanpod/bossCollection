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

            const defaultRank = {
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

            $scope.updateGuildSettings = () => {

                guildServices.saveGuildSettings($scope.guild)
                    .then((response) => {

                        $rootScope.$broadcast('loggedin');
                    })
            }

            $scope.addNewRank = () => {

                var newRank = defaultRank;

                newRank.rank = $scope.guild.ranks.length
                $scope.guild.ranks.push(newRank);
            }

            $scope.promoteRank = (rankIn) => { 

                if (rankIn.rank != 0) {
                    
                    _.find($scope.guild.ranks, (promotedRank, index) => {
                        
                        if (rankIn.rank == promotedRank.rank) {
                            promotedRank.rank++;
                            
                            _.find($scope.guild.ranks, (demotedRank, index) => {
                                
                                if (demotedRank.rank == promotedRank.rank) {
                                    demotedRank.rank--;
                                    return;
                                }
                            })      
                            return;
                        } 
                    })
                }
            }

            $scope.demoteRank = (rankIn) => {
                
                if (rankIn.rank != $scope.guild.ranks.length - 1) {

                    _.find($scope.guild.ranks, (demotedRank, index) => {

                        if (rankIn.rank == demotedRank.rank) {
                            demotedRank.rank--;
                            
                            _.find($scope.guild.ranks, (promotedRank, index) => {
                                
                                if (promotedRank.rank == demotedRank.rank) {
                                    promotedRank.rank++;
                                }
                            })

                            $scope.guild.ranks[index + 1].rank++;
                        }
                    })
                }
            }

            $scope.deleteRank = (rank) => {

                
            }

            $scope.init();

        }])

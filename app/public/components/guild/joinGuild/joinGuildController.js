'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.guild")
    .controller("joinGuildController", [
        "$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc', '$filter',
        function ($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc, $filter) {


            $scope.listOfGuilds = [];
            $scope.loading = false;


            siteServices.updateTitle('Join Guild');

            $scope.init = function () {



                $scope.getGuilds();

            }

            $scope.filterSearch = function (filterSearch) {

                return $filter('filter')($scope.listOfGuilds, filterSearch);
            }

            $scope.getGuilds = function () {

                guildServices.getListOfGuilds()
                    .then(function (guilds) {

                        $scope.listOfGuilds = guilds;
                    })
            }

            $scope.joinGuild = function () {

                $scope.loading = true;

                if ($scope.guildName) {

                    guildServices.joinGuild($scope.guildName.name, $scope.user.name)
                        .then(function (guild) {

                            siteServices.showMessageModal("Success! You will be able to access the guild services once you've been promoted to member.");
                            
                            userLoginSrvc.updateUser($scope.user);

                            $location.path('/');


                        })
                        .catch(function (err) {
                            siteServices.showMessageModal(err);
                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }
                else{
                    siteServices.showMessageToast("Guild doesn't exist");
                    $scope.loading = false;
                }
            }

            $scope.init();
        }])

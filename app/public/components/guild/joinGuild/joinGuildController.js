'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.guild")
    .controller("joinGuildController", [
        "$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc', '$filter', '$mdDialog',
        function ($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc, $filter, $mdDialog) {


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

            $scope.selectedItemChange = function (item) {
                console.log("Item changed: " + item);
            }

            $scope.joinGuild = function () {

                $scope.loading = true;

                if ($scope.guildName) {

                    guildServices.joinGuild($scope.guildName.name, $scope.user.name)
                        .then(function (guild) {


                            $scope.succesfullyJoinedGuild();
                            
                            


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

            $scope.succesfullyJoinedGuild = ()=> {

                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(false)
                        .title("Success!")
                        .textContent("You will be able to access the guild services once you've been approved.")
                        .ariaLabel('message popup')
                        .ok('Got it!')
                        .openFrom({
                            left: -50,
                            width: 30,
                            height: 80
                        })
                        .closeTo({
                            right: 1500
                        })
                ).then(function () {

                    $scope.isLoading = false;
                    userLoginSrvc.refreshUserFromServer();

                    $location.path('/');

                }, function () {
                    //console.l = 'Crap, it didn\'t work it seems. Refresh the page and see?';
                });
            }

            $scope.init();
        }])

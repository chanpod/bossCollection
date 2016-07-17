'use strict';
/**
 
 *

 */
angular.module("BossCollection.guild")
    .controller("applicationController", ["$scope", '$location', '$http', '$timeout', '$filter', 'realmServices', 'guildServices', 'userLoginSrvc', 'siteServices', '$mdDialog',
        function ($scope, $location, $http, $timeout, $filter, realmServices, guildServices, userLoginSrvc, siteServices, $mdDialog) {

            siteServices.updateTitle('Applications');


            $scope.application = {};


            $scope.validCharacterName = false;
            $scope.charRequirementsIncomplete = false;
            $scope.charRealmError = false;
            $scope.searchingForUser = false;
            $scope.icon = "error";


            $scope.init = function () {

                realmServices.getRealms()
                    .then(function (realms) {

                        $scope.realms = realms;
                    })
                    .then(function () {
                        return $scope.getGuilds()
                    })
                    .then(function () {
                        return $scope.loggedIn()
                    })
                    .catch(function (err) {

                        console.log(err);
                    })
                    .finally(function () {
                        $timeout(function () {
                            siteServices.hideLoadingModal();
                        }, 500)

                    })

            }

            $scope.getGuilds = function () {

                return guildServices.getListOfGuilds()
                    .then(function (guilds) {

                        $scope.listOfGuilds = guilds;
                    })
            }

            $scope.filterGuildsSearch = function (filterSearch) {
                return $filter('filter')($scope.listOfGuilds, filterSearch);                
            }

            $scope.filterSearch = function (filterSearch) {

                return $filter('filter')($scope.realms, filterSearch);
            }

            $scope.loggedIn = function () {

                userLoginSrvc.getUser().then(function (user) {

                    //Success, let them fill out the form.
                })
                    .catch(function (err) {

                        siteServices.showMessageModal("Please log in before attempting to apply.")
                        $location.path('/')
                    })
                    .finally(function () {

                    })
            }


            $scope.validateCharactername = function (callback) {

                if ($scope.application.realm) {
                    $scope.validCharacterName = false; //Immediately invalidate until response comes back
                    $scope.searchingForUser = true;

                    guildServices.validateCharacterName($scope.application.characterName, $scope.application.realm.name)
                        .then(function (character) {

                            $scope.validCharacterName = true;
                            $scope.icon = "check_circle";
                            $scope.application.character = character;
                            $scope.className = guildServices.getClassName(character.class);

                            return guildServices.getItemLevel($scope.application.characterName, $scope.application.realm.name);

                        },
                        function (err) {
                            $scope.icon = "error";
                            siteServices.showMessageToast(err);
                            $scope.validCharacterName = false; 
                        })
                        .then(function (result) {

                            $scope.application.itemLevel = result; 

                            return guildServices.getProgression($scope.application.characterName, $scope.application.realm.name);


                        })
                        .then(function (result) {

                            $scope.parseProgression(result); 

                            if (callback) {
                                callback();
                            }
                        })
                        .finally(function () {
                            $scope.searchingForUser = false;
                        })

                }
                else {
                    $scope.validCharacterName = false;
                    if (callback) {
                        callback();
                    }
                }
            }

            $scope.parseProgression = function (result) {

                $scope.raids = result.raids;

                $scope.hfc = _.find($scope.raids, function (raid) {

                    return raid.name == "Hellfire Citadel";
                })

                $scope.brf = _.find($scope.raids, function (raid) {

                    return raid.name == "Blackrock Foundry";
                })

                $scope.hm = _.find($scope.raids, function (raid) {

                    return raid.name == "Highmaul";
                })

                $scope.application.progression = {};

                $scope.application.progression.hfc = $scope.hfc;
                $scope.application.progression.brf = $scope.brf;
                $scope.application.progression.hm = $scope.hm;
            }

            $scope.submitApplication = function () {

                $scope.validateCharactername(function () {

                    if ($scope.validCharacterName == false) {

                        siteServices.showMessageToast("Sorry, we couldn't find your character. Please verify your Realm and Character are correct.");
                    }
                    else if ($scope.guildSelected == undefined) {

                        siteServices.showMessageToast("Did you selected a guild? If you don't see yours in the dropdown, they may not exist on this site.");
                    }
                    else if ($scope.application.desiredRole == undefined) {
                        siteServices.showMessageToast("Please select a role.");
                    }
                    else {
                        $scope.application.guildName = $scope.guildSelected.name;

                        $scope.isLoading = true;

                        guildServices.submitApplication($scope.application)
                            .then(function (result) {

                                $scope.showConfirm();

                            },
                            function (err) {
                                $scope.isLoading = false;
                                siteServices.showMessageToast(err);
                            })
                    }
                })
            }


            $scope.showConfirm = function () {
                // Appending dialog to document.body to cover sidenav in docs app
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(false)
                        .title("Application Successful!")
                        .textContent("You've successfully submitted your application to " + $scope.guildSelected.name + ". They will get in touch with you to review your application at their discretion. You will also receive an email with the registered email account with whether or not your application was accepted or rejected.")
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
                    $location.path('/myApplications');

                }, function () {
                    $scope.status = 'You decided to keep your debt.';
                });
            };


            $scope.init();


        }])

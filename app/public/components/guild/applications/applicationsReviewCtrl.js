'use strict';
/**
 
 *

 */
angular.module("BossCollection.guild")
    .controller("applicationsReviewController", ["$scope", '$location', '$http', '$timeout', 'guildServices', 'siteServices',
        function ($scope, $location, $http, $timeout, guildServices, siteServices) {

            siteServices.updateTitle('View Applications');



            var classes = ["placeholder", "warrior", "paladin", "hunter", "rogue", "priest", "death knight", "shaman", "mage", "warlock", "monk", "druid"]

            $scope.loading = true;
            $scope.numOfNewApplicants = 0;
            $scope.startDate = moment();
            $scope.startDate.month($scope.startDate.month() - 2);
            $scope.filterStatus = function (status) {

                return function (application) {
                    return application.status == status;
                }

                /**
                var filteredArray = _.filter($scope.applications, function(application){
                    return application.status == status;
                })
                
                return filteredArray;
                 */
            }

            $scope.approveApplicant = function (application) {

                guildServices.approveApplication(application)
                    .then(function () {
                        application.status = "Approved";
                    })
                    .catch(function (err) {

                    })
                    .finally(function () {

                    })
            }

            $scope.rejectApplicant = function (application) {

                guildServices.rejectApplication(application)
                    .then(function () {
                        application.status = "Rejected";
                    })
                    .catch(function (err) {

                    })
                    .finally(function () {

                    })
            }

            $scope.openComments = function (comments) {

                siteServices.showMessageModal(comments, "Comments");
            }

            $scope.openMenu = function ($mdOpenMenu, ev) {
                $mdOpenMenu(ev);
            }

            $scope.goTo = function (url) {

                var win = window.open(url, '_blank');
                win.focus();
            }
            //'http://us.battle.net/wow/en/character/{{application.realm.name}}/{{application.character.name}}/simple'

            $scope.buildArmoryUrl = function (realm, character) {
                var url = "http://us.battle.net/wow/en/character/" + realm + "/" + character + "/simple";

                $scope.goTo(url);
            }

            $scope.getApplications = function () {

                guildServices.getApplications($scope.startDate)
                    .then(function (applications) {
                        $scope.loading = false;
                        $scope.applications = applications.applications; //object to array

                        var newApplicants = _.find($scope.applications, function (applicant) {
                            return applicant.status == "Applied";
                        })

                        if (newApplicants != undefined) {
                            $scope.numOfNewApplicants = 1;
                        }


                        convertClasses();


                    },
                    function (err) {

                        $scope.loading = false;
                        console.log(err);
                        siteServices.showMessageToast("Seems something broke. Try again in a few... Make sure you're logged in and a part of a guild.");
                    })
            }


            function convertClasses() {

                for (var i = 0; i < $scope.applications.length; i++) {

                    var classType = classes[$scope.applications[i].character.class];
                    $scope.applications[i].character.class = classType.charAt(0).toUpperCase() + classType.slice(1);

                }
            }

            $scope.getNormalProgression = function (progression) {

                try {
                    var raidProgression = 0;
                    var raidLength = progression.bosses.length;
                    for (var i = 0; i < raidLength; i++) {

                        if (progression.bosses[i].normalKills > 0) {
                            raidProgression++;
                        }
                    }

                    return raidProgression + "/" + raidLength;
                }
                catch (err) {
                    return 0 + "/" + 0;
                }

            }

            $scope.getHeroicProgression = function (progression) {

                try {
                    var raidProgression = 0;
                    var raidLength = progression.bosses.length;
                    for (var i = 0; i < raidLength; i++) {

                        if (progression.bosses[i].heroicKills > 0) {
                            raidProgression++;
                        }
                    }

                    return raidProgression + "/" + raidLength;
                }
                catch (err) {
                    return 0 + "/" + 0;
                }

            }

            $scope.getMythicProgression = function (progression) {

                try {
                    var raidProgression = 0;
                    var raidLength = progression.bosses.length;
                    for (var i = 0; i < raidLength; i++) {

                        if (progression.bosses[i].mythicKills > 0) {
                            raidProgression++;
                        }
                    }

                    return raidProgression + "/" + raidLength;
                }
                catch (err) {
                    return 0 + "/" + 0;
                }

            }

            $scope.getApplications()

        }])

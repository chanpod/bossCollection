'use strict';
/**
 
 *

 */
angular.module("BossCollection.guild")
    .controller("myApplicationsCtrl", ["$scope", '$location', '$http', '$timeout', 'guildServices', 'siteServices', '$mdDialog',
        function ($scope, $location, $http, $timeout, guildServices, siteServices, $mdDialog) {

            siteServices.updateTitle('View Applications');



            var classes = ["placeholder", "warrior", "paladin", "hunter", "rogue", "priest", "death knight", "shaman", "mage", "warlock", "monk", "druid"]

            $scope.loading = true;
            $scope.numOfNewApplicants = 0;
            $scope.startDate = moment();
            $scope.startDate.month($scope.startDate.month() - 2); 
            $scope.startDate = $scope.startDate.toDate(); 
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
                        siteServices.handleError(err);
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
                        siteServices.handleError(err);
                    })
                    .finally(function () {

                    })
            }

            $scope.getClassName = function(application) { 
                return application.character.class.toLowerCase() 
            }

            $scope.openComments = function (application) {

      //          siteServices.showMessageModal(comments, "Comments");
                $mdDialog.show({
                    templateUrl: "appDetails",
                    controller: 'appDetailsController',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false,
                    locals: { data: application },
                    fullscreen: true
                })
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

            $scope.deleteApplication = (application) => {

                siteServices.confirmDelete()
                    .then(function (result) {
                        
                        guildServices.deleteApplication(application._id)
                            .then(function (user) {

                                $scope.getApplications();
                            })
                    })
                    .catch(function (err) {
                        siteServices.handleError(err);
                    })
            }

            $scope.getApplications = function () {

                guildServices.getUserApplications($scope.user.name, $scope.startDate)
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
                        siteServices.handleError("Seems something broke. Try again in a few... Make sure you're logged in and a part of a guild.");
                    })
            }


            function convertClasses() {

                for (var i = 0; i < $scope.applications.length; i++) {

                    var classType = classes[$scope.applications[i].character.class];
                    $scope.applications[i].character.class = classType.charAt(0).toUpperCase() + classType.slice(1);

                }
            }

            

            $scope.getApplications()

        }])

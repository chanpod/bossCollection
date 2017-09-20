'use strict';
/**
 *
 */
angular.module("BossCollection.attendance")
    .controller("absenceSubmissionsController", ["$scope", '$location', 'userLoginSrvc', 'absenceService', 'siteServices', '$filter', 'guildServices',
        function ($scope, $location, userLoginSrvc, absenceService, siteServices, $filter, guildServices) {

            var currentDay = moment().day();
            var self = this;

            self.showContentBool = false;
            self.newAbsence = {};
            self.absences = [];
            self.loading = false;
            self.typePicked = false;
            self.today = moment();
            self.dayDesired;
            self.currentlySelected = moment().format('dddd - Do');
            self.selectedMember = {};
            self.abscenceTypeOpen = false;
            self.selectedMode = 'md-fling';

            var ALLFUTUREABSENCES = "All Future Absences";
            var TODAY = "Today";
            var MYABSENCES = "My Abscences";
            var MEMBERSABSENCES


            /**
             * 0 = all future absences
             * 1 = specific date
             */
            self.viewing = 0;

            self.updateSelectedMember = (newMember) => {
                if (newMember != $scope.selectedMember && newMember != undefined) {

                    self.getUserAbsences(newMember.user);
                }
            }

            self.init = function () {

                self.getAbsences()

                self.currentlySelected = ALLFUTUREABSENCES;
                self.isToolSetOpen = false;
                self.getGuildUsers();

            }

            self.getGuildUsers = function () {

                self.loading = true;

                guildServices.getGuildMembers($scope.user.guild.name)
                    .then(function (users) {

                        self.users = users;
                    })
                    .catch(function (err) {

                        if (err == "You don't have sufficient priveleges.") {
                            console.log(err);
                        }
                        else {

                            siteServices.handleError(err);
                        }
                    })
                    .finally(function () {

                        self.loading = false;
                    })
            }

            self.filterSearch = function (filterSearch) {

                return $filter('filter')(self.users, filterSearch);
            }

            self.showContent = function () {
                self.showContentBool = true;
            }

            self.updateList = function () {
                self.viewing = 1;
                self.currentlySelected = moment(self.dayDesired).format('dddd - Do');

                self.getAbsencesByDate();
            }

            self.dateHasPassed = function (absence) {

                var difference = moment().diff(moment(absence.date))
                //console.log(difference);
                if (difference > 0) {
                    return false;
                }
                else {
                    return true;
                }
            }

            function calculateNumOfDaysUntil(dayDesired) {
                var numOfDaysInWeek = 7;

                var nextDate = dayDesired - currentDay;

                if (nextDate < 0) {

                    nextDate = numOfDaysInWeek - Math.abs(nextDate);
                }



                return nextDate;
            }

            self.formatDate = function (date) {

                return moment.utc(date).format('dddd, MMM D');
            }



            self.getAbsences = function () {

                self.currentlySelected = ALLFUTUREABSENCES;
                self.loading = true;
                self.viewing = 0;

                absenceService.getAbsences().then(function (result) {

                    self.loading = false;
                    self.absences = result.absences;
                    self.showContent();
                },
                    function (err) {

                        siteServices.handleError(err.data)

                        self.loading = false;
                        console.log(err);
                    })
            }

            self.deleteAbsence = function (absence) {

                siteServices.confirmDelete()
                    .then(function (result) {

                        return absenceService.deleteAbsence(absence);
                    })
                    .then(function (result) {
                        //siteServices.successfulUpdate();
                        if (self.viewing == 0) {
                            self.getAbsences();
                        }
                        else {
                            self.updateList();
                        }
                    })
                    .catch(function (err) {
                        siteServices.handleError(err);
                    })
                    .finally(function () {

                    })
            }

            self.editAbsence = function (absence) {

                absenceService.openEditModal('editAbsence', absence)
                    .then(function (result) {

                        if (self.viewing == 0) {
                            self.getAbsences();
                        }
                        else {
                            self.updateList();
                        }


                    })
                    .catch(function (err) {
                        siteServices.handleError(err);
                    })
            }

            self.getTodaysAbsences = function () {

                self.currentlySelected = TODAY;

                self.dayDesired = new Date();

                self.dayDesired.setSeconds(0);
                self.dayDesired.setHours(0);
                self.dayDesired.setMinutes(0);

                self.getAbsencesByDate();
            }

            self.getAbsencesByDate = function (dateIn) {

                self.loading = true;

                absenceService.getAbsencesByDate(self.dayDesired).then(function (result) {

                    self.loading = false;
                    self.absences = result.absences;
                },
                    function (err) {
                        siteServices.handleError(err)
                        self.loading = false;
                        console.log(err);
                    })
            }

            self.getUserAbsences = function (userName) {

                if (userName == $scope.user.name) {
                    self.currentlySelected = MYABSENCES;
                } else {
                    if (userName != undefined) {

                        self.currentlySelected = userName + "'s Absences";
                    }
                    else {
                        self.currentlySelected = "No one selected";
                    }
                }

                self.loading = true;
                absenceService.getUsersAbsences(userName)
                    .then(function (absences) {

                        self.loading = false;
                        self.absences = absences.absences;
                    },
                    function (err) {
                        self.loading = false;
                        siteServices.handleError(err);
                    })
            }

            self.init();
        }])

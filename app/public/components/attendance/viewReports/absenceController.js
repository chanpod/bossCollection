'use strict';
/**
 *
 */
angular.module("BossCollection.attendance")
    .controller("absenceSubmissionsController", ["$scope", '$location', 'userLoginSrvc', 'absenceService', 'siteServices', '$filter',
        function($scope, $location, userLoginSrvc, absenceService, siteServices, $filter) {

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
            self.selectedMember = undefined;

            var ALLFUTUREABSENCES = "All Future Absences";
            var TODAY = "Today";
            var MYABSENCES = "My Abscences";
            var MEMBERSABSENCES

            /**
             * 0 = all future absences
             * 1 = specific date
             */
            self.viewing = 0;

            $scope.$watch('selectedMember', function(newMember) {

                if (newMember) {                    
                    
                    self.getUserAbsences(newMember.user);
                }
            })
            
            self.init = function() {

                self.getAbsences()

                self.currentlySelected = ALLFUTUREABSENCES;
                self.isToolSetOpen = false;

            }

            self.showContent = function() {
                self.showContentBool = true;
            }

            self.updateList = function() {
                self.viewing = 1;
                self.currentlySelected = moment(self.dayDesired).format('dddd - Do');

                self.getAbsencesByDate();
            }

            self.dateHasPassed = function(absence) {

                var difference = moment().diff(moment(absence.date))
                console.log(difference);
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

            self.formatDate = function(date) {

                return moment.utc(date).format('dddd, MMM D');
            }



            self.getAbsences = function() {

                self.currentlySelected = ALLFUTUREABSENCES;
                self.loading = true;
                self.viewing = 0;

                absenceService.getAbsences().then(function(result) {

                    self.loading = false;
                    self.absences = result.absences;
                    self.showContent();
                },
                    function(err) {

                        siteServices.showMessageModal(err.message)

                        self.loading = false;
                        console.log(err);
                    })
            }

            self.deleteAbsence = function(absence) {

                siteServices.confirmDelete()
                    .then(function(result) {

                        return absenceService.deleteAbsence(absence);
                    })
                    .then(function(result) {

                        if (self.viewing == 0) {
                            self.getAbsences();
                        }
                        else {
                            self.updateList();
                        }
                    })
                    .finally(function() {

                    })
            }

            self.editAbsence = function(absence) {

                absenceService.openEditModal('editAbsence', absence)
                    .then(function(result) {

                        if (self.viewing == 0) {
                            self.getAbsences();
                        }
                        else {
                            self.updateList();
                        }


                    })
            }

            self.getTodaysAbsences = function() {
                
                self.currentlySelected = TODAY;
                
                self.dayDesired = new Date();

                self.dayDesired.setSeconds(0);
                self.dayDesired.setHours(0);
                self.dayDesired.setMinutes(0);

                self.getAbsencesByDate();
            }

            self.getAbsencesByDate = function(dateIn) {

                self.loading = true;



                absenceService.getAbsencesByDate(self.dayDesired).then(function(result) {

                    self.loading = false;
                    self.absences = result.absences;
                },
                    function(err) {
                        siteServices.showMessageToast(err)
                        self.loading = false;
                        console.log(err);
                    })
            }

            self.getUserAbsences = function(userName) {
                
                if(userName == $scope.user.name){
                    self.currentlySelected = MYABSENCES;    
                }else{
                    self.currentlySelected = userName + "'s Absences";    
                }
                
                self.loading = true;
                absenceService.getUsersAbsences(userName)
                    .then(function(absences) {
                        
                        self.loading = false;
                        self.absences = absences.absences;
                    },
                    function(err){
                        self.loading = false;
                    })
            }

            self.init();
        }])

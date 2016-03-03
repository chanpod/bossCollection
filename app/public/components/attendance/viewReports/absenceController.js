'use strict';
/**
 *
 */
angular.module("BossCollection.attendance")
    .controller("absenceSubmissionsController", ["$scope", '$location', 'userLoginSrvc', 'absenceService', 'siteServices', '$filter',
        function($scope, $location, userLoginSrvc, absenceService, siteServices, $filter){
        
        var currentDay = moment().day();
        var self = this;
        
        self.showContentBool = false;
        self.newAbsence = {};
        self.absences = {};
        self.loading = false;
        self.typePicked = false;
        self.today = moment(); 
        self.dayDesired;
        self.currentlySelected = moment().format('dddd - Do');
        
        var ALLFUTUREABSENCES = "All Future Absences";
        var TITLE = "Upcoming Absences";
        
        /**
         * 0 = all future absences
         * 1 = specific date
         */
         self.viewing = 0;
         
        
       self.init = function(){

           
           self.getAbsences()
           
           self.toolbar = {
               isOpen: false,
               direction: "right"
           }

           self.currentlySelected = ALLFUTUREABSENCES;
           self.isToolSetOpen = false;


           siteServices.updateTitle(TITLE);   
           
       }
       
       self.showContent = function(){
           self.showContentBool = true;
       }
        
       self.updateList = function(){
           self.viewing = 1;
           self.currentlySelected = moment(self.dayDesired).format('dddd - Do');
           
           self.getAbsencesByDate();
       }
       
       self.dateHasPassed = function(absence){
           
           if(moment(absence.date).isBefore(moment())){
               return false;
           }
           else{
               return true;
           }
       }
       
       function calculateNumOfDaysUntil(dayDesired){
           var numOfDaysInWeek = 7;
           
           var nextDate = dayDesired - currentDay;
           
           if(nextDate < 0){
               
                nextDate = numOfDaysInWeek - Math.abs(nextDate);    
           }
           
           
           
           return nextDate;
       }
       
       self.formatDate = function(date){
           
           return moment.utc(date).format('dddd, MMM D');
       }

        self.getAbsences = function(){
            
            self.currentlySelected = "All absences"
            self.loading = true;
            self.viewing = 0;
            
            absenceService.getAbsences().then(function(result){
                
                self.loading = false;                
                self.absences = result.absences;
                self.showContent(); 
            }, 
            function(err){
                
                siteServices.showMessageModal(err.message)
                 
                self.loading = false;
                console.log(err);  
            })
        }
        
        self.deleteAbsence = function(absence){
            
            siteServices.confirmDelete()
                .then(function(result){
                    
                    return absenceService.deleteAbsence(absence);
                })   
                .then(function(result){
                    
                    if(self.viewing == 0){
                        self.getAbsences();
                    }
                    else{
                        self.updateList();    
                    }
                })               
                .finally(function(){
                    
                })
        }
        
        self.editAbsence = function(absence){
            
            absenceService.openEditModal('editAbsence', absence)
                .then(function(result){
                    
                    if(self.viewing == 0){
                        self.getAbsences();
                    }
                    else{
                        self.updateList();    
                    }
                    
                    
                })
        }
        
        self.getAbsencesByDate = function(){
            
            self.loading = true;
            
            absenceService.getAbsencesByDate(self.dayDesired).then(function(result){
                
                self.loading = false;
                self.absences = result.absences; 
            }, 
            function(err){
                siteServices.showMessageToast(err) 
                self.loading = false;
                console.log(err);  
            })
        }
         
        self.submitNewAbsence = function () {

            if (self.newAbsence.date == null) {

                siteServices.showMessageModal("Must select a date")
            }
            else if(self.newAbsence.type == null){
                siteServices.showMessageModal("Must select a type: Late or Absent")
            }
            else {
                
                absenceService.submitNewAbsence(self.newAbsence).then(function (result) {
                
                    //TODO: Redirect to list of absences.
                    $location.path("/whosOut");
                },
                    function (err) {
                        Materialize.toast(err)
                        console.log(err);
                    })
            }


        }
        
        
        function filterOutOldDates(){
            
        }
        
        self.init();
    

    }])

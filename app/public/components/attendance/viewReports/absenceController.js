'use strict';
/**
 *
 */
angular.module("BossCollection.attendance")
    .controller("absenceSubmissionsController", ["$scope", '$location', 'userLoginSrvc', 'absenceService', 'siteServices', '$filter',
        function($scope, $location, userLoginSrvc, absenceService, siteServices, $filter){
        
        var currentDay = moment().day();
        
        $scope.newAbsence = {};
        $scope.absences = {};
        $scope.loading = false;
        $scope.typePicked = false;
        $scope.today = moment(); 
        $scope.dayDesired;
        $scope.currentlySelected = moment().format('dddd - Do');
        
        /**
         * 0 = all future absences
         * 1 = specific date
         */
        $scope.viewing = 0;
        
        $scope.toolbar = {
            isOpen: false,
            direction: "right"
        }
        
        $scope.currentlySelected = "Today";
        $scope.isToolSetOpen = false;
        
        
        siteServices.updateTitle('Upcoming Absences');    
        
       
        
       $scope.updateList = function(){
           $scope.viewing = 1;
           $scope.currentlySelected = moment($scope.dayDesired).format('dddd - Do');
           
           $scope.getAbsencesByDate();
       }
       
       $scope.dateHasPassed = function(absence){
           
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
       
       $scope.formatDate = function(date){
           
           return moment.utc(date).format('dddd, MMM D');
       }

        $scope.getAbsences = function(){
            
            $scope.currentlySelected = "All absences"
            $scope.loading = true;
            $scope.viewing = 0;
            
            absenceService.getAbsences().then(function(result){
                
                $scope.loading = false;
                $scope.absences = result.absences; 
            }, 
            function(err){
                siteServices.showMessageToast(err) 
                $scope.loading = false;
                console.log(err);  
            })
        }
        
        $scope.deleteAbsence = function(absence){
            
            siteServices.confirmDelete()
                .then(function(result){
                    
                    return absenceService.deleteAbsence(absence);
                })   
                .then(function(result){
                    
                    $scope.updateList();
                })               
                .finally(function(){
                    
                })
        }
        
        $scope.editAbsence = function(absence){
            
            absenceService.openEditModal('editAbsence', absence)
                .then(function(result){
                    
                    if($scope.viewing == 0){
                        $scope.getAbsences();
                    }
                    else{
                        $scope.updateList();    
                    }
                    
                    
                })
        }
        
        $scope.getAbsencesByDate = function(){
            
            $scope.loading = true;
            
            absenceService.getAbsencesByDate($scope.dayDesired).then(function(result){
                
                $scope.loading = false;
                $scope.absences = result.absences; 
            }, 
            function(err){
                siteServices.showMessageToast(err) 
                $scope.loading = false;
                console.log(err);  
            })
        }
         
        $scope.submitNewAbsence = function () {

            if ($scope.newAbsence.date == null) {

                siteServices.showMessageModal("Must select a date")
            }
            else if($scope.newAbsence.type == null){
                siteServices.showMessageModal("Must select a type: Late or Absent")
            }
            else {
                
                absenceService.submitNewAbsence($scope.newAbsence).then(function (result) {
                
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
    

    }])

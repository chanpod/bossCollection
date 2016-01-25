'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("absenceController", ["$scope", '$location', 'userLoginSrvc', 'absenceService', 'siteServices',
        function($scope, $location, userLoginSrvc, absenceService, siteServices){
        
        $scope.newAbsence = {};
        $scope.absences = {};
        $scope.loading = false;
        
        if($location.url() == "/auth/absence"){
            siteServices.updateTitle('Report Absence');    
        }
        else{
            siteServices.updateTitle('Upcoming Absences');    
        }
        
        
        
        $('.datepicker').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15 // Creates a dropdown of 15 years to control year
        });

        $scope.getAbsences = function(){
            $scope.loading = true;
            absenceService.getAbsences().then(function(result){
                
                $scope.loading = false;
                $scope.absences = result.absences; 
            }, 
            function(err){
                Materialize.toast(err) 
                $scope.loading = false;
                console.log(err);  
            })
        }
        
         
        $scope.submitNewAbsence = function(){
            
            var dateInput = $('.datepicker').pickadate()

            // Use the picker object directly.
            var picker = dateInput.pickadate('picker')
                 
            $scope.newAbsence.date = picker.get();
            
            absenceService.submitNewAbsence($scope.newAbsence).then(function(result){
                
                //TODO: Redirect to list of absences.
                 $location.path("/whosOut");
            },
            function(err){
                Materialize.toast(err) 
                console.log(err); 
            })
        }
        
        
        function filterOutOldDates(){
            
        }
    

    }])

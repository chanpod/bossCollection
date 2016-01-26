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
        $scope.typePicked = false;
        
        if($location.url() == "/auth/absence"){
            siteServices.updateTitle('Report Absence');    
        }
        else{
            siteServices.updateTitle('Upcoming Absences');    
        }
        
        
        
       

        $scope.getAbsences = function(){
            $scope.loading = true;
            
            
            
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

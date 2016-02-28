angular.module("BossCollection.attendance")
    .controller('absenceModalController', [
        '$scope', 'absenceService', '$mdDialog', 'data',
        function($scope, absenceService, $mdDialog, data){
        
        
        
        
        $scope.init = function () {

            if (data) {

                $scope.absence = data;
                $scope.absence.date = new Date($scope.absence.date);
            }
            else {
                $scope.absence = {};
            }
        }
        
        $scope.save = function(){
            
            absenceService.saveAbsence($scope.absence)
                .then(function(response){
                    
                    $scope.close(response);
                })
                .fail(function(err){
                    
                })
                .finally(function(){
                    
                })
        }
        
        $scope.cancel = function () {

            $mdDialog.cancel();
        }

        $scope.close = function () {
            $mdDialog.hide($scope.object);
        }
        
        $scope.init();
        
    }])
angular.module("BossCollection.attendance")
    .controller('absenceModalController', [
        '$scope', 'absenceService', '$mdDialog', 'data', 'siteServices',
        function($scope, absenceService, $mdDialog, data, siteServices){
        
        
        
        
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
                .catch(function (err) {
                    siteServices.handleError(err);
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
angular.module('BossCollection.attendance')
    .directive('viewAbsenceReport', [function(){
        
        return {
            restrict: 'E',
            controller: 'absenceSubmissionsController',
            templateUrl: 'absenceSubmissions'
        }
        
    }])
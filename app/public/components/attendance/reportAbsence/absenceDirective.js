angular.module('BossCollection.attendance')
    .directive('absenceReport', [function(){
        
        return {
            restrict: 'E',
            controller: 'absenceReportController',
            templateUrl: 'absence'
        }
        
    }])
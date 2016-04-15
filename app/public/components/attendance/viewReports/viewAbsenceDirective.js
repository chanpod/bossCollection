angular.module('BossCollection.attendance')
    .directive('viewAbsenceReport', [function(){
        
        return {
            restrict: 'E',
            controller: 'absenceSubmissionsController as absenceReportCtrl',
            templateUrl: 'absenceSubmissions'
        }
        
    }])
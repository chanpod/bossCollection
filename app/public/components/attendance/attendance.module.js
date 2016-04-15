'user strict'

angular.module("BossCollection.attendance", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/attendanceStatistics', {
                templateUrl: 'attendanceStats',
                controller: 'attendanceStatsCtrl as ctrl'
            })

            .when('/whosOut', {
                templateUrl: 'absenceSubmissions',
                controller: 'absenceSubmissionsController as absenceReportCtrl'
            })

            .when('/auth/absence', {
                templateUrl: 'absence',
                controller: 'absenceReportController as ctrl'
            })
 
    }]);
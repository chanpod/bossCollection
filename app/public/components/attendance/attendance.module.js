'user strict'

angular.module("BossCollection.attendnace", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/attendanceStatistics', {
                templateUrl: 'attendanceStats',
                controller: 'attendanceStatsCtrl'
            })

            .when('/whosOut', {
                templateUrl: 'absenceSubmissions',
                controller: 'absenceSubmissionsController'
            })

            .when('/auth/absence', {
                templateUrl: 'absence',
                controller: 'absenceReportController'
            })

    }]);
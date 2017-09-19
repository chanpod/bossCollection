var ModuleName = "BossCollection.attendance";

export default ModuleName;

var app = angular.module(ModuleName, ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/attendanceStatistics', {
                templateUrl: 'attendanceStats',
                controller: 'attendanceStatsCtrl as ctrl'
            })

            .when('/sheetsAttendance', {
                templateUrl: 'sheetsStats',
                controller: 'googleSheetsAttendance as ctrl'
            })
            
            .when('/sheetsAttendance', {
                templateUrl: 'sheetsStats',
                controller: 'googleSheetsAttendance as ctrl'
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

app.directive('mdTable', function () {
    return {
        restrict: 'E',
        scope: {
            headers: '=',
            content: '=',
            sortable: '=',
            filters: '=',
            customClass: '=customClass',
            thumbs: '=',
            count: '='
        },
        controller: function ($scope, $filter, $window) {
            var orderBy = $filter('orderBy');
            $scope.tablePage = 0;
            $scope.nbOfPages = function () {
                return Math.ceil($scope.content.length / $scope.count);
            },
                $scope.handleSort = function (field) {
                    if ($scope.sortable.indexOf(field) > -1) { return true; } else { return false; }
                };
            $scope.order = function (predicate, reverse) {
                $scope.content = orderBy($scope.content, predicate, reverse);
                $scope.predicate = predicate;
            };
            $scope.order($scope.sortable[0], false);
            $scope.getNumber = function (num) {
                return new Array(num);
            };
            $scope.goToPage = function (page) {
                $scope.tablePage = page;
            };
        },
        template: angular.element(document.querySelector('#md-table-template')).html()
    }
});

//UNCOMMENT BELOW TO BE ABLE TO RESIZE COLUMNS OF THE TABLE
/*
app.directive('mdColresize', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$evalAsync(function () {
        $timeout(function(){ $(element).colResizable({
          liveDrag: true,
          fixed: true
          
        });},100);
      });
    }
  }
});
*/

app.directive('showFocus', function ($timeout) {
    return function (scope, element, attrs) {
        scope.$watch(attrs.showFocus,
            function (newValue) {
                $timeout(function () {
                    newValue && element.focus();
                });
            }, true);
    };
});

app.filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        return input.slice(start);
    }
});
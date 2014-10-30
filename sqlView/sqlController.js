'use strict';

angular.module('myApp.sqlView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'sqlView/sqlPartial.html',
    controller: 'sqlController'
  });
}])

.controller('sqlController', ['$scope', '$http', '$templateCache', function($scope, $http, $templateCache) {
	
	$scope.currentTable = "initial";
	$scope.tableIndex = 0;

	$scope.columns = [];
	$scope.tableData = [];

	$scope.tables = {};

	$scope.queryTable = {};
	$scope.queryTableData = [];
	$scope.queryColumns = [];


$scope.getAbility = function(query) {
    var url = 'https://us.api.battle.net/wow/battlePet/ability/640?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d&jsonp=JSON_CALLBACK';
    $http.jsonp(url).success(function (data) {
        $scope.users = data;
    });

}

}]);
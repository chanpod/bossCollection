'use strict';

angular.module('myApp.sqlView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'sqlView/sqlPartial.html',
    controller: 'sqlController'
  });
}])

.controller('sqlController', ['$scope', '$http', function($scope, $http) {
	
	$scope.currentTable = "initial";
	$scope.tableIndex = 0;
	
	$scope.columns = [];
	$scope.tableData = [];
	
	$scope.tables = {};
	
	$scope.queryTable = {};
	$scope.queryTableData = [];
	$scope.queryColumns = [];


$scope.getAbility = function(query) {

    $http({
        url:'https://us.api.battle.net/wow/battlePet/ability/640?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d',
        method: "POST",
    }).success(function (data) {
        $scope.users = data;
    });

}
			
}]);
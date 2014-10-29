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


$scope.getQuery = function(query){
	$scope.getPHP();
	console.log($scope.tables);
}
	

	$scope.updateCurrentTable = function(tableName){
		$scope.currentTable = tableName;
		
		$scope.tables.tables.forEach(function(data, index){
			if(data.name === tableName){
				$scope.tableIndex = index;
			}
		});
		
		$scope.columns = $scope.tables.tables[$scope.tableIndex].columns;
		$scope.tableData = $scope.tables.tables[$scope.tableIndex].data;
		
		
	};
	
	$scope.getPHP = function(item, event) {
		var result = {};
               $scope.url = "/phpFiles/bas0017buildJSON.php";
			   $http.get($scope.url, {}).success(function(data, status){
					var myJSONstring
					
					
					$scope.tables = data;
					console.log($scope.tables);					
			   })
            }
			$scope.getPHP();
			
}]);
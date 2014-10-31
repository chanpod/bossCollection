'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/homePartial.html',
    controller: 'homeController'
  });
}])

.controller('homeController', ['$scope', '$http', '$templateCache', function($scope, $http) {
	var apiKey = "apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";
    var jsonP = "jsonp=JSON_CALLBACK";
    var blizzApiRoot = "https://us.api.battle.net/wow/";
    var charInfo = "character/Zul'Jin/Defragmentor";
    var staticResources = "http://us.battle.net/static-render/us/";

    $scope.classImg = "";


$scope.getAbility = function() {
    var url = blizzApiRoot + charInfo + '?locale=en_US&' + apiKey + '&' + jsonP;
    $http.jsonp(url).success(function (data) {
        console.log(data);
        $scope.classImg = staticResources + data.thumbnail;
    });

}

}]);
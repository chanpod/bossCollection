'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/homePartial.html',
    controller: 'homeController'
  });
}])

.controller('homeController', ['$scope', '$http', function($scope, $http) {
	var apiKey = "apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";
    var jsonP = "jsonp=JSON_CALLBACK";
    var blizzApiRoot = "https://us.api.battle.net/wow/";
    var charInfo = "character/" + $scope.realm + "/" + $scope.charName;
    var guildInfo = "";
    var staticResources = "http://us.battle.net/static-render/us/";

    $scope.classImg = "";
    $scope.guild = "";
    $scope.realm = "";
    $scope.charName = "";


$scope.getCharacter = function() {
    var url = blizzApiRoot + charInfo + '?locale=en_US&' + apiKey + '&' + jsonP;
    $http.jsonp(url).success(function (data) {
        console.log(data);
        $scope.classImg = staticResources + data.thumbnail;
    });

}

}]);
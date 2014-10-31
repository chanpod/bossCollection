'use strict';

angular.module('myApp.realmStatus', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/realmStatus', {
    templateUrl: 'realmStatus/realmPartial.html',
    controller: 'realmStatusController'
  });
}])

.controller('realmStatusController', [function() {

}]);
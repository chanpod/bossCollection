'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.realmStatus',
  'myApp.home'
]).
config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
        $routeProvider.otherwise({redirectTo: '/home'});
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
}]);

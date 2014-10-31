'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'myApp.realmStatus',
  'myApp.home'
]).
config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $locationProvider.html5Mode(true);
    }]);

'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.realmStatus',
  'myApp.home'
]).
config(['$routeProvider', '$httpProvider', '$locationProvider', function($routeProvider, $httpProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'home/homePartial.html',
                controller: 'homeController'
            })
            .when('/realmStatus', {
                templateUrl: 'realmStatus/realmPartial.html',
                controller: 'realmStatusController'
            })
            .otherwise({redirectTo: '/home'});
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }]);

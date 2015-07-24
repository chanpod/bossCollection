'use strict';



angular.module('BossCollection', [  
  'BossCollection.controllers',  
  'BossCollection.services',
  'BossCollection.directives',
  'ngRoute',
  'ui.bootstrap',
  'ngResource',
  'btford.socket-io',
  'ngCookies'

]).factory('mySocket', function(socketFactory){
    return socketFactory();
}).
config(function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider) {



    $routeProvider.
    when('/', {
      templateUrl: 'home',
      controller: 'homeController'
    }).
    when('/strategyRoom/:raid', {
        templateUrl: 'strategyRoom',
        controller: 'strategyRoomController',
    }).
    when('/roster', {
        templateUrl: 'roster',
        controller: 'rosterController'
    }).
    otherwise({
      redirectTo: '/'
    });

    $locationProvider.hashPrefix('!');

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**',
        'https://pagead2.googlesyndication.com'
    ]);

  $locationProvider.html5Mode(true);

});
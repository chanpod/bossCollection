'use strict';



angular.module('BossCollection', [
  'BossCollection.controllers',
  'Imn.filters',
  'BossCollection.services',
  'Imn.directives',
  'ngRoute',
  'ui.bootstrap',
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
    when('/mkdir', {
      templateUrl: 'mkdirHome',
      controller: 'mkdirController'
    }).
    when('/strategyRoom', {
        templateUrl: 'strategyRoom',
        controller: 'strategyRoomController'
    }).
    when('/progression', {
        templateUrl: 'progression',
        controller: 'progressionController'
    }).
    otherwise({
      redirectTo: '/'
    });

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**',
        'https://pagead2.googlesyndication.com'
    ]);

  $locationProvider.html5Mode(true);
});

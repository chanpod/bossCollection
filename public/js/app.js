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
    when('/strategyRoom/:chatRoom', {
        templateUrl: 'strategyRoom',
        controller: 'strategyRoomController'
    }).
    when('/strategyRoom', {
        templateUrl: 'strategyRoom',
        controller: 'strategyRoomController',
    }).
    when('/progression', {
        templateUrl: 'progression',
        controller: 'progressionController'
    }).
    when('/recruitment', {
        templateUrl: 'recruitment',
        controller: 'recruitmentController'
    }).
    when('/login', {
        templateUrl: 'login',
        controller: 'loginController'
    }).    
    when('/register', {
        templateUrl: 'register',
        controller: 'registerController'
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
'use strict';

// Declare app level module which depends on filters, and services

angular.module('BossCollection', [
  'BossCollection.controllers',
  'Imn.filters',
  'BossCollection.services',
  'Imn.directives',
  'ngRoute',
  'angular-svg-round-progress',
  'ui.bootstrap'
]).
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

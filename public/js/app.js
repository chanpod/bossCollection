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
config(function ($routeProvider, $locationProvider, $httpProvider) {



    $routeProvider.
    when('/', {
      templateUrl: 'home',
      controller: 'homeController'
    }).
    when('/createEvent', {
      templateUrl: 'createEvent',
      controller: 'createEventController'
    }).
      when('/viewEvent/:eventID', {
          templateUrl: 'viewEvent',
          controller: 'viewEventController'
      }).
      when('/viewEvent', {
          templateUrl: 'viewAllEvents',
          controller: 'viewAllEventsController'
      }).
      when('/gMaps', {
          templateUrl: 'gMaps',
          controller: 'gMapsController'
      }).
    otherwise({
      redirectTo: '/'
    });

    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $locationProvider.html5Mode(true);
});

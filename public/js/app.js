'use strict';

// Declare app level module which depends on filters, and services

angular.module('Imn', [
  'Imn.controllers',
  'Imn.filters',
  'Imn.services',
  'Imn.directives',
  'ngRoute',
  'ngAnimate',
  'mgcrea.ngStrap'
]).
config(function ($routeProvider, $locationProvider) {
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

  $locationProvider.html5Mode(true);
});

'use strict';



angular.module('BossCollection', [
  'BossCollection.controllers',
  'BossCollection.services',
  'BossCollection.directives',
  'ngRoute',
  //'ui.bootstrap',
  'ngResource',
  'btford.socket-io',
  'ngCookies'

]).factory('mySocket', ['socketFactory', function(socketFactory){
    return socketFactory();
}]).
config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider',
    function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider) {




    $routeProvider.
    when('/', {
      templateUrl: 'home',
      controller: 'homeController'
    })
    .when('/strategyRoom/:raid', {
        templateUrl: 'strategyRoom',
        controller: 'strategyRoomController',
    })
    .when('/roster', {
        templateUrl: 'roster',
        controller: 'rosterController'
    })
    .when('/auth/login', {
        templateUrl: 'login',
        controller: 'loginController'
    })
    .when('/auth/signup', {
        templateUrl: 'signup',
        controller: 'signupController'
    })
    .when('/forum', {
        templateUrl: 'forums',
        controller: 'forumsController'
    })
    .when('/auth/updateAccount', {
        templateUrl: 'editAccount',
        controller: 'editAccountController' 
    })
    .when('/auth/application', {
        templateUrl: 'application',
        controller: 'applicationController'
    })
    .when('/reviewApplications', {
        templateUrl: 'reviewApplications',
        controller: 'applicationsReviewController'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.hashPrefix('!');

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**',
        'https://pagead2.googlesyndication.com'
    ]);

  $locationProvider.html5Mode(true);

}]);
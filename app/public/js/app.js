'use strict';



angular.module('BossCollection', [ 
  'BossCollection.controllers',
  'BossCollection.services',
  'BossCollection.directives',
  'BossCollection.filters',
  'BossCollection.forums',
  'ngRoute',
  'ngResource',
  'btford.socket-io', 
  'ngCookies', 
  'ngMaterial'  
 
]).factory('mySocket', ['socketFactory', function(socketFactory){
    return socketFactory();
}]). 
config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', '$mdThemingProvider',
    function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider, $mdThemingProvider) {
 

    $mdThemingProvider.theme('default')
    .primaryPalette('deep-orange', {
        'default': 'A700'
    })
    .accentPalette('grey', {
        'default': '900'
    });

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
    .when('/auth/signup', {
        templateUrl: 'signup',
        controller: 'signupController'
    })
    .when('/auth/updateAccount', {
        templateUrl: 'editAccount',
        controller: 'editAccountController' 
    })
    .when('/auth/application', {
        templateUrl: 'application',
        controller: 'applicationController'
    }) 
    .when('/auth/absence', {
        templateUrl: 'absence',
        controller: 'absenceController'
    })
    .when('/reviewApplications', {
        templateUrl: 'reviewApplications',
        controller: 'applicationsReviewController'
    })
    .when('/createGuild', {
        templateUrl: 'createGuild',
        controller: 'createGuildController'
    })
    .when('/joinGuild', {
        templateUrl: 'joinGuild',
        controller: 'joinGuildController'
    })
    .when('/manageMembers', {
        templateUrl: 'manageMembers',
        controller: 'manageMembersController'
    })
    .when('/whosOut', {
        templateUrl: 'absenceSubmissions',
        controller: 'absenceController'
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

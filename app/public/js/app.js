'use strict';



angular.module('BossCollection', [ 
  'BossCollection.controllers',
  'BossCollection.services',
  'BossCollection.directives',
  'BossCollection.filters',
  'BossCollection.forums',
  'BossCollection.attendance',
  'BossCollection.guild',
  'BossCollection.home',
  'ngRoute',
  'ngResource',
  'btford.socket-io', 
  'ngCookies', 
  'ngMaterial',
  'ngAnimate'
 
])   
.config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', '$mdThemingProvider',
    function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider, $mdThemingProvider) {
 

    $mdThemingProvider.theme('default')
    .primaryPalette('deep-orange', {
        'default': 'A700'
    })
    .accentPalette('grey', {
        'default': '900'
    });

    $routeProvider.
    
    when('/strategyRoom/:raid', {
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
  
   
  
}])
.run([function(){
    // Check service workers are supported
    
}])
/*
.factory('mySocket', ['socketFactory', function(socketFactory){
    return socketFactory();
}]). 
*/ 
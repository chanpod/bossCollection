'use strict';



angular.module('BossCollection', [
    'BossCollection.controllers',
    'BossCollection.services',
    'BossCollection.directives',
    'BossCollection.accounts',
    'BossCollection.filters',
    'BossCollection.forums',
    'BossCollection.attendance',
    'BossCollection.guild',
    'BossCollection.home',
    'ngRoute',
    'ngResource',
    'ngCookies',
    'ngMaterial',
    'ngAnimate'

])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', '$mdThemingProvider',
        function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider, $mdThemingProvider) {

            var themeColor = "82cff6";
            var themeColorLight = "#4286f4";
            $mdThemingProvider.definePalette('legion', {
                '50': themeColor,
                '100': themeColor,
                '200': themeColor,
                '300': themeColor,
                '400': themeColor,
                '500': themeColorLight,
                '600': themeColor,
                '700': themeColor,
                '800': themeColor,
                '900': themeColor,
                'A100': themeColor,
                'A200': themeColor,
                'A400': themeColor,
                'A700': themeColor,
                'contrastDefaultColor': 'light',
            })

            $mdThemingProvider.theme('default')
                .primaryPalette('legion')
                .accentPalette('grey', {
                    'default': '900'
                });

            $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();

            /*
                $mdThemingProvider.theme('default')
                .primaryPalette('deep-orange', {
                    'default': 'A700'
                })
                .accentPalette('grey', {
                    'default': '900'
                });
            */
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
    .run([function () {
        // Check service workers are supported
        var ua = window.navigator.userAgent;
        var msie = ua.indexOf("MSIE ");

        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))  // If Internet Explorer, return version number
        {
            alert("IE is not supported. Please use a modern browser.")
        }
        else  // If another browser, return 0
        {

        }


    }])
/*
.factory('mySocket', ['socketFactory', function(socketFactory){
    return socketFactory();
}]). 
*/
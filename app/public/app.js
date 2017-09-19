import angular from 'angular';
import 'angular-route';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-cookies';
import 'angular-resource';
import 'angular-material';



//Vendor CSS
import 'angular-material/angular-material.min.css';

import BossCollectionControllers from './controllers/controllers.module';
import BossCollectionServices from './services/services.module';
import BossCollectionDirectives from './directives/directives.module';
import BossCollectionAccounts from './components/accounts/accounts.module';
import BossCollectionFilters from './filters/filters.module';
import BossCollectionAttendance from './components/attendance/attendance.module';
import BossCollectionGuild from './components/guild/guild.module';
import BossCollectionHome from './components/home/home.module';


angular.module('BossCollection', [
    BossCollectionControllers,
    BossCollectionServices,
    BossCollectionDirectives,
    BossCollectionAccounts,
    BossCollectionFilters,
    BossCollectionAttendance,
    BossCollectionGuild,
    BossCollectionHome,
    'ngRoute',
    'ngResource',
    'ngCookies',    
    'ngMaterial',
    'ngAnimate',

])
    .config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', '$mdThemingProvider',
        function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider, $mdThemingProvider) {

            var themeColor = "82cff6";
            var themeColorLight = "4286f4";
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
'use strict';
/* Directives */

angular.module('BossCollection.accounts').
  directive('logIn', [function () {
        return {
            restrict: 'E',
            templateUrl: 'login',
            controller: 'loginController',
 
            link: function(scope, elm, attrs) {
            }
        }  
  }]); 
 
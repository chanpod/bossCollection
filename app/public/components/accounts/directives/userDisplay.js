'use strict';
/* Directives */

angular.module('BossCollection.accounts').
  directive('userDisplay', [function () {
        return {
            restrict: 'E',
            templateUrl: 'userDisplayTemplate',
            controller: 'userDisplayController',
            scope: {
                user: '=user',
                fontsize: '=fontsize',
                hideicon: '=hideIcon'
            } 
        }  
  }]); 
 
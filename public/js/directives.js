'use strict';

/* Directives */

angular.module('Imn.directives', []).
  directive('bossstrategies', function () {
        return {
            restrict: 'E',
            templateUrl: 'bossStrategy',
            controller: 'bossStrategyController',

            link: function(scope, elm, attrs) {
            }
        }
  });

'use strict';

/* Directives */

angular.module('BossCollection.directives', []).
  directive('bossstrategies', function () {
        return {
            restrict: 'E',
            templateUrl: 'bossStrategy',
            controller: 'bossStrategyController',

            link: function(scope, elm, attrs) {
            }
        }
  });

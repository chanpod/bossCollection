
/* Directives */

angular.module('BossCollection.directives', []).
  directive('logIn', [function () {
        return {
            restrict: 'E',
            templateUrl: 'login',
            controller: 'loginController',
 
            link: function(scope, elm, attrs) {
            }
        } 
  }]); 
 
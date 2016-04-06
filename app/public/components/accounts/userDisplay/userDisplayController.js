'use strict';
/* Directives */

angular.module('BossCollection.accounts').
  controller('userDisplayController', ['$scope', 'userLoginSrvc', function ($scope, userLoginSrvc) {
        
        console.log($scope.user);
        
        userLoginSrvc.getAvatar($scope.user)
            .then(function(avatarUrl){
                $scope.avatarUrl = avatarUrl;
            })
        
        
  }]); 
 
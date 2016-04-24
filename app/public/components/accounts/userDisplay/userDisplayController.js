'use strict';
/* Directives */

angular.module('BossCollection.accounts').
    controller('userDisplayController', ['$scope', 'userLoginSrvc', function($scope, userLoginSrvc) {

        $scope.$watch('user', function(user) {

            if ($scope.avatarUrl == undefined) {
                getAvatarUrl();
            }

        })

        function getAvatarUrl() {

            userLoginSrvc.getAvatar($scope.user)
                .then(function(avatarUrl) {
                    $scope.avatarUrl = avatarUrl;
                    
                })
        }

    }]);

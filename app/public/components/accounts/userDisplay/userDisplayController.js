'use strict';
/* Directives */

angular.module('BossCollection.accounts').
    controller('userDisplayController', ['$rootScope', '$scope', 'userLoginSrvc', 'siteServices', function($rootScope, $scope, userLoginSrvc, siteServices) {

        $scope.$watch('user', function(user) {

            if ($scope.avatarUrl == undefined) {
                getAvatarUrl();
            }

        })

        $rootScope.$on("loggedin", function (event, user) {

            if (user.loggedIn == false) {
                $scope.avatarUrl = undefined;
            }
        })

        function getAvatarUrl() {

            userLoginSrvc.getAvatar($scope.user)
                .then(function(avatarUrl) {
                    $scope.avatarUrl = avatarUrl;

                })
                .catch(function (err) {
                    siteServices.showMessageModal(err);
                })
            
        }

    }]);

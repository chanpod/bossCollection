'use strict';
/**
 *
 */
angular.module("BossCollection.accounts")
    .controller("signupController", ["$scope", '$location', '$http', '$timeout', 'userLoginSrvc', 'siteServices',
        function ($scope, $location, $http, $timeout, userLoginSrvc, siteServices) {

            $scope.user = {};

            $scope.passwordsMatch = false;



            $scope.register = function () {

                userLoginSrvc.registerNewUser($scope.user).then(function (result) {
                    //save user to cookie

                },
                    function (err) {
                        $scope.passwordsMatch = true;                        
                        console.log(err);
                        siteServices.handleError(err);
                    })                    
            }

            $scope.openFromLeft = function (errorMessage) {

                siteServices.showMessageModal(errorMessage);
            };

        }])

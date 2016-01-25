'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("signupController", ["$scope", '$location', '$http', '$timeout', 'userLoginSrvc', '$mdDialog',
        function ($scope, $location, $http, $timeout, userLoginSrvc, $mdDialog) {

            $scope.user = {};

            $scope.passwordsMatch = false;

            $('#logInModal').closeModal();

            $scope.register = function () {

                userLoginSrvc.registerNewUser($scope.user).then(function (result) {
                    //save user to cookie
                    console.log(result);
                },
                    function (err) {
                        $scope.passwordsMatch = true;
                        $scope.openFromLeft(err);
                        console.log(err);
                    })

            }

            $scope.openFromLeft = function (errorMessage) {
                $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Error')
                        .textContent(errorMessage)
                        .ariaLabel('error popup')
                        .ok('Got it!')
                        .openFrom({
                            left: -50,
                            width: 30,
                            height: 80
                        })
                        .closeTo({
                            right: 1500
                        })
                    );
            };

        }])

'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("editAccountController", ["$scope", '$location', '$http', 'userLoginSrvc', 'siteServices', 'guildServices',
        function ($scope, $location, $http, userLoginSrvc, siteServices, guildServices) {

            siteServices.updateTitle('Account');

            $scope.leaveGuild = function () {

                var guildName = $scope.user.guild.name;

                siteServices.confirmDelete()
                    .then(function (result) {
                        guildServices.leaveGuild(guildName)
                            .then(function (user) {

                                $scope.user = userLoginSrvc.updateUser();
                            })
                    })
                
                 
            }

            $scope.updateAccount = function () {

                console.log("Updating account");
                userLoginSrvc.updateAccount($scope.user).then(function (response) {

                    $scope.user = userLoginSrvc.updateUser();
                    siteServices.showMessageToast("User updated");
                },
                    function (err) {

                        siteServices.showMessageModal(err);
                    })
            }
        }])

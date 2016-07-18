'use strict';
/**
 *
 */
angular.module("BossCollection.accounts")
    .controller("editAccountController", ["$scope", '$location', '$http', 'userLoginSrvc', 'siteServices', 'guildServices',
        function ($scope, $location, $http, userLoginSrvc, siteServices, guildServices) {

            siteServices.updateTitle('Account');

            $scope.leaveGuild = function () {

                var guildName = $scope.user.guild.name;

                siteServices.confirmDelete()
                    .then(function (result) {
                        guildServices.leaveGuild(guildName)
                            .then(function (user) {
                                siteServices.successfulUpdate();
                                $scope.user = userLoginSrvc.updateUser();
                            })
                    })
            }
            
            $scope.registerPush = function(){
                
                //pushNotificationsService.subscribe();
            }
            
            $scope.unregisterPush = function(){
                
                //pushNotificationsService.unsubscribe(); 
            }
                    
            $scope.sendPush = function(){
                
                //pushNotificationsService.sendPush();
            }
            $scope.updateAccount = function () {

                
                userLoginSrvc.updateAccount($scope.user).then(function (response) {

                    $scope.user = userLoginSrvc.updateUser();
                    siteServices.showMessageToast("User updated");
                },
                    function (err) {

                        siteServices.handleError(err);
                    })
            }
        }])

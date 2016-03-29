'use strict';
/**
 *
 */
angular.module("BossCollection.accounts")
    .controller("editAccountController", ["$scope", '$location', '$http', 'userLoginSrvc', 'siteServices', 'guildServices', 'pushNotificationsService',
        function ($scope, $location, $http, userLoginSrvc, siteServices, guildServices, pushNotificationsService) {

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
            
            $scope.registerPush = function(){
                
                pushNotificationsService.subscribe();
            }
            
            $scope.unregisterPush = function(){
                
                pushNotificationsService.unsubscribe(); 
            }
                    
            $scope.sendPush = function(){
                
                pushNotificationsService.sendPush();
            }
            $scope.updateAccount = function () {

                
                userLoginSrvc.updateAccount($scope.user).then(function (response) {

                    $scope.user = userLoginSrvc.updateUser();
                    siteServices.showMessageToast("User updated");
                },
                    function (err) {

                        siteServices.showMessageModal(err);
                    })
            }
        }])
'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("editAccountController", ["$scope", '$location', '$http', 'userLoginSrvc', 'siteServices', 'guildServices',
        function($scope, $location, $http, userLoginSrvc, siteServices, guildServices){
        
        siteServices.updateTitle('Account');
        
        $scope.leaveGuild = function(){
            
            var guildName = $scope.user.guild.name;
            
            guildServices.leaveGuild(guildName)
                .then(function(user){
                    
                    delete user.rank;
                    
                    userLoginSrvc.updateUser(user);
                    $scope.user = user;
                    
                    userLoginSrvc.currentlyLoggedIn()
                        .then(function(){
                            
                            
                            console.log("User updated");
                        })
                })
        }
        
        $scope.updateAccount = function () {
            
            console.log("Updating account");
            userLoginSrvc.updateAccount($scope.user).then(function (response) { 
                siteServices.showMessageToast("User updated");
            },
                function (err) {

                    $scope.openFromLeft(err);
                })
        }
        
        $scope.alreadyLoggedIn = function(){
            
            if(userLoginSrvc.loggedIn() != true){
                $location.path('/auth/login');
            }
        }
        
        $scope.openFromLeft = function (errorMessage) {
                
                siteServices.showMessageModal(errorMessage);
            };

    }])

'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("editAccountController", ["$scope", '$location', '$http', 'userLoginSrvc', 'siteServices',
        function($scope, $location, $http, userLoginSrvc, siteServices){
        
        siteServices.updateTitle('Account');
        
        userLoginSrvc.getUser().then(function(user){
             
            console.log("Got the user");
            
            $scope.user = user;
            
        })
        
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

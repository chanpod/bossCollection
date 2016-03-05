'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("loginController", ["$scope", '$location', '$http', 'userLoginSrvc', 'siteServices', '$mdBottomSheet', '$timeout',
        function($scope, $location, $http, userLoginSrvc, siteServices, $mdBottomSheet, $timeout){

        $scope.user = {};
        $scope.user.name = "";
        $scope.loading = false;
        
        if($location.url() == "/auth/login"){
            siteServices.updateTitle('Login');    
        }
        
        
        
        $scope.init = function () {
        }
        
        $scope.resetPassword = function(){
            
            $scope.loading = true;
             
            userLoginSrvc.lostPassword($scope.user.email)
                .then(function(response){
                    siteServices.showMessageModal("Email has been sent. Refer to your email for your temporary password.")
                })
                .catch(function(err){
                    siteServices.showMessageModal(err);
                })
                .finally(function(){
                    
                    $scope.loading = false;
                })
        }
        
        $scope.alreadyLoggedIn = function(){
             
            if(userLoginSrvc.loggedIn() == true){
                $location.path('/');
            }
        }
        
        $scope.openPasswordResetWindow = function($event){
            $mdBottomSheet.show({
                    templateUrl: 'resetPassword',
                    controller: 'loginController',
                    targetEvent: $event,
                    escapeToClose: false
                })
        }
        
        $scope.cancelPasswordReset = function(){ 
            
            $mdBottomSheet.hide();
            $timeout(function(){
                
                siteServices.showLoadingBottomSheet();    
            }, 500);
            
        }
        
        $scope.login = function(){
             
            
            userLoginSrvc.login($scope.user).then(function(response){
                
                //navigate to some page
                
                userLoginSrvc.getUser()
                    .then(function () {

                        if ($location.path() == "/auth/application") {

                        }
                        else {
                            $location.path("/");
                        }
                    })
                
            },
            function(err){
                
                siteServices.showMessageModal(err);
                console.log(err);
            })
        }
        
        $scope.cancelLogin = function () {
            
            siteServices.hideBottomSheet();
            $location.path("/");
        }
    }])

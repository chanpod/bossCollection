'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("loginController", ["$scope", '$location', '$http', 'userLoginSrvc', 'siteServices',
        function($scope, $location, $http, userLoginSrvc, siteServices){

        $scope.user = {};
        $scope.user.name = "";
        
        if($location.url() == "/auth/login"){
            siteServices.updateTitle('Login');    
        }
        
        console.log("Login Controller");
        
        $scope.user = userLoginSrvc.getUser()
            .then(function(user){
                
                if(typeof user.name != 'string'){
                    user.name = "";
                }
                
                return user;
            },
            function(err){
                return {};
            })
        
        
        
        $scope.alreadyLoggedIn = function(){
            
            if(userLoginSrvc.loggedIn() == true){
                $location.path('/');
            }
        }
        
        $scope.login = function(){
             
            
            userLoginSrvc.login($scope.user).then(function(response){
                
                //navigate to some page
                console.log(response);
                
                if($location.path() == "/auth/application"){
                    $('#logInModal').closeModal();    
                }
                else{
                    $location.path("/");
                }
                
            },
            function(err){
                
                Materialize.toast(err)
                console.log(err);
            })
        }
        
        $scope.cancelNavigation = function(){
            $('#logInModal').closeModal();    
            $location.path("/");
        }

    }])

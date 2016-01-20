'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("loginController", ["$scope", '$location', '$http', 'userLoginSrvc', 
        function($scope, $location, $http, userLoginSrvc){

        $scope.user = {};
        $scope.user = userLoginSrvc.getUser()
        
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

    }])

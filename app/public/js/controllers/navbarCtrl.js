'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("navbar", ["$scope", '$location', '$http', 'userLoginSrvc', '$rootScope',
        function($scope, $location, $http, userLoginSrvc, $rootScope){
            
        console.log("Working?");

        $scope.user = {};
        $scope.user.name = userLoginSrvc.getUser();
        $scope.loggedIn = false;
        
        
        
        $rootScope.$on("loggedin", function(event, user){
            
            console.log(user);
            
            if(user.name){
                $scope.user.name = user.name;
            }
            else{
                
                $scope.user.name = userLoginSrvc.getUser();    
            }
            
            $scope.loggedIn = user.loggedIn;
            
        })
        
        $scope.logout = function(){
            
            userLoginSrvc.logout().then(function(response){
                //navigate to some page
                
            },
            function(err){
                console.log(err);
            })
        }
        
        
        $scope.areWeLoggedIn = function(){
            
            userLoginSrvc.currentlyLoggedIn().then(function(response){
                
                console.log(response);
                $scope.loggedIn = response;
            })
        }
        
        $scope.areWeLoggedIn();

    }])

'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("loginController", ["$scope", '$location', '$http', 'userLoginSrvc', 
        function($scope, $location, $http, userLoginSrvc){
            
        console.log("Working?");

        $scope.user = {};
        
        $scope.login = function(){
            
            userLoginSrvc.login($scope.user).then(function(response){
                
                //navigate to some page
                console.log(response);
            },
            function(err){
                
                Materialize.toast(err)
                console.log(err);
            })
        }

    }])

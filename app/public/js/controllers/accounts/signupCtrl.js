'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("signupController", ["$scope", '$location', '$http', '$timeout', 'userLoginSrvc',
        function($scope, $location, $http, $timeout, userLoginSrvc){
        
        $scope.user = {};
        
        $('#logInModal').closeModal();    
        
        $scope.register = function(){
            
            userLoginSrvc.registerNewUser($scope.user).then(function(result){
                //save user to cookie
                console.log(result);
            },
            function(err){
                Materialize.toast(err)
                console.log(err);
            }) 
            
        }

    }])

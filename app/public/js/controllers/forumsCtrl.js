'use strict';
/**
 *
 */
angular.module("BossCollection.controllers", [])
    .controller("forumsController", ["$scope", '$location', '$http', 'userLoginSrvc', '$rootScope',
        function($scope, $location, $http, userLoginSrvc, $rootScope){
            
        $scope.user.name = userLoginSrvc.getUser();
        
        if($scope.user.name == undefined){
            $location.path('/');
        }
        

    }])

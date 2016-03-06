'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("homeController", ["$scope", '$location', '$http', '$timeout', 'siteServices', '$sce',
        function($scope, $location, $http, $timeout, siteServices, $sce){
          
            
            siteServices.updateTitle('Home');
            
            $scope.showContent();
    }])
 
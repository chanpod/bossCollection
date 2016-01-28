'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("manageMembersController", ["$scope", '$location', '$http', '$timeout', 'siteServices',
        function($scope, $location, $http, $timeout, siteServices){
          
            
            siteServices.updateTitle('Manage Members');
    }])

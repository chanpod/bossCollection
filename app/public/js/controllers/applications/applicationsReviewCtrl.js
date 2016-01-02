'use strict';
/**
 
 *

 */
angular.module("BossCollection.controllers")
    .controller("applicationsReviewController", ["$scope", '$location', '$http', '$timeout',
        function($scope, $location, $http, $timeout){
            
            try{
            (adsbygoogle = window.adsbygoogle || []).push({});
            }
            catch(err){
              //Don't care, keep going df
            }
            
            var getApplications = $resource('/getApplications', {}, {});     

    }])

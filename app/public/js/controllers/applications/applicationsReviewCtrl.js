'use strict';
/**
 
 *

 */
angular.module("BossCollection.controllers")
    .controller("applicationsReviewController", ["$scope", '$location', '$http', '$timeout', 'guildServices',
        function($scope, $location, $http, $timeout, guildServices){
            
            try{
            (adsbygoogle = window.adsbygoogle || []).push({});
            }
            catch(err){
              //Don't care, keep going df
            }
            
             var classes = ["placeholder","warrior", "paladin", "hunter", "rogue", "priest", "death knight", "shaman", "mage", "warlock","monk","druid"]
            
            $scope.loading = true;
            
            guildServices.getApplications()
                .then(function(applications){
                    $scope.loading = false;
                    $scope.applications = applications.applications; //object to array
                    console.log($scope.applications);
                    
                    convertClasses();
                },
                function(err){
                    
                    $scope.loading = false;
                    console.log(err);
                    Materialize.toast("Seems something broke. Try again in a few...");
                })
                
            function convertClasses(){
                
                for(var i = 0; i < $scope.applications.length; i++){
                    
                    $scope.applications[i].character.class = classes[$scope.applications[i].character.class];
                }
            }

    }])

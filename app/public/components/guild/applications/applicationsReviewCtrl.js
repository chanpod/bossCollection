'use strict';
/**
 
 *

 */
angular.module("BossCollection.guild")
    .controller("applicationsReviewController", ["$scope", '$location', '$http', '$timeout', 'guildServices', 'siteServices',
        function($scope, $location, $http, $timeout, guildServices, siteServices){
            
            siteServices.updateTitle('View Applications');    
            
          
            
             var classes = ["placeholder","warrior", "paladin", "hunter", "rogue", "priest", "death knight", "shaman", "mage", "warlock","monk","druid"]
            
            $scope.loading = true;
            
            $scope.openComments = function (comments) {
                
                siteServices.showMessageModal(comments, "Comments");
            } 
            
            $scope.goTo = function(url){
                
                var win = window.open(url, '_blank');
                win.focus();
            }
            //'http://us.battle.net/wow/en/character/{{application.realm.name}}/{{application.character.name}}/simple'
            
            $scope.buildArmoryUrl = function (realm, character) {
                var url = "http://us.battle.net/wow/en/character/" + realm + "/" + character + "/simple";
                
                $scope.goTo(url);
            }
            
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
                    siteServices.showMessageToast("Seems something broke. Try again in a few...");
                })
                
            function convertClasses(){
                
                for(var i = 0; i < $scope.applications.length; i++){
                    
                    var classType = classes[$scope.applications[i].character.class];
                    $scope.applications[i].character.class = classType.charAt(0).toUpperCase() + classType.slice(1);
                    
                }
            }

    }])

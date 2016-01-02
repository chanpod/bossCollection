'use strict';
/**
 
 *

 */
angular.module("BossCollection.controllers")
    .controller("applicationController", ["$scope", '$location', '$http', '$timeout', 'realmServices', 'guildServices',
        function($scope, $location, $http, $timeout, realmServices, guildServices){
            
            console.log("Loading application ctrl...");
            $scope.application = {};            
            try{
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
            catch(err){
              //Don't care, keep going 
            }
            
            $scope.validCharacterName = false;
            
            realmServices.getRealms()
                .then(function(realms){
                    
                    $scope.realms = realms;
                    
                    $timeout(function(){ //waiting for angular digest cycle so select updates properly

                        $('select').material_select();
                       
                    }, 100)
                    
                    
                });
            
            
            $scope.validateCharactername = function(){
                
                $scope.validCharacterName = false; //Immediately invalidate until response comes back
                
                guildServices.validateCharacterName($scope.application.characterName, $scope.application.realm.name)
                    .then(function(character){
                        
                        $scope.validCharacterName = true;
                        $scope.application.character = character;
                    },
                    function(err){
                        $scope.validCharacterName = false;
                        
                    })
                
            }
            
            
            $scope.submitApplication = function(){
                
                if($scope.validCharacterName == false){
                    
                    Materialize.toast("Sorry, we couldn't find your character. Please verify your Realm and Character are correct.");
                }
                else{
                    guildServices.submitApplication($scope.application)
                        .then(function(result){
                            
                            $location.path('/reviewApplications');
                        },
                        function(err){
                            
                            Materialize.toast(err);
                        })
                }
            }
            
    }])

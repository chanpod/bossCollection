'use strict';
/**
 
 *

 */
angular.module("BossCollection.controllers")
    .controller("applicationController", ["$scope", '$location', '$http', '$timeout', '$filter', 'realmServices', 'guildServices', 'userLoginSrvc', 'siteServices',
        function($scope, $location, $http, $timeout, $filter, realmServices, guildServices, userLoginSrvc, siteServices){
            
            siteServices.updateTitle('Applications');
            
            console.log("Loading application ctrl..."); 
            $scope.application = {};            
            try{
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
            catch(err){
              //Don't care, keep going 
            }
            
            $scope.validCharacterName = false;
            $scope.charRequirementsIncomplete = false;
            $scope.charRealmError = false;
            $scope.searchingForUser = false;
            
            realmServices.getRealms()
                .then(function(realms){
                    
                    $scope.realms = realms;
                     
                    $timeout(function(){ //waiting for angular digest cycle so select updates properly
 
                        $('select').material_select();
                       
                    }, 100) 
                })
                .catch(function (err) {
                    
                    
                    console.log(err);
                });
            
            $scope.filterSearch = function(filterSearch){
                
                return $filter('filter')($scope.realms, filterSearch);
            }
            
            $scope.areWeLoggedIn = function () {

                userLoginSrvc.currentlyLoggedIn().then(function (response) {
                    
                    
                    if(response == true){
                        //don't care, stay here
                    }
                    else{
                        
                        $('#logInModal').openModal({
                            dismissible: false, // Modal can be dismissed by clicking outside of the modal
                            opacity: .5, // Opacity of modal background
                            in_duration: 300, // Transition in duration
                            out_duration: 200, // Transition out duration
                            //ready: function () { alert('Ready'); }, // Callback for Modal open
                            complete: function () {  } // Callback for Modal close
                        });
                        
                    }
                })
            }
            

            $scope.validateCharactername = function (realm) {

                if ($scope.application.realm) {
                    $scope.validCharacterName = false; //Immediately invalidate until response comes back
                    $scope.searchingForUser = true;



                    guildServices.validateCharacterName($scope.application.characterName, $scope.application.realm.name)
                        .then(function (character) {


                            $scope.validCharacterName = true;
                            $scope.application.character = character;
                        },
                            function (err) {

                                $scope.validCharacterName = false;
                            })
                        .finally(function () {
                            $scope.searchingForUser = false;
                        })

                }

            }
            
            
            $scope.submitApplication = function(){
                
                if($scope.validCharacterName == false){
                    
                    siteServices.showMessageToast("Sorry, we couldn't find your character. Please verify your Realm and Character are correct.");
                }
                else{
                    guildServices.submitApplication($scope.application)
                        .then(function(result){
                            
                            $location.path('/reviewApplications');
                        },
                        function(err){
                            
                            siteServices.showMessageToast(err);
                        })
                }
            }
            
            $scope.areWeLoggedIn();
            
            
  
            
    }])

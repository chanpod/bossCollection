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
            
            
            $scope.validCharacterName = false;
            $scope.charRequirementsIncomplete = false;
            $scope.charRealmError = false;
            $scope.searchingForUser = false;
            
            
                
            $scope.init = function(){
                
                realmServices.getRealms()
                    .then(function (realms) {

                        $scope.realms = realms;
                    })
                    .then(function(){
                        return $scope.loggedIn()
                    })
                    .catch(function (err) {


                        console.log(err);
                    })
                    .finally(function () {
                        $timeout(function(){
                            siteServices.hideLoadingModal();    
                        }, 500)
                        
                    })  
                    
            }
            
            $scope.filterSearch = function(filterSearch){
                
                return $filter('filter')($scope.realms, filterSearch);
            }
            
            $scope.loggedIn = function () {
                
                userLoginSrvc.getUser().then(function (user) {
                    
                    //Success, let them fill out the form.
                })
                .catch(function(err){
                    
                    siteServices.showMessageModal("Please log in before attempting to apply.")
                    $location.path('/')   
                })
                .finally(function(){
                    
                })
            }
            

            $scope.validateCharactername = function (callback) {

                if ($scope.application.realm) {
                    $scope.validCharacterName = false; //Immediately invalidate until response comes back
                    $scope.searchingForUser = true;

                    guildServices.validateCharacterName($scope.application.characterName, $scope.application.realm.name)
                        .then(function (character) {

                            
                            $scope.validCharacterName = true;
                            $scope.application.character = character;
                            
                            if(callback){
                                callback();
                            }
                        },
                            function (err) {
                                
                                siteServices.showMessageToast(err);
                                $scope.validCharacterName = false;
                            })
                        .finally(function () {
                            $scope.searchingForUser = false;
                        })

                }
                else{
                    $scope.validCharacterName = false;
                    if (callback) {
                        callback();
                    }
                }
            }
            
            
            $scope.submitApplication = function(){
                
                $scope.validateCharactername(function () {
                        
                        if ($scope.validCharacterName == false) {

                            siteServices.showMessageToast("Sorry, we couldn't find your character. Please verify your Realm and Character are correct.");
                        }
                        else {
                            
                            guildServices.submitApplication($scope.application)
                                .then(function (result) {

                                    $location.path('/reviewApplications');
                                },
                                    function (err) {

                                        siteServices.showMessageToast(err);
                                    })
                        }
                    })
            }
            
            
            $scope.init();
  
            
    }])

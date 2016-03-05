'use strict';
/**
 
 *

 */
angular.module("BossCollection.guild")
    .controller("applicationController", ["$scope", '$location', '$http', '$timeout', '$filter', 'realmServices', 'guildServices', 'userLoginSrvc', 'siteServices',
        function($scope, $location, $http, $timeout, $filter, realmServices, guildServices, userLoginSrvc, siteServices){
            
            siteServices.updateTitle('Applications');
            
            
            $scope.application = {};            
            
            
            $scope.validCharacterName = false;
            $scope.charRequirementsIncomplete = false;
            $scope.charRealmError = false;
            $scope.searchingForUser = false;
            $scope.icon = "error";
            
                
            $scope.init = function(){
                
                realmServices.getRealms()
                    .then(function (realms) {

                        $scope.realms = realms;
                    })
                    .then(function(){
                        return $scope.getGuilds()
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
            
            $scope.getGuilds = function () {

                return guildServices.getListOfGuilds()
                    .then(function (guilds) {

                        $scope.listOfGuilds = guilds;
                    })
            }
            
            $scope.filterGuildsSearch = function(filterSearch){
                return $filter('filter')($scope.listOfGuilds, filterSearch);
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
                            $scope.icon = "check_circle";
                            $scope.application.character = character;
                            
                            if(callback){
                                callback();
                            }
                        },
                            function (err) {
                                $scope.icon = "error";
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
                        else if($scope.guildSelected != undefined) {
                            
                            $scope.application.guildName = $scope.guildSelected.name;
                            guildServices.submitApplication($scope.application)
                                .then(function (result) {
                                    
                                    if($scope.user.guild != undefined){
                                        $location.path('/reviewApplications');    
                                    }
                                    else{
                                        siteServices.showMessageModal("You've successfully submitted your application to " + $scope.guildSelected.name + ". They will get in touch with you to review your application at their discretion.");
                                        $location.path('/');
                                    }
                                    
                                },
                                    function (err) {

                                        siteServices.showMessageToast(err);
                                    })
                        }
                        else{
                            siteServices.showMessageToast("Did you selected a guild? If you don't see yours in the dropdown, they may not exist on this site.");
                        }
                    })
            }
            
            
            $scope.init();
  
            
    }])

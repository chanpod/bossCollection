'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("navbar", ["$scope", '$location', 'userLoginSrvc', '$rootScope', '$mdSidenav', 'siteServices', 'guildServices',
        function($scope, $location, userLoginSrvc, $rootScope, $mdSidenav, siteServices, guildServices){
        
        var originatorEv;
        var bossCollectionWowProgressUrl = "http://www.wowprogress.com/guild/us/zul-jin/mkdir+BossCollection/json_rank";
        $scope.user = {};
        $scope.user.name = "";
        $scope.loggedIn = false;
        $scope.title = "";
        $scope.reversed = false;
        
        //-ng-class = "!reversed ? 'slide' : 'slideReverse'"
        
        $scope.init = function(){
            
           getUser();
        } 
         
        $scope.showLoginBottomSheet = function($event){
            
            siteServices.showLoadingBottomSheet($event);
        }
        
        $scope.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
         
        $scope.goTo = function(path){ 
            
            $scope.closeSideBar('left');
            $location.url(path);
        }

        $scope.goBack = function () {
            window.history.back();
        }             

        $scope.goToBackwards = function(path){
            
            $scope.reversed = true;
            
            $scope.goTo(path);      
            
            $scope.reversed = false;
            
            
           
        }
        
        $scope.goToExternal = function (path) {
            window.open(
                path,
                '_blank' // <- This is what makes it open in a new window.
                );
        }
    
            
        $rootScope.$on('navbarTitle', function(event, newTitle){
            
            $scope.title = newTitle;
        })
        
        $rootScope.$on("loggedin", function(event, user){
            
            getUser();
        }) 
        
        $scope.logout = function(){
            
            userLoginSrvc.logout().then(function(response){
                //navigate to some page
                $scope.user = {};
            },
            function(err){
                console.log(err);
            })
        }
        
        
        $scope.areWeLoggedIn = function(){
            
            userLoginSrvc.getUser().then(function(user){
                
                $scope.loggedIn = true;
            })
            .catch(function(err){
                $scope.loggedIn = false;
            })
        }
        
        $scope.openSideBar = function(navID){
            $mdSidenav(navID)
                    .open();
        }
         
        $scope.closeSideBar = function(navID){
            $mdSidenav(navID)
                    .close();
        }
        
        $scope.toggle = buildToggler('left');
        
        function buildToggler(navID) {
            return function () {
                
                $mdSidenav(navID)
                    .toggle();
            } 
        }
        
        $scope.hasGuild = function(){
            if($scope.user.guild){
                return true
            }
            else{
                return false
            }
        }
        
        function getUser(){
            
            userLoginSrvc.getUser()
                .then(function (user) {                    
                    if (user) {
                        
                        $scope.user = user;
                        $scope.loggedIn = true;
                        
                        return guildServices.getGuildSettings();
                            
                        
                    }
                },
                function(err){
                    $scope.user = {};
                    $scope.loggedIn = false;
                })
                .then(function(guildSettings){
                    
                    if(guildSettings.guild){
                        $scope.user.guild = guildSettings.guild;
                    }
                })
        }
        
        $scope.init();
    }])

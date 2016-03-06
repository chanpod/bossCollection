'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("navbar", ["$scope", '$location', '$http', 'userLoginSrvc', '$rootScope', '$mdSidenav', 'siteServices', '$timeout',
        function($scope, $location, $http, userLoginSrvc, $rootScope, $mdSidenav, siteServices, $timeout){
        
        var originatorEv;
        var bossCollectionWowProgressUrl = "http://www.wowprogress.com/guild/us/zul-jin/mkdir+BossCollection/json_rank";
        $scope.user = {};
        $scope.user.name = "";
        $scope.loggedIn = false;
        $scope.title = "";
        $scope.showContentBool = false;
        
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
        
        $scope.hideContent = function(){
            $scope.showContentBool = false;
        }
        
        $scope.showContent = function () {
            
            $timeout(function () {

                $scope.showContentBool = true;
            }, 100)
        }  
         
        $scope.goTo = function(path){
            $scope.closeSideBar('left');
            $scope.hideContent();
            
            $timeout(function(){
                $location.url(path);
                
                $scope.showContent();
            }, 200)
            
            
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
        
        function getUser(){
            userLoginSrvc.getUser()
                .then(function(user){
                    if(user){
                        $scope.user = user;
                        $scope.loggedIn = true;
                        $scope.showContent();
                    }
                },
                function(err){
                    $scope.user = {};
                    $scope.loggedIn = false;
                })
        }
        
        $scope.init();
    }])

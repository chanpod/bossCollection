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
        $scope.reversed = true;
        
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
        
        $scope.goToBackwards = function(path){
            
            $scope.reversed = false;
            $('ngView').removeClass('slide');           
            $('ngView').addClass('slideReverse');
            
            $scope.goTo(path);      
            
            $scope.reversed = true;
            
            $('ngView').addClass('slide');
            $('ngView').removeClass('slideReverse');
           
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
                        
                    }
                },
                function(err){
                    $scope.user = {};
                    $scope.loggedIn = false;
                })
        }
        
        $scope.init();
    }])

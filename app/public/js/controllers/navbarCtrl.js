'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("navbar", ["$scope", '$location', '$http', 'userLoginSrvc', '$rootScope', '$mdSidenav', 'siteServices',
        function($scope, $location, $http, userLoginSrvc, $rootScope, $mdSidenav, siteServices){
        
        var originatorEv;
        var bossCollectionWowProgressUrl = "http://www.wowprogress.com/guild/us/zul-jin/mkdir+BossCollection/json_rank";
        $scope.user = {};
        $scope.user.name = "";
        $scope.loggedIn = false;
        $scope.guildRank = {};
        $scope.title = "";
        
        $scope.init = function(){
            
            $scope.areWeLoggedIn();
            
            userLoginSrvc.getUser()
                .then(function(user){
                    if(user){
                        $scope.user = user;
                    }
                },
                function(err){
                    $scope.user.name = "";
                })
        }
        
        $scope.showLoginBottomSheet = function($event){
            
            siteServices.showLoadingBottomSheet($event);
        }
        
        $scope.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
        
        $scope.goTo = function(path){
            $location.url(path);
            $scope.toggle();
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
            
            console.log(user);
            
            if(user.loggedIn === true){
                
                $scope.user = user;    
            }
            else{
                $scope.user = "";
            }
            
            
            
            $scope.loggedIn = user.loggedIn;
            
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
            
            userLoginSrvc.currentlyLoggedIn().then(function(response){
                
                console.log(response);
                $scope.loggedIn = response;
            })
        }
        
        $scope.toggle = buildToggler('left');
        
        function buildToggler(navID) {
            return function () {
                
                $mdSidenav(navID)
                    .toggle();
            }
        }
        
        
        
        
        $scope.init();
        

    }])

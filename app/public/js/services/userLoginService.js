'use strict';

angular.module("BossCollection.services")
    .factory('userLoginSrvc', ['$resource', '$q', '$location', '$cookies', '$rootScope',
    'siteServices', 
    function ($resource, $q, $location, $cookies, $rootScope, siteServices) {
        
        var registration = $resource('/auth/signup', {},
            {
                
            })
        
        var login = $resource('/auth/login', {}, {})
        var logout = $resource('/auth/logout', {}, {});
        var loggedIn = $resource('/auth/loggedin', {}, {});
        var updateAccount = $resource('/auth/updateAccount', {}, {});
        var getUser = $resource('/auth/currentUser', {}, {});
        var savedUser = null;
        
        
        var accountApi = {
            
            updateAccount: function(updatedUser){
                
                var defer = $q.defer();
                
                siteServices.startLoading();
                
                updateAccount.save(updatedUser).$promise
                    .then(function(response){
                    
                          
                        defer.resolve(response);
                    },
                    function(err){
                        
                        console.log(err);
                        defer.reject(err.data);
                    })
                    .finally(function(){
                        siteServices.loadingFinished();  
                    })
                
                return defer.promise;
            },
            updateUser: function(){
                
                savedUser = getUserFromCookie;
                
                if(savedUser.guild){
                    saveUsersRank(savedUser);
                }
                
                $rootScope.$broadcast("loggedin", { user: savedUser, loggedIn: true });
                
                return savedUser;
                
            },
            getUser: function(){
                
                var defer = $q.defer();
                
                var user = getUserFromCookie();
                if(user){
                    defer.resolve(user);    
                }
                else{
                    defer.reject("User doesn't exist");
                }
                
                
                return defer.promise;  
            },
            currentlyLoggedIn: function(){
                
                var defer = $q.defer();
                var loggedInBool = false;
                
                siteServices.startLoading();
                
                accountApi.getUser()
                    .then(function(user){                
                    
                        if(user.result != false){
                            
                            
                        }
                        else{
                            
                            loggedInBool = false;
                        }
                                                
                                         
                        defer.resolve(loggedInBool);
                        
                        //$cookies.set("name", response)
                    },
                    function(err){
                        
                        console.log(err);                        
                        defer.reject(err);
                    })
                    .finally(function(){
                        siteServices.loadingFinished();  
                    })
                
                return defer.promise; 
            },
            logout: function(){
                
                var defer = $q.defer();
               
                siteServices.startLoading();
                savedUser = null;
                
                logout.save({}).$promise.then(function(result){
                    
                    if(result.loggedOut == true){                        
                        
                        $rootScope.$broadcast("loggedin" , {loggedIn: false});
                    }
                    
                      
                    $location.path("/");
                    
                }, function(err){
                    
                    $rootScope.$broadcast("loggedin", {loggedIn: false});
                    $location.path("/");
                })
                .finally(function () {
                    siteServices.loadingFinished();
                })
                
                
                
                return defer.promise;
            },
            registerNewUser: function (newUser) {
                
                var defer = $q.defer();
                
                console.log("Register new user");
                //socket.emit("getBossInfo", boss); 
                
                siteServices.startLoading();
                
                registration.save(newUser).$promise
                .then(function (result) {

                    console.log("Registration successfull. Redirecting to login page");
                    console.log(result);

                    $location.path("/auth/login");
                }, function (err) {
                    console.log(err.data);


                    defer.reject(err.data);
                })
                .finally(function () {
                    siteServices.loadingFinished();
                })
                
                return defer.promise;
            },
            login: function (user) { 
                var defer = $q.defer(); 
                
                siteServices.startLoading();
                 
                login.save(user).$promise 
                    .then(function(result){
                        
                        savedUser = getUserFromCookie;
                        saveUsersRank(savedUser);

                        $rootScope.$broadcast("loggedin", { user: savedUser, loggedIn: true });
                        siteServices.hideLoadingBottomSheet();
                    },
                    function(err){
                        
                          
                        defer.reject(err.data);
                    })
                    .finally(function(){
                        
                        
                        siteServices.loadingFinished();
                    })                 
                
                return defer.promise;
            }
        };
        
        function getUserFromCookie() {
            
            var userCookie = $cookies.get("user");
            var user = undefined;
            
            if (userCookie) {
                var jsonString = userCookie.substring(userCookie.indexOf("{"), userCookie.lastIndexOf("}") + 1);
                user = JSON.parse(jsonString);
            }
            
            return user;
        }
        
        function saveUsersRank(user){
            var memberListing;
            if(savedUser && savedUser.guild){
                memberListing = _.find(savedUser.guild.members, {user: savedUser.name});
                savedUser.rank = memberListing.rank
                return memberListing.rank;
            }
            else{
                if (user.guild) {
                    memberListing = _.find(savedUser.guild.members, { user: savedUser.name });
                    return memberListing.rank;
                }
                else{
                    return 0;
                }
            }
        }

        return accountApi;
    }])
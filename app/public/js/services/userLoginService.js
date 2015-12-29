'use strict';

angular.module("BossCollection.services")
    .factory('userLoginSrvc', ['$resource', '$q', '$location', '$cookies', '$rootScope', function ($resource, $q, $location, $cookies, $rootScope) {
        
        var registration = $resource('/auth/signup', {},
            {
                
            })
        
        var login = $resource('/auth/login', {}, {})
        var logout = $resource('/auth/logout', {}, {});
        var loggedIn = $resource('/auth/loggedin', {}, {});
        
        var loginApi = {
            
            getUser: function(){
                
                return $cookies.get("name");  
            },
            currentlyLoggedIn: function(){
                
                var defer = $q.defer();
                var loggedInBool = false;
                
                loggedIn.save({}).$promise.then(function(response){                
                    
                    if(response.loggedIn == true){
                        $cookies.put("name", response.user.name);
                        loggedInBool = true;    
                        $rootScope.$broadcast("loggedin", {name: response.user.name, loggedIn: true});
                    }
                    else{
                        
                        loggedInBool = false;
                    }
                    
                    
                    console.log(response);
                    defer.resolve(loggedInBool);
                    
                    //$cookies.set("name", response)
                },
                function(err){
                    
                    console.log(err);
                    defer.reject(err);
                    
                })
                
                return defer.promise; 
            },
            logout: function(){
                
                var defer = $q.defer();
               
                
                logout.save({}).$promise.then(function(result){
                    
                    if(result.loggedOut == true){
                        
                        $cookies.remove("name");
                        $cookies.remove("password");
                        $rootScope.$broadcast("loggedin" , {loggedIn: false});
                    }
                    
                    $location.path("/");
                    
                }, function(){
                    
                    console.log("WTF, delete cookies anyways...");
                    
                    $cookies.remove("name");
                    $cookies.remove("password");
                    $rootScope.$broadcast("loggedin", {loggedIn: false});
                    
                    $location.path("/");
                })
                
                
                
                return defer.promise;
            },
            registerNewUser: function (newUser) {
                
                var defer = $q.defer();
                
                console.log("Register new user");
                //socket.emit("getBossInfo", boss); 
                
      
                
                registration.save(newUser).$promise.then(function(result){
                    
                    console.log("Registration successfull. Redirecting to login page");
                    console.log(result);
                    
                    $location.path("/auth/login");
                }, function(err){
                    console.log(err.data);
                    defer.reject(err.data);
                })
                
                return defer.promise;
            },
            login: function (user) {
                var defer = $q.defer();
                
                login.save(user).$promise.then(function(result){
                    
                    $cookies.put("name", user.name);
                    $rootScope.$broadcast("loggedin", {name: user.name, loggedIn:true});
                    $location.path("/");
                    
                },
                function(err){
                    
                    defer.reject(err.data);
                })
                
                return defer.promise;
            }
        };

        return loginApi;
    }])
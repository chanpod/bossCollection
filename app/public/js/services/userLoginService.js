'use strict';

angular.module("BossCollection.services")
    .factory('userLoginSrvc', ['$resource', '$q', function ($resource, $q) {
        
        var registration = $resource('/auth/signup', {},
            {
                
            })
        
        var login = $resource('/auth/login', {}, {})
        
        
        var loginApi = {

            registerNewUser: function (newUser) {
                
                var defer = $q.defer();
                
                console.log("Register new user");
                //socket.emit("getBossInfo", boss); 
                
      
                
                registration.save(newUser).$promise.then(function(result){
                    
                    console.log("Result: " );
                    console.log(result);
                    
                    defer.resolve(result.result);
                })
                
                return defer.promise;
            },
            login: function (user) {
                var defer = $q.defer();
                
                login.save(user).$promise.then(function(result){
                    
                    
                    
                })
                
                return defer.promise;
            }
        };

        return loginApi;
    }])
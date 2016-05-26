'use strict';

angular.module("BossCollection.accounts")
    .factory('userLoginSrvc', ['$resource', '$q', '$location', '$cookies', '$rootScope',
        'siteServices', 
        function ($resource, $q, $location, $cookies, $rootScope, siteServices) {
            var ACCOUNT_API_URL_BASE = "/api/account"
            var registration = $resource('/api/account/signup', {},
                {

                })

            var login = $resource(ACCOUNT_API_URL_BASE + '/login')
            var logout = $resource(ACCOUNT_API_URL_BASE +  '/logout');
            var loggedIn = $resource(ACCOUNT_API_URL_BASE + '/loggedin');
            var updateAccount = $resource(ACCOUNT_API_URL_BASE + '/updateAccount');
            var getUser = $resource(ACCOUNT_API_URL_BASE + '/currentUser');
            var getUserAvatar = $resource(ACCOUNT_API_URL_BASE + '/user/:userName/avatar');
            var lostPassword = $resource(ACCOUNT_API_URL_BASE + '/lost-password'); 
            var savedUser = null; 

            var accountApi = { 
                getAvatar: function (userName) {
                    
                    var defer = $q.defer();
                    
                    getUserAvatar.get({userName: userName}, function(response){
                        defer.resolve(response.avatarUrl);
                    })
                    
                    return defer.promise;
                },
                lostPassword: function(email){
                    
                    var defer = $q.defer();
                    
                  lostPassword.save({"email": email}).$promise
                    .then(function(response){
                        
                        defer.resolve(response);
                    }, function(err){
                        defer.reject(err.data.message);
                    })  
                    
                    return defer.promise;
                },
                updateAccount: function (updatedUser) {

                    var defer = $q.defer(); 

                    siteServices.startLoading();

                    updateAccount.save(updatedUser).$promise
                        .then(function (response) {


                            defer.resolve(response);
                        },
                            function (err) {

                                console.log(err);
                                defer.reject(err.data.message);
                            })
                        .finally(function () {
                            siteServices.loadingFinished();
                        })

                    return defer.promise;
                },
                updateUser: function () {

                    savedUser = getUserFromCookie();

                    if (savedUser && savedUser.guild) {
                        saveUsersRank(savedUser);
                    }

                    $rootScope.$broadcast("loggedin", { user: savedUser, loggedIn: true });

                    return savedUser;

                },
                getUser: function () {

                    var defer = $q.defer();

                    savedUser = getUserFromCookie();

                    if (savedUser) {

                        if (savedUser && savedUser.guild) {
                            saveUsersRank(savedUser);
                        }

                        defer.resolve(savedUser);
                    }
                    else {
                        defer.reject("User doesn't exist");
                    }


                    return defer.promise;
                },
                ifLoggedIn: function(){
                    
                    var defer = $q.defer();
                    
                    this.getUser()
                        .then(function(){
                            
                            if (savedUser) {
                                defer.resolve(true);
                            }
                            else {
                                defer.resolve(false);
                            }
                        })
                        .fail(function(err){
                            defer.reject(err);
                        })
                    
                    return defer.promise;
                },
                refreshUserFromServer: function () {

                    var defer = $q.defer();

                    siteServices.startLoading();

                    getUser.get().$promise
                        .then(function (user) {

                            accountApi.updateUser();
                            defer.resolve();
                        },
                            function (err) {

                                console.log(err);
                                defer.reject(err);
                            })
                        .finally(function () {
                            siteServices.loadingFinished();
                        })

                    return defer.promise;
                },
                logout: function () {

                    var defer = $q.defer();

                    siteServices.startLoading();
                    savedUser = null;

                    logout.save({}).$promise.then(function (result) {

                        if (result.loggedOut == true) {

                            $rootScope.$broadcast("loggedin", { loggedIn: false });
                        }


                        $location.path("/");

                    }, function (err) {

                        $rootScope.$broadcast("loggedin", { loggedIn: false });
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

                            savedUser = getUserFromCookie();
                            saveUsersRank(savedUser);
                            
                            accountApi.updateUser();
                            
                            $location.path("/");
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
                        .then(function (loggedInUser) {

                            savedUser = loggedInUser;
                            saveUsersRank(loggedInUser);

                            $rootScope.$broadcast("loggedin", { user: savedUser, loggedIn: true });
                            siteServices.hideLoadingBottomSheet();
                        },
                            function (err) {


                                defer.reject(err.data.message);
                            })
                        .finally(function () {


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

            function saveUsersRank(user) {
                var memberListing;
                if (savedUser && savedUser.guild) {
                    memberListing = _.find(savedUser.guild.members, { user: savedUser.name });
                    savedUser.rank = memberListing.rank
                    return memberListing.rank;
                }
                else {
                    if (user && user.guild) {
                        memberListing = _.find(savedUser.guild.members, { user: savedUser.name });
                        return memberListing.rank;
                    }
                    else {
                        return 0;
                    }
                }
            }

            accountApi.refreshUserFromServer();

            return accountApi;
        }])
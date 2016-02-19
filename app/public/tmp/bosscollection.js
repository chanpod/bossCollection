'use strict';



angular.module('BossCollection', [ 
  'BossCollection.controllers',
  'BossCollection.services',
  'BossCollection.directives',
  'BossCollection.filters',
  'BossCollection.forums',
  'ngRoute',
  'ngResource',
  'btford.socket-io', 
  'ngCookies', 
  'ngMaterial'  
 
]).factory('mySocket', ['socketFactory', function(socketFactory){
    return socketFactory();
}]). 
config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', '$mdThemingProvider',
    function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider, $mdThemingProvider) {
 

    $mdThemingProvider.theme('default')
    .primaryPalette('deep-orange', {
        'default': 'A700'
    })
    .accentPalette('grey', {
        'default': '900'
    });

    $routeProvider.
    when('/', {
      templateUrl: 'home',
      controller: 'homeController'
    })
    .when('/strategyRoom/:raid', {
        templateUrl: 'strategyRoom',
        controller: 'strategyRoomController',
    })
    .when('/roster', {
        templateUrl: 'roster',
        controller: 'rosterController'
    })    
    .when('/auth/signup', {
        templateUrl: 'signup',
        controller: 'signupController'
    })
    .when('/auth/updateAccount', {
        templateUrl: 'editAccount',
        controller: 'editAccountController' 
    })
    .when('/auth/application', {
        templateUrl: 'application',
        controller: 'applicationController'
    }) 
    .when('/auth/absence', {
        templateUrl: 'absence',
        controller: 'absenceController'
    })
    .when('/reviewApplications', {
        templateUrl: 'reviewApplications',
        controller: 'applicationsReviewController'
    })
    .when('/createGuild', {
        templateUrl: 'createGuild',
        controller: 'createGuildController'
    })
    .when('/joinGuild', {
        templateUrl: 'joinGuild',
        controller: 'joinGuildController'
    })
    .when('/manageMembers', {
        templateUrl: 'manageMembers',
        controller: 'manageMembersController'
    })
    .when('/whosOut', {
        templateUrl: 'absenceSubmissions',
        controller: 'absenceController'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.hashPrefix('!');

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**',
        'https://pagead2.googlesyndication.com'
    ]);

  $locationProvider.html5Mode(true);
  
  
  
}])

'user strict'

angular.module("BossCollection.forums", ['ngRoute'])
    .config(['$routeProvider',  function ($routeProvider) {

        $routeProvider
        .when('/forum', {
            templateUrl: 'forum',
            controller: 'forumController'
        })
        .when('/forum/:forumID', {
            templateUrl: 'thread',
            controller: 'threadController'
        })

    }]);
angular.module("BossCollection.forums")
    .controller('dialogController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', 'data',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, data) {

            $scope.object = {};
            $scope.loading = false;
            $scope.replying = false;
            $scope.comment = "";

            if (data) {

                $scope.object = data;
            }
            else {
                $scope.object = {};
            }




            $scope.cancel = function () {

                $mdDialog.cancel();
            }

            $scope.cancelComment = function () {
                $scope.replying = false;
            }

            $scope.saveComment = function () {

                var comment = {
                    message: $scope.object.newComment,
                    threadId: $scope.object._id
                }

                forumService.createComment(comment)
                    .then(function (comment) {

                        $scope.object.newComment = "";
                        $scope.object.comments.push(comment.comment);
                        $scope.cancelComment();
                    })
            }

            $scope.openCommentBox = function () {
                $scope.replying = true;
            }

            $scope.close = function () {
                $mdDialog.hide($scope.object);
            }

            $scope.deleteCategory = function () {

                forumService.deleteCategory($scope.object)
                    .then(function (result) {

                        $scope.close(result);
                    })
            }

            $scope.deleteForum = function () {

                forumService.deleteForum($scope.object)
                    .then(function (result) {

                        $scope.close(result);
                    })
            }

            $scope.saveCategory = function () {

                $scope.loading = false;

                if ($scope.object._id) {
                    forumService.editCategory($scope.object)
                        .then(function (result) {

                            $scope.close(result);
                        })
                        .catch(function (err) {

                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }
                else {
                    forumService.createNewCategory({ name: $scope.object.name })
                        .then(function (result) {

                            $scope.close(result);
                        })
                        .catch(function (err) {

                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }

            }

            $scope.saveThread = function () {
                
                var thread;
                
                if ($scope.object._id) {
                    
                    thread = $scope.object;
                    
                    forumService.editThread(thread)
                        .then(function (response) {

                            $scope.close(response);
                        })
                        .catch(function (err) {
                            
                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }
                else {

                    thread = {
                        name: $scope.object.title,
                        forumId: $scope.object.forum._id,
                        message: $scope.object.message
                    }

                    forumService.createThread(thread)
                        .then(function (response) {

                            $scope.close(response);
                        })
                        .catch(function (err) {

                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }
            }

            $scope.saveForum = function () {

                $scope.loading = true;

                if ($scope.object._id) {
                    var forum = $scope.object;
                    
                    forumService.editForum(forum)
                        .then(function (response) {

                            $scope.close(response);
                        })
                        .catch(function (err) {
                            
                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }
                else {


                    var forum = {
                        name: $scope.object.name,
                        categoryId: $scope.object.object.categoryId
                    }

                    forumService.createNewForum(forum)
                        .then(function (response) {

                            $scope.close(response);
                        })
                        .catch(function (err) {
                            $scope.loading = false;
                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }
            }
        }]);
angular.module("BossCollection.forums")
    .controller('forumController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', '$window',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, $window) {

            console.log("Forum Controller loaded");
            siteServices.updateTitle('Forums');
            $scope.testListCount = [];
            $scope.loading = false;
            
            
            for (var i = 0; i < 5; i++) {
                $scope.testListCount.push(i);
            }


            $scope.markdown = "";
            
            $scope.init = function(){
                
                $scope.getForums();
            }
            
            $scope.getForums = function(){
                
                $scope.loading = true;
                return forumService.getForums()
                    .then(function(forums){
                        
                        $scope.loading = false;  
                        $scope.forums = forums;
                    })
                    .catch(function(err){
                        
                        $scope.loading = false;
                        console.log(err);
                    })
            }
            
            $scope.newCategory = function () {

                $scope.category = {};
                
                forumService.openBottomSheet('category')
                    .then(function(result){
                        
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
                    .then(function(){
                        
                        //Category created. 
                        forumService.cancel();
                    })
                    .catch(function(err){
                        
                        siteServices.showMessageModal(err);
                    })
            }

            $scope.editCategory = function (category) {

                //$scope.category = category;
                
                forumService.openBottomSheet('category', category)
                    .then(function(result){
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
                    .catch(function(err){
                        //Didn't save
                    })
            } 

            $scope.deleteCategory = function (category) {

                forumService.confirmDelete()
                    .then(function(result){
                        
                        if(result){
                            console.log("Deleting the category")
                            return forumService.deleteCategory(category);
                        }
                    })
                    .then(function(response){
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
            }
            
            $scope.createForum = function (category) {
                
                var categoryId = category._id;
                
                forumService.openBottomSheet('forumEdit', {object: {categoryId: categoryId}})
                    .then(function(result){
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
                    .catch(function(err){
                        //Didn't save
                    })
                
            }

            $scope.editForum = function(forum){
                
                forumService.openBottomSheet('forumEdit', forum)
                    .then(function (result) {
                        
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
            }
            
            $scope.deleteForum = function(forum){
                
                 forumService.confirmDelete()
                    .then(function(result){
                        
                        if(result){
                            console.log("Deleting the forum")
                            return forumService.deleteForum(forum);
                        }
                    })
                    .then(function(response){
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
            }

            $scope.goToForum = function (forum) {

                forumService.setForum(forum);
                $location.url('/forum/' + forum._id)
            }


            $scope.init();
        }]) 
angular.module("BossCollection.forums")
    .service('forumService', [
        '$location', '$mdDialog', '$q', '$routeParams', 'siteServices', '$mdMedia', '$rootScope', '$resource', 
        function ($location, $mdDialog, $q, $routeParams, siteServices, $mdMedia, $rootScope, $resource) {

            var currentForum;

            var categoryResource = $resource('/forum/createCategory', {}, {})
            var categoryEditResource = $resource('/forum/editCategory', {}, {})
            var categoryDeleteResource = $resource('/forum/deleteCategory', {}, {})
            var getForumsResource = $resource('/forum/getCategories', {}, {});
            var deleteForumsResource = $resource('/forum/deleteForum', {}, {});
            var editForumResource = $resource('/forum/editForum', {}, {})
            var createNewForumResource = $resource('/forum/createForum', {}, {});
            var createNewThreadResource = $resource('/forum/createThread', {}, {});
            var getThreadsResource = $resource('/forum/getThreads', {}, {});
            var deleteThreadResource = $resource('/forum/deleteThread', {}, {});
            var editThreadResource = $resource('/forum/editThread')
            
            var createCommentResource = $resource('/forum/createComment', {}, {});
            var getCommentsResource = $resource('/forum/getComments', {}, {});
            var forums;
            
            //==== Category Functions ==================
            
            function deleteCategory(category) {
                
                var defer = $q.defer();
                var bodyData = { category: category };
                
                categoryDeleteResource.save(bodyData).$promise
                    .then(function(result){
                        
                        defer.resolve(result);
                    }, function(err){
                        
                        defer.reject(err);
                    })
                    .finally(function(){
                        
                    })
                
                return defer.promise;
            }

            function createNewCategory(category) { 

                var defer = $q.defer();

                var bodyData = { category: category };

                categoryResource.save(bodyData).$promise
                    .then(function (response) {

                        defer.resolve(response.category);
                    })

                return defer.promise;
            }

            function editCategory(category) {

                var defer = $q.defer();
                var bodyData = { category: category };
                
                categoryEditResource.save(bodyData).$promise
                    .then(function (response) {

                        defer.resolve(response.category);
                    }, function(err){
                        defer.reject(err);
                    })
                    .finally(function(){
                        
                    })
                
                defer.resolve(category);

                return defer.promise;
            }
            
            //==== Forum Functions ==================
            
            function setForum(selectedforum) {
                currentForum = selectedforum;
            }
            
            function getForum(forumId){
                
                var defer = $q.defer();
                
                getForums()
                    .then(function(forums){
                        
                        var selectedForum;
                         
                         _(forums.categories).forEach(function(category){
                             
                         
                             _.find(category.forums, function (forum) {

                                 if(forum._id == forumId){
                                     selectedForum = forum;
                                 }
                             })
                        
                        })
                        
                        defer.resolve(selectedForum);
                    }, function(err){
                        defer.reject(err);
                    })
                    .finally(function(){
                        
                    })
                    
                return defer.promise;
            }

            function getForums() {

                var defer = $q.defer();

                if (forums) {
                    defer.resolve(forums);
                }
                else {

                    getForumsResource.save({}).$promise
                        .then(function (response) {

                            forums = response.forums;
                            defer.resolve(response.forums);
                        }, function(err){
                            
                            defer.reject(err);
                        })
                }
                return defer.promise;
            }
            
            function removeLocalForums(){
                forums = undefined;
            }

            function deleteForum(forum) {

                var defer = $q.defer();
                
                var bodyData = {forum: forum};
                
                deleteForumsResource.save(bodyData).$promise
                    .then(function(response){
                        
                        defer.resolve(response);        
                    })
                    .catch(function(err){
                        
                        defer.reject(err);
                    })
                    .finally(function(){
                        
                    })
                

                return defer.promise;
            }

            function createNewForum(forum) {

                var defer = $q.defer();

                createNewForumResource.save({ forum: forum }).$promise
                    .then(function (response) {
                        defer.resolve(response);
                    })
                    .catch(function (err) {

                        defer.reject(err);
                    })

                return defer.promise;
            }

            function editForum(forum) {

                var defer = $q.defer();
                
                editForumResource.save({ forum: forum }).$promise
                    .then(function (response) {
                        defer.resolve(response);
                    })
                    .catch(function (err) {

                        defer.reject(err);
                    })
                    .finally(function(){
                        
                    })
                

                return defer.promise;
            }

            function getSelectedForum() {
                
                var defer = $q.defer();

                if (currentForum) {
                    defer.resolve(currentForum);
                }
                else {

                    getForum($routeParams.forumID)
                        .then(function(forum){
                            
                            currentForum = forum;
                            defer.resolve(forum);
                        })
                }

                return defer.promise;
            }
            
            //==== Thread Functions ==================
            
            function getThreads(forumId) {
                
                var defer = $q.defer();

                var bodyData = { forumId: forumId };

                getThreadsResource.save(bodyData).$promise
                    .then(function (response) {

                        defer.resolve(response.threads);
                    })

                return defer.promise;
            }

            function deleteThread(thread) {
                
                var defer = $q.defer();
                
                var bodyData = {thread: thread};
                
                deleteThreadResource.save(bodyData).$promise
                    .then(function (response) {

                        defer.resolve(response);
                    })
                    .catch(function (err) {

                        defer.reject(err);
                    })
                    .finally(function () {

                    })
            }

            function editThread(thread) {
                
                var defer = $q.defer();
                
                editThreadResource.save({ thread: thread }).$promise
                    .then(function (response) {
                        defer.resolve(response);
                    })
                    .catch(function (err) {

                        defer.reject(err);
                    })
                    .finally(function(){
                        
                    })
                

                return defer.promise;
            }

            function createThread(thread) {
                
                var defer = $q.defer();

                var bodyData = { thread: thread };

                createNewThreadResource.save(bodyData).$promise
                    .then(function (response) {

                        defer.resolve(response.thread);
                    })

                return defer.promise;
            }
            
            
            
            
            //==== Comment Functions ==================
            
            function deleteComment(comment) {

            }

            function editComment(comment) {

            }

            function createComment(comment) {
                
                var defer = $q.defer();
                
                var bodyData = { comment: comment };
                
                createCommentResource.save(bodyData).$promise
                    .then(function(comment){
                        
                        defer.resolve(comment)
                    }, 
                    function(err){
                        
                        defer.reject(err);
                    })
                
                
                return defer.promise;
            }

            function getComments(threadId){
                
                var defer = $q.defer();
                
                var bodyData = {threadId: threadId};
                
                getCommentsResource.save(bodyData).$promise
                    .then(function(comments){
                        
                        defer.resolve(comments);
                    }, 
                    function(err){
                        
                        defer.reject(err);
                    })
                    
                return defer.promise;
            }
            
            

            
            
            //==== General Functions ==================

            

            function confirmDelete(event, callback) {

                var defer = $q.defer();

                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete this?')
                    .textContent('This is irreversable once you click Yes!')
                    .ariaLabel('Confirm Delete')
                    .targetEvent(event)
                    .ok('Delete')
                    .cancel('Nevermind');

                $mdDialog.show(confirm)
                    .then(function () {

                        defer.resolve(true);
                    }, function (err) {

                        defer.reject(false);
                    })

                return defer.promise;
            }


            function openBottomSheet(template, locals) {

                var defer = $q.defer();
                var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
                $mdDialog.show({
                    templateUrl: template,
                    controller: 'dialogController',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false,
                    locals: { data: locals },
                    fullscreen: true
                })
                    .then(function (result) {

                        defer.resolve(result);
                    },
                        function () {
                            defer.reject();
                            //Something broke or they canceled
                        })

                return defer.promise;
            }

            function cancel() {

                $mdDialog.hide();
            }

            return {
                setForum: setForum,
                confirmDelete: confirmDelete,
                openBottomSheet: openBottomSheet,
                createNewCategory: createNewCategory,
                deleteCategory: deleteCategory,
                editCategory:editCategory,                
                editForum: editForum,
                createNewForum: createNewForum,
                deleteForum: deleteForum,
                cancel: cancel,
                getForums: getForums,
                removeLocalForums:removeLocalForums,
                getThreads: getThreads,
                getCurrentForum: getSelectedForum,
                deleteThread: deleteThread,
                editThread: editThread,
                createThread: createThread,
                deleteComment: deleteComment,
                editComment: editComment,
                createComment: createComment,
                getComments:getComments
            }
        }]) 
        
      
angular.module("BossCollection.forums")
    .controller('threadController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog) {
            
            console.log("Thread Controller Loaded");
            
            $scope.forum = {};
            $scope.loading = false;
            
            $scope.init = function(){
                
                $scope.loading = true;
                
                $scope.forum = forumService.getCurrentForum()
                    .then(function(forum){
                        $scope.forum = forum;        
                    })
                    .then(function(){
                        siteServices.updateTitle($scope.forum.name + ' Forum');        
                        return forumService.getThreads($scope.forum);
                    })
                    .then(function(threads){
                        $scope.threads = threads;
                    })
                    .catch(function(err){
                        
                        $scope.loading = false;
                    })
                    .finally(function(){
                        
                        $scope.loading = false;
                    })
            }  
            
            $scope.refresh = function(){
                
                $scope.loading = true;
                
                forumService.getThreads($scope.forum)
                    .then(function(threads){
                        
                        $scope.loading = false;
                        $scope.threads = threads;
                    })
                    .catch(function(err){
                        
                        $scope.loading = false;
                    })
            }
            
            $scope.deleteThread = function(thread){
                
                forumService.confirmDelete()
                    .then(function(result){
                        
                        if(result){
                            console.log("Deleting the category")
                            return forumService.deleteThread(thread);
                        }
                    })
                    .then(function(response){
                        
                        $scope.refresh();
                    })
            }
            
            $scope.openThread = function(thread){
                
                forumService.getComments(thread._id)
                    .then(function(comments){
                        
                        thread.comments = comments.comments;
                        forumService.openBottomSheet('threadComments', thread);
                            
                    })
                
                
            }
            
            $scope.createThread = function () {

                forumService.openBottomSheet('threadEdit', { forum: $scope.forum })
                    .then(function (response) {
                        $scope.refresh();
                    })
            }
            
            $scope.editThread = function(forum){
                
                forumService.openBottomSheet('threadEdit', forum);
            }
            
            $scope.goBack = function(){
                window.history.back();
            }
            
            $scope.init();
        }])
'use strict';
/**
 *
 */
angular.module("BossCollection.controllers", [
    
])
'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("homeController", ["$scope", '$location', '$http', '$timeout', 'siteServices', '$sce',
        function($scope, $location, $http, $timeout, siteServices, $sce){
          
            
            siteServices.updateTitle('Home');
    }])
 
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
        $scope.title = "";
        
        
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
                    $scope.user.name = "";
                    $scope.loggedIn = false;
                })
        }
        
        $scope.init();
    }])

'use strict';
angular.module("BossCollection.controllers")    
    .controller("rosterController", ["$scope",  'filterFilter', 'socketProvider', 'guildServices', '$http', '$cookies', '$location', 'siteServices',
        function($scope, filterFilter, socketProvider, guildServices, $http, $cookies, $location, siteServices){
            
            
            
            siteServices.updateTitle('Guild Roster');
            
            $scope.currentRosterDropdown = true;
            $scope.applicantsDropdown = false;
            
            var classes = ["placeholder","warrior", "paladin", "hunter", "rogue", "priest", "death knight", "shaman", "mage", "warlock","monk","druid"]
            
            $scope.raiders = [];
            $scope.trials = [];
            
            $scope.trialRanks = [9];
            $scope.raiderRanks = [0, 2, 6];
            
            $scope.guild = "mkdir bosscollection";
            $scope.realm = "zul'jin";
            
            $scope.loading = true;
            $scope.genders = ['Male', 'Female']
            
            
            getSavedRanksList();
            $('ul.tabs').tabs(); //jquery
            
            $scope.getMembers = function(){
                
                $scope.raiders = [];
                $scope.trials = [];
                
                $scope.loading = true;
                
                guildServices.getGuild($scope.realm, $scope.guild).then(function(data){
                    
                    console.log(data);
                    $scope.loading = false;
                    parseMembers(data);
                },
                function(err){
                    
                    $scope.loading = false;
                    console.log(err);
                });
            }
            
            $scope.getUser = function(){
                
                $http({method: 'POST', url: '/getUser'}).success(function(data){
                   
                   console.log(data);
                });
            }
            
            $scope.openArmoryProfile = function(name, realm){
                
                var armoryURL = "http://us.battle.net/wow/en/character/" + realm +"/" + name + "/simple";
                window.open(armoryURL);
            }
            
            $scope.saveRanksList = function(){
                
                var ranksList = {
                    guild: $scope.guild,
                    realm: $scope.realm, 
                    trialRanks: $scope.trialRanks,
                    raiderRanks: $scope.raiderRanks
                }
                
                $cookies.putObject("ranksList", ranksList);
            }
            
            function getSavedRanksList(){
                
                var ranksList = $cookies.getObject("ranksList");
                
                if(ranksList){
                    
                    $scope.raiderRanks = ranksList.raiderRanks;
                    $scope.trialRanks = ranksList.trialRanks;
                    $scope.guild = ranksList.guild;
                    $scope.realm = ranksList.realm;
                }
            }
            
            var buildRaiderObject = function(raider, rank, classType){
                
                try {

                    var newMember = {
                        "name": raider.character.name,
                        "class": classType.charAt(0).toUpperCase() + classType.slice(1),
                        "rank": rank,
                        "gender": $scope.genders[raider.character.gender],
                        "race": raider.character.race,
                        "spec": raider.character.spec.name,
                        "achievementPoints": raider.character.achievementPoints,
                        "avatar": "http://us.battle.net/static-render/us/" + raider.character.thumbnail
                    }

                    return newMember;
                }
                catch(err){
                    console.log(raider);
                }
            }
            
            var parseMembers = function(membersObject){               
                
                for(var i = 0; i < membersObject.length; i++){
                    
                    var memberRank = membersObject[i].rank
                    
                    var raiderRankValid = _.find($scope.raiderRanks, function(rank){
                        return memberRank == rank;
                    })
                    
                    var trialRankValid = _.find($scope.trialRanks, function(rank){
                        return memberRank == rank;
                    })
                    
                    var classType = classes[membersObject[i].character.class];
                    
                    if (raiderRankValid) {

                        $scope.raiders.push(buildRaiderObject(membersObject[i], memberRank, classType));
                    }
                    
                    if(trialRankValid){
                        $scope.trials.push(buildRaiderObject(membersObject[i], memberRank, classType));
                    }
                }
                
                $scope.raiders.sort(function(a, b){return a.rank-b.rank});
            }
            
            
            $scope.lowLvlTrials = [];
            
            
           $scope.getMembers()

        }])
'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("absenceController", ["$scope", '$location', 'userLoginSrvc', 'absenceService', 'siteServices', '$filter',
        function($scope, $location, userLoginSrvc, absenceService, siteServices, $filter){
        
        var currentDay = moment().day();
        
        $scope.newAbsence = {};
        $scope.absences = {};
        $scope.loading = false;
        $scope.typePicked = false;
        $scope.today = moment(); 
        $scope.dayDesired;
        $scope.currentlySelected = moment().format('dddd - Do');
        
        
        $scope.toolbar = {
            isOpen: false,
            direction: "right"
        }
        
        $scope.currentlySelected = "Today";
        $scope.isToolSetOpen = false;
        
        if($location.url() == "/auth/absence"){
            siteServices.updateTitle('Report Absence');    
        }
        else{
            siteServices.updateTitle('Upcoming Absences');    
        }
       
        
       $scope.updateList = function(){
           $scope.currentlySelected = moment($scope.dayDesired).format('dddd - Do');
           
           $scope.getAbsencesByDate();
       }
       
       function calculateNumOfDaysUntil(dayDesired){
           var numOfDaysInWeek = 7;
           
           var nextDate = dayDesired - currentDay;
           
           if(nextDate < 0){
               
                nextDate = numOfDaysInWeek - Math.abs(nextDate);    
           }
           
           
           
           return nextDate;
       }
       
       $scope.formatDate = function(date){
           
           return moment.utc(date).format('dddd, MMM D');
       }

        $scope.getAbsences = function(){
            $scope.currentlySelected = "All absences"
            $scope.loading = true;
            
            absenceService.getAbsences().then(function(result){
                
                $scope.loading = false;
                $scope.absences = result.absences; 
            }, 
            function(err){
                siteServices.showMessageToast(err) 
                $scope.loading = false;
                console.log(err);  
            })
        }
        
        $scope.getAbsencesByDate = function(){
            
            $scope.loading = true;
            
            absenceService.getAbsencesByDate($scope.dayDesired).then(function(result){
                
                $scope.loading = false;
                $scope.absences = result.absences; 
            }, 
            function(err){
                siteServices.showMessageToast(err) 
                $scope.loading = false;
                console.log(err);  
            })
        }
         
        $scope.submitNewAbsence = function () {

            if ($scope.newAbsence.date == null) {

                siteServices.showMessageModal("Must select a date")
            }
            else if($scope.newAbsence.type == null){
                siteServices.showMessageModal("Must select a type: Late or Absent")
            }
            else {
                
                absenceService.submitNewAbsence($scope.newAbsence).then(function (result) {
                
                    //TODO: Redirect to list of absences.
                    $location.path("/whosOut");
                },
                    function (err) {
                        Materialize.toast(err)
                        console.log(err);
                    })
            }


        }
        
        
        function filterOutOldDates(){
            
        }
    

    }])

'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("editAccountController", ["$scope", '$location', '$http', 'userLoginSrvc', 'siteServices', 'guildServices',
        function ($scope, $location, $http, userLoginSrvc, siteServices, guildServices) {

            siteServices.updateTitle('Account');

            $scope.leaveGuild = function () {

                var guildName = $scope.user.guild.name;

                guildServices.leaveGuild(guildName)
                    .then(function (user) {

                        $scope.user = userLoginSrvc.updateUser();
                    })
            }

            $scope.updateAccount = function () {

                console.log("Updating account");
                userLoginSrvc.updateAccount($scope.user).then(function (response) {

                    $scope.user = userLoginSrvc.updateUser();
                    siteServices.showMessageToast("User updated");
                },
                    function (err) {

                        siteServices.showMessageModal(err);
                    })
            }
        }])

'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("loginController", ["$scope", '$location', '$http', 'userLoginSrvc', 'siteServices', '$mdBottomSheet', '$timeout',
        function($scope, $location, $http, userLoginSrvc, siteServices, $mdBottomSheet, $timeout){

        $scope.user = {};
        $scope.user.name = "";
        $scope.loading = false;
        
        if($location.url() == "/auth/login"){
            siteServices.updateTitle('Login');    
        }
        
        console.log("Login Controller");
        
        $scope.init = function () {
        }
        
        $scope.resetPassword = function(){
            
            $scope.loading = true;
             
            userLoginSrvc.lostPassword($scope.user.email)
                .then(function(response){
                    siteServices.showMessageModal("Email has been sent. Refer to your email for your temporary password.")
                })
                .catch(function(err){
                    siteServices.showMessageModal(err);
                })
                .finally(function(){
                    
                    $scope.loading = false;
                })
        }
        
        $scope.alreadyLoggedIn = function(){
             
            if(userLoginSrvc.loggedIn() == true){
                $location.path('/');
            }
        }
        
        $scope.openPasswordResetWindow = function($event){
            $mdBottomSheet.show({
                    templateUrl: 'resetPassword',
                    controller: 'loginController',
                    targetEvent: $event,
                    escapeToClose: false
                })
        }
        
        $scope.cancelPasswordReset = function(){ 
            
            $mdBottomSheet.hide();
            $timeout(function(){
                
                siteServices.showLoadingBottomSheet();    
            }, 500);
            
        }
        
        $scope.login = function(){
             
            
            userLoginSrvc.login($scope.user).then(function(response){
                
                //navigate to some page
                console.log(response);
                userLoginSrvc.getUser()
                    .then(function () {

                        if ($location.path() == "/auth/application") {

                        }
                        else {
                            $location.path("/");
                        }
                    })
                
            },
            function(err){
                
                siteServices.showMessageModal(err);
                console.log(err);
            })
        }
        
        $scope.cancelLogin = function () {
            
            siteServices.hideBottomSheet();
            $location.path("/");
        }
    }])

'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("signupController", ["$scope", '$location', '$http', '$timeout', 'userLoginSrvc', 'siteServices',
        function ($scope, $location, $http, $timeout, userLoginSrvc, siteServices) {

            $scope.user = {};

            $scope.passwordsMatch = false;

            $('#logInModal').closeModal();

            $scope.register = function () {

                userLoginSrvc.registerNewUser($scope.user).then(function (result) {
                    //save user to cookie
                    console.log(result);
                },
                    function (err) {
                        $scope.passwordsMatch = true;
                        $scope.openFromLeft(err);
                        console.log(err);
                    })

            }

            $scope.openFromLeft = function (errorMessage) {
                
                siteServices.showMessageModal(errorMessage);
            };

        }])

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
            $scope.icon = "error";
            
                
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

'use strict';
/**
 
 *

 */
angular.module("BossCollection.controllers")
    .controller("applicationsReviewController", ["$scope", '$location', '$http', '$timeout', 'guildServices', 'siteServices',
        function($scope, $location, $http, $timeout, guildServices, siteServices){
            
            siteServices.updateTitle('View Applications');    
            
          
            
             var classes = ["placeholder","warrior", "paladin", "hunter", "rogue", "priest", "death knight", "shaman", "mage", "warlock","monk","druid"]
            
            $scope.loading = true;
            
            $scope.openComments = function (comments) {
                
                siteServices.showMessageModal(comments, "Comments");
            } 
            
            $scope.goTo = function(url){
                
                var win = window.open(url, '_blank');
                win.focus();
            }
            //'http://us.battle.net/wow/en/character/{{application.realm.name}}/{{application.character.name}}/simple'
            
            $scope.buildArmoryUrl = function (realm, character) {
                var url = "http://us.battle.net/wow/en/character/" + realm + "/" + character + "/simple";
                
                $scope.goTo(url);
            }
            
            guildServices.getApplications() 
                .then(function(applications){
                    $scope.loading = false;
                    $scope.applications = applications.applications; //object to array
                    console.log($scope.applications);
                    
                    convertClasses();
                },
                function(err){
                    
                    $scope.loading = false;
                    console.log(err);
                    siteServices.showMessageToast("Seems something broke. Try again in a few...");
                })
                
            function convertClasses(){
                
                for(var i = 0; i < $scope.applications.length; i++){
                    
                    var classType = classes[$scope.applications[i].character.class];
                    $scope.applications[i].character.class = classType.charAt(0).toUpperCase() + classType.slice(1);
                    
                }
            }

    }])

'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("forumsController", ["$scope", '$location', '$http', 'userLoginSrvc', '$rootScope',
        function($scope, $location, $http, userLoginSrvc, $rootScope){
            
        $scope.user.name = userLoginSrvc.getUser();
        
        if($scope.user.name == undefined){
            $location.path('/');
        }
        

    }])

'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("createGuildController", [
        "$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc',
        function($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc){
          
            
            siteServices.updateTitle('Create Guild');
            
            $scope.guildName = "";
            $scope.loading = false;
            
            $scope.joinGuild = function(){
                $scope.loading = true;
                guildServices.createGuild($scope.guildName)
                    .then(function(){
                        
                        var user = userLoginSrvc.updateUser();
                        
                        siteServices.showMessageModal("Successfully created " + user.guild.name);
                        
                        $location.path('/');           
                    })
                    .catch(function(err){
                        siteServices.showMessageModal(err);
                    })
                    .finally(function(){
                        $scope.loading = false;
                    })
            }
    }])

'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("joinGuildController", [
        "$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc', '$filter',
        function ($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc, $filter) {


            $scope.listOfGuilds = [];
            $scope.loading = false;


            siteServices.updateTitle('Join Guild');

            $scope.init = function () {



                $scope.getGuilds();

            }

            $scope.filterSearch = function (filterSearch) {

                return $filter('filter')($scope.listOfGuilds, filterSearch);
            }

            $scope.getGuilds = function () {

                guildServices.getListOfGuilds()
                    .then(function (guilds) {

                        $scope.listOfGuilds = guilds;
                    })
            }

            $scope.joinGuild = function () {

                $scope.loading = true;

                if ($scope.guildName) {

                    guildServices.joinGuild($scope.guildName.name, $scope.user.name)
                        .then(function (guild) {

                            siteServices.showMessageModal("Success! You will be able to access the guild services once you've been promoted to member.");
                            
                            userLoginSrvc.updateUser($scope.user);

                            $location.path('/');


                        })
                        .catch(function (err) {
                            siteServices.showMessageModal(err);
                        })
                        .finally(function () {
                            $scope.loading = false;
                        })
                }
                else{
                    siteServices.showMessageToast("Guild doesn't exist");
                    $scope.loading = false;
                }
            }

            $scope.init();
        }])

'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("manageMembersController", [
        "$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc', '$filter',
        function ($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc, $filter) {
            
            //user comes from parent controller navbar
            
            $scope.guildMembers;
            $scope.ranks = ['Applicant', 'Member', 'Officer', 'GM']

            $scope.init = function () {

                if($scope.user.name != ""){
                    
                    guildServices.getGuildMembers($scope.user.guild.name)
                        .then(function (guildMembers) {
                            $scope.guildMembers = guildMembers
                        })
                }
                else{
                    userLoginSrvc.getUser()
                        .then(function(user){
                            
                            guildServices.getGuildMembers(user.guild.name)
                                .then(function (guildMembers) {
                                    $scope.guildMembers = guildMembers
                                })
                        })
                }

            }

            $scope.promote = function (user) {

                if (user.rank == 3) {
                    siteServices.showMessageModal("Can't promote any further");
                }
                else {
                    user.rank++

                    guildServices.updateRank($scope.user.guild.name, user)
                        .then(function () {

                        })
                        .catch(function (err) {
                            siteServices.showMessageModal(err);
                        })
                }


            }

            $scope.demote = function (user) {
                if (user.rank == 1) {
                    siteServices.showMessageModal("Can't demote any further. They are effectively kicked at this rank.");
                }
                else {
                    user.rank--;

                    guildServices.updateRank($scope.user.guild.name, user)
                        .then(function () {

                        })
                        .catch(function (err) {
                            siteServices.showMessageModal(err);
                        })
                }
            }
            
          
            $scope.init();
            siteServices.updateTitle('Manage Members');
        }])

'use strict'
angular.module("BossCollection.controllers")
    .controller("strategyRoomController", ['$scope',
                function($scope){
    
    
    
    }])
'use strict'
angular.module("BossCollection.controllers")    
    .controller("bossStrategyController", ['$scope', 'bossStrats', 'socketProvider','$routeParams',
            function($scope, bossStrats, socketProvider, routeParams){

                var socket = socketProvider;
                $scope.highmaulBossSelected = false;
                $scope.brfBossSelected = false;
                $scope.hfcBossSelected = false;
                
                $('.modal-trigger').leanModal();
                
               
                
                var desiredRaid = routeParams.raid;
                
                $scope.highmaul = "hm";
                $scope.brf = "brf";
                $scope.hfc = "hfc";
                $scope.bossInfo = {};
                $scope.loadChat = false;
                $scope.difficultySelected = "";                
                $scope.currentEmbedUrl = "";                
                $scope.addNewBoss = false;
                $scope.currentRaid = {}
                $scope.raidToDisplay = {};
                
                
                
                //New Boss Info
                $scope.name = "";
                $scope.url = "";
                
                
                
                $scope.init = function(){
                    
                    setSideNavHeight();
                        
                    bossStrats.getStrats(desiredRaid).then(function (bossData) {
                        $scope.raidToDisplay = bossData.bosses;
                        $scope.raidData = bossData;
                        resetSelectedBosses();
                    })

                }
                
                

                $scope.addVideo= function(bossName, difficulty, currentRaid){
                    

                    $scope.currentBoss = bossName;
                    $scope.currentDifficulty = difficulty;
                    $scope.currentRaid = currentRaid;
                };
               

                $scope.saveNewBossInfo = function(name, url, boss, difficulty){
                    
                    console.log(boss);
                     
                    if (verifyYoutubeURL(url)) {
                        
                        var parsedUrl = url.split("&");
                        parsedUrl = parsedUrl[0].split("=")
                        url = parsedUrl[1];

                        if (difficulty == "heroic") {
                            boss.heroic.videos[boss.heroic.videos.length] =
                                {
                                    "name": name,
                                    "url": url
                                }
                                
                        }
                        else if (difficulty == "mythic") {
                            boss.mythic.videos[boss.mythic.videos.length] =
                                {
                                    "name": name,
                                    "url": url
                                }
                        }                        
                        
                        $scope.raidData.bosses = $scope.raidToDisplay;
                        
                        console.log($scope.raidData);

                        bossStrats.saveStrats($scope.raidData, url);                        
                        $scope.addNewBoss = false;
                        
                        $scope.name = "";
                        $scope.url = "";

                        $scope.addNewBoss = !$scope.addNewBoss;
                    }
                    else{
                        $("#urlInput").popover('show');
                    }
                };
                

                
                $scope.changeBossInfo = function(boss, difficulty){
                    
                    boss.isSelected = !boss.isSelected;

                    $scope.bossSelected = boss.name;
                    $scope.addNewBoss = false;
                    
                    
                }
                
                $scope.changeDifficulty = function(boss, difficulty){
                    boss.difficultySelected = difficulty;
                    
                    if(difficulty == "- Heroic"){
                        
                        boss.heroic.isSelected = !boss.heroic.isSelected;
                        boss.mythic.isSelected = false;  
                    }
                    else{
                         boss.mythic.isSelected = !boss.mythic.isSelected;
                         boss.heroic.isSelected = false;
                    }
                    
                }
                




                $scope.setUrl = function(newUrl){
                    $scope.currentEmbedUrl = newUrl;
                };

                $scope.open = function (url) {
                    $scope.setUrl(url);
                    console.log(url);
                    $('#bossVideo').openModal();
                    
                }
                
                function resetSelectedBosses(){
                    for(var boss in $scope.raidToDisplay){
                        $scope.raidToDisplay[boss].isSelected = false;
                    }
                }
                
                function setSideNavHeight(){                    
                    document.getElementById("sideNavID").style.height = window.outerHeight/2 + "px";
                }
                
                function verifyYoutubeURL(url) {

                    return /(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/.test(url);
                }
                
                
                
                
                
                $scope.init();
        }])
'use strict'
angular.module("BossCollection.controllers")    
    .controller("bossStrategyController", ['$scope', 'bossStrats', '$modal', 'socketProvider','$routeParams',
            function($scope, bossStrats, $modal, socketProvider, routeParams){

                var socket = socketProvider;
                $scope.highmaulBossSelected = false;
                $scope.brfBossSelected = false;
                $scope.hfcBossSelected = false;
                
               
                var desiredRaid = routeParams.raid;
                
                $scope.highmaul = "hm";
                $scope.brf = "brf";
                $scope.hfc = "hfc";
                $scope.bossInfo = {};
                $scope.loadChat = false;
                $scope.difficultySelected = "";                
                $scope.currentEmbedUrl = "";                
                $scope.addNewBoss = false;
                $scope.currentRaid = {}
                $scope.raidToDisplay = {};
                
                
                
                //New Boss Info
                $scope.name = "";
                $scope.url = "";
                
                
                
                $scope.init = function(){
                    
                    setSideNavHeight();
                        
                    bossStrats.getStrats(desiredRaid).then(function (bossData) {
                        $scope.raidToDisplay = bossData.bosses;
                        $scope.raidData = bossData;
                        resetSelectedBosses();
                    })

                }
                
                

                $scope.addVideo= function(bossName, difficulty, currentRaid){
                    

                    $scope.currentBoss = bossName;
                    $scope.currentDifficulty = difficulty;
                    $scope.currentRaid = currentRaid;
                };
               

                $scope.saveNewBossInfo = function(name, url, boss, difficulty){
                    
                    console.log(boss);
                     
                    if (verifyYoutubeURL(url)) {
                        
                        var parsedUrl = url.split("&");
                        parsedUrl = parsedUrl[0].split("=")
                        url = parsedUrl[1];

                        if (difficulty == "heroic") {
                            boss.heroic.videos[boss.heroic.videos.length] =
                                {
                                    "name": name,
                                    "url": url
                                }
                                
                        }
                        else if (difficulty == "mythic") {
                            boss.mythic.videos[boss.mythic.videos.length] =
                                {
                                    "name": name,
                                    "url": url
                                }
                        }                        
                        
                        $scope.raidData.bosses = $scope.raidToDisplay;
                        
                        console.log($scope.raidData);

                        bossStrats.saveStrats($scope.raidData, url);                        
                        $scope.addNewBoss = false;
                        
                        $scope.name = "";
                        $scope.url = "";

                        $scope.addNewBoss = !$scope.addNewBoss;
                    }
                    else{
                        $("#urlInput").popover('show');
                    }
                };
                

                
                $scope.changeBossInfo = function(boss, difficulty){
                    
                    boss.isSelected = !boss.isSelected;

                    $scope.bossSelected = boss.name;
                    $scope.addNewBoss = false;
                    
                    
                }
                
                $scope.changeDifficulty = function(boss, difficulty){
                    boss.difficultySelected = difficulty;
                    
                    if(difficulty == "- Heroic"){
                        
                        boss.heroic.isSelected = !boss.heroic.isSelected;
                        boss.mythic.isSelected = false;  
                    }
                    else{
                         boss.mythic.isSelected = !boss.mythic.isSelected;
                         boss.heroic.isSelected = false;
                    }
                    
                }
                




                $scope.setUrl = function(newUrl){
                    $scope.currentEmbedUrl = newUrl;
                };

                $scope.open = function (url) {
                    $scope.setUrl(url);
                    console.log(url);
                    var modalInstance = $modal.open({
                        templateUrl: 'videoModal',
                        controller: 'videoController',
                        size: 'lg',
                        windowClass: "videoModal",
                        resolve: {
                            currentUrl: function () {
                                return  $scope.currentEmbedUrl;
                            }
                        }
                    });
                }
                
                function resetSelectedBosses(){
                    for(var boss in $scope.raidToDisplay){
                        $scope.raidToDisplay[boss].isSelected = false;
                    }
                }
                
                function setSideNavHeight(){                    
                    document.getElementById("sideNavID").style.height = window.outerHeight/2 + "px";
                }
                
                function verifyYoutubeURL(url) {

                    return /(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/.test(url);
                }
                
                
                
                
                
                $scope.init();
        }])
'use strict'
angular.module("BossCollection.controllers")
	.controller("videoController", ['$scope', 'currentUrl', '$modalInstance',
		function ($scope, currentUrl, $modalInstance) {


			$scope.url = currentUrl;


			$scope.getIframeSrc = function () {
				return 'https://www.youtube.com/embed/' + $scope.url;
			};


			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};


			$scope.embedUrl = $scope.url;
		}])

'use strict';
angular.module('BossCollection.directives', [])
'use strict';
/* Directives */

angular.module('BossCollection.directives').
  directive('ad', [function () {
        return {
            restrict: 'E',
            template: '<ins class="adsbygoogle"style="display:block;"data-ad-client="ca-pub-4895481554192451"data-ad-slot="1814022675"data-ad-format="auto">',
 
            link: function (scope, elm, attrs) {

                try {
                    (adsbygoogle = window.adsbygoogle || []).push({});
                }
                catch (err) {
                    console.log("Add code broke");
                    console.log(err);
                    
                }  
            }
        }  
  }]); 
 
'use strict';
/* Directives */
 
angular.module('BossCollection.directives').
  directive('bossstrategies', [function () {
        return {
            restrict: 'E',
            templateUrl: 'bossStrategy',
            controller: 'bossStrategyController',
 
            link: function(scope, elm, attrs) {
            }
        } 
  }]); 
 
'use strict';
/* Directives */

angular.module('BossCollection.directives').
  directive('logIn', [function () {
        return {
            restrict: 'E',
            templateUrl: 'login',
            controller: 'loginController',
 
            link: function(scope, elm, attrs) {
            }
        }  
  }]); 
 
angular.module('BossCollection.directives')
    .directive('displayMarkdown', ['$sce', function($sce){
        
        return {
            restrict: 'E',
            scope: {
                markdown: '=markdown'
            },
            link: function(scope){
                
                var converter = new showdown.Converter();
                
                scope.converToHtml = function (){
                    
                    scope.html = $sce.trustAsHtml(converter.makeHtml(scope.markdown));
                }
                
                scope.converToHtml(scope.markdown);    
            }, 
            templateUrl: 'displayMarkdownDirective'
        } 
        
    }])
angular.module('BossCollection.directives')
    .directive('inputMarkdown', ['$sce', function($sce){
        
        return {
            restrict: 'E',
            scope: {
                input: '=input'
            },
            link: function(scope){
                
                var converter = new showdown.Converter();                
                scope.markdown = scope.input;
                scope.showPreview = true;
                
                scope.goToExternal = function (path) {
                    window.open(
                        path,
                        '_blank' // <- This is what makes it open in a new window.
                        );
                }
                
                scope.converToHtml = function (){
                    
                    scope.html = $sce.trustAsHtml(converter.makeHtml(scope.markdown));   
                    scope.input = scope.markdown;
                }
                
                scope.hideShowPreview = function(){
                    
                    scope.showPreview = !scope.showPreview
                }
                
                scope.converToHtml(scope.markdown);    
            }, 
            templateUrl: 'inputField'
        } 
        
    }])
'use strict';
angular.module('BossCollection.filters', [])
'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.filters")
    .filter("applicants", [function(){
            
            return function(applicants){
                 var applicantsFiltered = [];
                 applicantsFiltered = _.filter(applicants, function(applicant){ 
                    return applicant.rank == 1;
                })
                 
                return applicantsFiltered.length;
            } 
    }])

'use strict';

/* Filters */

angular.module('BossCollection.filters').
  filter('interpolate', function (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  });

'use strict';
angular.module("BossCollection.services", []) 
'use strict';

angular.module("BossCollection.services")
    .factory('absenceService', ['$resource', '$q', '$location', '$cookies', '$rootScope',
        'siteServices',
        function ($resource, $q, $location, $cookies, $rootScope, siteServices) {

            var absence = $resource('/api/absence', {}, {})
            var absenceByDate = $resource('/api/absenceByDate', {}, {})


            var absenceApi = {

                submitNewAbsence: function (newAbsence) {

                    var defer = $q.defer();

                    siteServices.startLoading();

                    absence.save(newAbsence).$promise
                        .then(function (response) {

                            defer.resolve(response);
                        },
                            function (err) {

                                console.log(err);
                                defer.reject(err.data);
                            })
                        .finally(function () {
                            siteServices.loadingFinished();
                        })

                    return defer.promise;
                },
                getAbsences: function () {

                    var defer = $q.defer();



                    absence.get().$promise
                        .then(function (response) {

                            defer.resolve(response);
                        },
                            function (err) {

                                console.log(err);
                                defer.reject(err.data);
                            })
                        .finally(function () {
                            siteServices.loadingFinished();
                        })




                    return defer.promise;
                },
                getAbsencesByDate: function (date) {

                    var defer = $q.defer();

                    absenceByDate.save({date:date}).$promise
                        .then(function (response) {

                            defer.resolve(response);
                        },
                            function (err) {

                                console.log(err);
                                defer.reject(err.data);
                            })
                        .finally(function () {
                            siteServices.loadingFinished();
                        })




                    return defer.promise;
                }
            };

            return absenceApi;
        }])
'use strict';

angular.module("BossCollection.services")
    .factory('bossStrats', ['socketProvider', '$resource', '$q', function (socket, $resource, $q) {
        
        var stratsAPI = $resource('/api/bossStrats', {},
            {
                update: {
                    method: 'PUT'
                }
            })
        
        
        var bossStratsApi = {

            getStrats: function (boss) {
                
                var defer = $q.defer();
                
                console.log("Request Boss Info");
                //socket.emit("getBossInfo", boss); 
                
                var data = {name: boss};
                
                stratsAPI.save(data).$promise.then(function(result){ 
                    console.log("Result: " );
                    console.log(result);
                    defer.resolve(result.result);
                })
                
                return defer.promise;
            },
            saveStrats: function (updatedStrats, url) {
                console.log("Saving info now");
                var parameters = {
                    raidData: updatedStrats,
                    url: url
                }
                parameters = angular.toJson(parameters);
                console.log(parameters); 
                //socket.emit("saveStrats", parameters);
                stratsAPI.data = parameters;
                
                stratsAPI.update(parameters, function(result){
                    console.log("Result: " + result);
                })
            }
        };

        return bossStratsApi;
    }])
'use strict';



angular.module("BossCollection.services")
    .factory('guildServices', [
        '$http', '$q', '$resource', 'siteServices', 'userLoginSrvc', 'socketProvider',
    function ($http, $q, $resource, siteServices, userLoginSrvc, socketProvider) {

        var getMembersUrl = "https://us.api.battle.net/wow/guild/Zul'jin/mkdir%20Bosscollection?fields=members,items&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d"
        var blizzardBaseUrl = "https://us.api.battle.net/wow/guild/";
        var blizzardEndingUrl = "?fields=members&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";



        var apply = $resource('/api/applicationSubmission', {}, {});
        var getApplicationsUrl = $resource('/api/getApplications', {}, {});
        var addGuild = $resource('/api/addGuild', {}, {});
        var updateRank = $resource('/api/updateRank', {}, {});
        var changeGuildName = $resource('/api/changeGuildName', {}, {});
        var addMember = $resource('/api/addMember', {}, {});
        var removeMember = $resource('/api/removeMember', {}, {});
        var getGuildMembers = $resource("/api/getGuildMembers", {}, {});
        var getListOfGuilds = $resource("/api/listOfGuilds", {}, {});
        
        
        var guildApi = { 
            
            getListOfGuilds: function(){
                var defer = $q.defer();
                
                siteServices.startLoading();
                
                getListOfGuilds.get().$promise
                    .then(function(guilds){
                         
                        defer.resolve(guilds.guilds);
                    })
                    .catch(function(err){
                        
                        defer.reject(err.data.message);
                    })
                    .finally(function(){
                        siteServices.loadingFinished();
                    }) 
                    
                return defer.promise;
            },
            updateRank: function (guildName, member) {

                var defer = $q.defer();
                
                updateRank.save(
                    {
                        guildName: guildName,
                        member: member
                    }).$promise
                    .then(function (result) {

                        defer.resolve(result.members);
                    })
                    .catch(function (err) {

                        defer.reject(err.data.message);
                    })
                    .finally(function(){
                        siteServices.loadingFinished();
                    })

                return defer.promise;
            },
            getGuildMembers: function (guildName) {

                var defer = $q.defer();
                
                siteServices.startLoading();
                
                getGuildMembers.save({ guildName: guildName }).$promise
                    .then(function (result) {

                        defer.resolve(result.members);
                    })
                    .catch(function (err) {

                        defer.reject(err.data.message);
                    })
                    .finally(function(){
                        siteServices.loadingFinished();
                    })

                return defer.promise;
            },
            createGuild: function (guildName) {
                var defer = $q.defer();
                
                
                
                addGuild.save({ guildName: guildName }).$promise
                    .then(function (result) {

                        defer.resolve(result.guild);
                    })
                    .catch(function (err) {

                        defer.reject(err.data.message);
                    })
                    .finally(function(){
                        
                    })

                return defer.promise;
            },
            joinGuild: function (guildName, memberName) {
                var defer = $q.defer();
                
                
                
                addMember.save({
                    guildName: guildName,
                    memberName: memberName
                }).$promise
                    .then(function (result) {

                        defer.resolve(result.guild);
                    })
                    .catch(function (err) {

                        defer.reject(err.data.message);
                    })
                    .finally(function(){
                        
                    })

                return defer.promise;
            },
            leaveGuild: function (guildName) {
                var defer = $q.defer();
                
                siteServices.startLoading();
                
                removeMember.save({ guildName: guildName }).$promise
                    .then(function (result) {

                        defer.resolve(result.user);
                    })
                    .catch(function (err) {

                        defer.reject(err.data.message);
                    })
                    .finally(function(){
                        siteServices.loadingFinished();
                    })

                return defer.promise;
            },
            getApplications: function () {

                var defer = $q.defer();

                siteServices.startLoading();

                getApplicationsUrl.get().$promise
                    .then(function (applications) {

                        defer.resolve(applications);
                    },
                        function (err) {

                            defer.reject(err);
                        })
                    .finally(function () {
                        siteServices.loadingFinished();
                    })

                return defer.promise;
            },
            validateCharacterName: function (characterName, realm) {

                var defer = $q.defer();
                var getCharacterUrl = "https://us.api.battle.net/wow/character/" + realm + "/" + characterName + "?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";

                var getCharacter = $resource(getCharacterUrl, {}, {});

                getCharacter.get().$promise.then(function (data) {

                    defer.resolve(data);
                },
                    function (err) {

                        defer.reject("Character not found");
                    });

                return defer.promise;
            },

            getGuild: function (realm, guildName) {
                var defer = $q.defer()

                siteServices.startLoading();

                if (realm != "" && guildName != "") {
                    var getMembersUrl = blizzardBaseUrl + encodeURIComponent(realm) + "/" + encodeURIComponent(guildName) + blizzardEndingUrl;
                }

                $http({ method: 'GET', url: getMembersUrl })
                    .then(function (data) {

                        defer.resolve(data.data.members);
                    },
                        function (err) {
                            defer.reject(err);
                        })
                    .finally(function () {
                        siteServices.loadingFinished();
                    })

                return defer.promise;
            },
            submitApplication: function (newApplicant) {
                var defer = $q.defer();

                var getCharacterUrl = "https://us.api.battle.net/wow/character/" + newApplicant.realm.name + "/" + newApplicant.character.name + "?fields=talents&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";

                var getCharacter = $resource(getCharacterUrl, {}, {});

                siteServices.startLoading();

                getCharacter.get().$promise
                    .then(function (characterWithSpec) {


                        return characterWithSpec;
                    },
                        function (err) {

                            defer.reject("Character not found");
                        })
                    .then(function (characterWithSpec) {

                        newApplicant.character.specs = characterWithSpec.talents;

                        apply.save({ "newApplicant": newApplicant }).$promise.then(function (submitted) {

                            siteServices.loadingFinished();
                            defer.resolve(submitted);
                        },
                            function (err) {

                                defer.reject(err);
                            })

                    })
                    .finally(function () {

                        siteServices.loadingFinished();
                    })
                return defer.promise;
            }
        };

        function getUsersRank(userName, guild) {

            var memberListing;

            memberListing = _.find(guild.members, { user: userName });
            return memberListing.rank;
        }
        
        
        
        return guildApi;
        
        
        
    }])
angular.module("BossCollection.services")
    .factory('realmServices', [
        '$http','$q', 'siteServices',
        function ($http, $q, siteServices) {

        var getRealmsUrl = "https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d"
        var realms = [];
        
        
        var realmApi = {             
 
            getRealms: function(){
                var defer = $q.defer(); 

                if (realms.length == 0) {

                    $http({ method: 'GET', url: getRealmsUrl }).success(function (returnedRealms) {
                        
                        siteServices.hideLoadingModal();
                        
                        realms = returnedRealms.realms;
                        defer.resolve(realms);
                        realms = realms;
                        
                    });

                }
                else {
                    siteServices.hideLoadingModal();
                    defer.resolve(realms);
                }
                
                return defer.promise; 
            } 
        };

        return realmApi;
    }])
'use strict';



angular.module("BossCollection.services")
    .factory('siteServices', ['$rootScope', '$mdBottomSheet', '$mdDialog', '$mdToast',
    function ($rootScope, $mdBottomSheet, $mdDialog, $mdToast) {
        
        var alreadyLoading = false;
        
        function startLoading(){
            
            if(alreadyLoading){
                
            }
            else{
                alreadyLoading = true;
                showLoadingModal();    
            }
            
        }
        
        function loadingFinished(){
            hideLoadingModal();
            alreadyLoading = false;
        }
        
        function updateTitle(newTitle){
            
            $rootScope.$broadcast('navbarTitle', newTitle)
        }
        
        function showLoadingBottomSheet($event){
            

                $mdBottomSheet.show({
                    templateUrl: 'logInModal',
                    controller: 'loginController',
                    targetEvent: $event,
                    escapeToClose: false
                })
            
        }
        
        function hideLoadingBottomSheet(){
            
            $mdBottomSheet.hide();
        }
        
        function hideBottomSheet(){
            
            $mdBottomSheet.hide();
        }
        
        function showMessageModal(message, title){
            $mdDialog.show(
                    $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title(title)
                        .textContent(message)
                        .ariaLabel('message popup')
                        .ok('Got it!')
                        .openFrom({
                            left: -50,
                            width: 30,
                            height: 80
                        })
                        .closeTo({
                            right: 1500
                        })
                    );
        }
        
        function showMessageToast(message){
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position("top")
                    .hideDelay(4000)
                );
        }
        
        function hideLoadingModal(){
            
            if(alreadyLoading == false){
                
            }
            else{
                alreadyLoading = false;
                $mdDialog.hide();
            }
        }
        
        function shouldWeBeLoading(){
            return alreadyLoading;
        }
        
        function showLoadingModal(){
            
            $mdDialog.show(
                {
                    templateUrl: 'loadingModal',
                    onComplete: function(){
                        
                        if(!alreadyLoading){
                            
                            $mdDialog.hide();
                        }
                    }           
                    
                }
            )
        }
        
        return {
            startLoading:startLoading,
            loadingFinished:loadingFinished,
            updateTitle:updateTitle,
            showLoadingBottomSheet:showLoadingBottomSheet,
            hideLoadingBottomSheet:hideLoadingBottomSheet,
            showMessageModal:showMessageModal,
            showMessageToast:showMessageToast,
            hideBottomSheet:hideBottomSheet,
            showLoadingModal:showLoadingModal,
            hideLoadingModal:hideLoadingModal
        }
    }])
'use strict';



angular.module("BossCollection.services")
    .factory('socketProvider', [function () {
        
        //var socket = io("http://bosscollection.net:4001");
        var socket = io("http://localhost:4001/guilds");
         
        return socket;
    }]) 
'use strict';

angular.module("BossCollection.services")
    .factory('userLoginSrvc', ['$resource', '$q', '$location', '$cookies', '$rootScope',
        'siteServices', 'socketProvider',
        function ($resource, $q, $location, $cookies, $rootScope, siteServices, socketProvider) {

            var registration = $resource('/auth/signup', {},
                {

                })

            var login = $resource('/auth/login', {}, {})
            var logout = $resource('/auth/logout', {}, {});
            var loggedIn = $resource('/auth/loggedin', {}, {});
            var updateAccount = $resource('/auth/updateAccount', {}, {});
            var getUser = $resource('/auth/currentUser', {}, {});
            var lostPassword = $resource('/auth/lost-password', {}, {}); 
            var savedUser = null;

            var accountApi = {
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
                        .then(function (result) {

                            savedUser = getUserFromCookie();
                            saveUsersRank(savedUser);

                            $rootScope.$broadcast("loggedin", { user: savedUser, loggedIn: true });
                            siteServices.hideLoadingBottomSheet();
                        },
                            function (err) {


                                defer.reject(err.data);
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
'use strict';



angular.module('BossCollection', [ 
  'BossCollection.controllers',
  'BossCollection.services',
  'BossCollection.directives',
  'BossCollection.filters',
  'BossCollection.forums',
  'BossCollection.attendance',
  'BossCollection.guild',
  'ngRoute',
  'ngResource',
  'btford.socket-io', 
  'ngCookies', 
  'ngMaterial'  
 
])
.config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider', '$mdThemingProvider',
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
/*
.factory('mySocket', ['socketFactory', function(socketFactory){
    return socketFactory();
}]). 
*/ 
'user strict'

angular.module("BossCollection.attendance", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/attendanceStatistics', {
                templateUrl: 'attendanceStats',
                controller: 'attendanceStatsCtrl as ctrl'
            })

            .when('/whosOut', {
                templateUrl: 'absenceSubmissions',
                controller: 'absenceSubmissionsController as ctrl'
            })

            .when('/auth/absence', {
                templateUrl: 'absence',
                controller: 'absenceReportController as ctrl'
            })

    }]);
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
        .when('/thread/:threadID',{
            templateUrl: 'threadComments',
            controller: 'commentsController as ctrl'
        })

    }]);
'user strict'

angular.module("BossCollection.guild", ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/auth/application', {
                templateUrl: 'application',
                controller: 'applicationController'
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

    }]);
angular.module("BossCollection.attendance")
    .controller('absenceModalController', [
        '$scope', 'absenceService', '$mdDialog', 'data',
        function($scope, absenceService, $mdDialog, data){
        
        
        
        
        $scope.init = function () {

            if (data) {

                $scope.absence = data;
                $scope.absence.date = new Date($scope.absence.date);
            }
            else {
                $scope.absence = {};
            }
        }
        
        $scope.save = function(){
            
            absenceService.saveAbsence($scope.absence)
                .then(function(response){
                    
                    $scope.close(response);
                })
                .fail(function(err){
                    
                })
                .finally(function(){
                    
                })
        }
        
        $scope.cancel = function () {

            $mdDialog.cancel();
        }

        $scope.close = function () {
            $mdDialog.hide($scope.object);
        }
        
        $scope.init();
        
    }])
'use strict';

angular.module("BossCollection.attendance")
    .factory('absenceService', ['$resource', '$q', '$location', '$cookies', '$rootScope',
        'siteServices', '$mdMedia', '$mdDialog',
        function ($resource, $q, $location, $cookies, $rootScope, siteServices, $mdMedia,$mdDialog) {

            var absence = $resource('/api/absence/absence', {}, {});
            var absenceByDate = $resource('/api/absence/absenceByDate', {}, {});
            var absenceHistoryResource = $resource('/api/absence/absenceHistory', {}, {});
            var deleteAbsenceResource = $resource('/api/absence/deleteAbsence');
            var saveAbsenceResource = $resource('/api/absence/saveAbsence');
            
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
                getAbsenceHistory: function(absenceHistory){
                    
                    var defer = $q.defer();
                    
                    siteServices.startLoading();
                    
                    absenceHistoryResource.save(absenceHistory).$promise
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
                openEditModal: function(template, locals) {
                  

                    var defer = $q.defer();
                    var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
                    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
                    
                    $mdDialog.show({
                        templateUrl: template,
                        controller: 'absenceModalController',
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
              
                },
                saveAbsence: function(absence){
                    
                    var defer = $q.defer();
                    var bodyData = {absence: absence};
                    
                    saveAbsenceResource.save(bodyData).$promise
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
                deleteAbsence: function(absence){
                    
                    var defer = $q.defer();
                    var bodyData = {absence: absence};
                    
                    deleteAbsenceResource.save(bodyData).$promise
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
angular.module("BossCollection.forums")
    .controller('dialogController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', 'data', 'userLoginSrvc',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, data, userLoginSrvc) {

            $scope.object = {};
            $scope.loading = false;
            $scope.replying = false;
            
            
            $scope.orderBy = "dateCreated"


            $scope.init = function () {

                if (data) {

                    $scope.object = data;
                }
                else {
                    $scope.object = {};
                }

                userLoginSrvc.getUser()
                    .then(function (user) {
                        $scope.user = user;
                    })
            }

            $scope.cancel = function () {

                $mdDialog.cancel();
            }
            
            $scope.orderByDateCreated = function(){
                $scope.orderBy = "dateCreated"
            }
            
            $scope.orderByDateCreatedReversed = function(){
                $scope.orderBy = "-dateCreated"
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
            
            $scope.formatDate = function (date) {
                
                var localTime  = moment.utc(date).toDate();
        
                return moment(localTime).format('dddd, MMM D hh:mm');
            }

            $scope.close = function () {
                $mdDialog.hide(self.thread);
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
            
            $scope.init();
        }]);
angular.module("BossCollection.forums")
    .controller('forumController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', '$window', '$timeout',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, $window, $timeout) {

            
            siteServices.updateTitle('Forums');
            $scope.testListCount = [];
            $scope.loading = false;
           
            
            for (var i = 0; i < 5; i++) {
                $scope.testListCount.push(i);
            }


            $scope.markdown = "";
            
            $scope.init = function(){
                
                $scope.savedForums = forumService.getForumCountsLocal();
                $scope.getForums();
            }
            
            $scope.getForums = function(){
                
                $scope.loading = true;
                return forumService.getForums()
                    .then(function(forums){
                        
                        if ($scope.savedForums == undefined) {
                            
                            $scope.savedForums = forums;
                            forumService.saveForumCounts(forums);
                        }
                        
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
                        
                        //siteServices.showMessageModal(err);
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
            
            $scope.isRead = function(forumIn, category){
                var oldForum;
                var oldCategory = _.find($scope.savedForums.categories, function(cat){
                    return cat._id == category._id;
                })
                
                if(oldCategory != undefined){
                    
                    oldForum = _.find(oldCategory.forums, function (forum) {

                        return forum._id == forumIn._id;
                    })
                }
                
                
                if(oldForum == undefined || oldForum.threadCount != forumIn.threadCount){
                    return "unread";
                }
                else{
                    return "read";
                }
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
                            
                            return forumService.deleteForum(forum);
                        }
                    })
                    .then(function(response){
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
            } 

            $scope.goToForum = function (forum) {
                
                
                $scope.updateForumViewed(forum);
                forumService.setForum(forum);
                $scope.goTo('/forum/' + forum._id);
                
            }
            
            $scope.updateForumViewed = function(forumIn){
                
                var catIndexTracker, forumIndexTracker;
                
                _.find($scope.savedForums.categories, function(cat, catIndex){
                    if(cat._id == forumIn.categoryId){
                        catIndexTracker = catIndex;
                        _.find(cat.forums, function (forum, forumIndex) {

                            if (forum._id == forumIn._id) {
                                
                                forumIndexTracker = forumIndex;
                            }
                        })
                        
                        if(forumIndexTracker == undefined){
                            cat.forums.push(forumIn);
                        }
                    }
                })
                
                $scope.savedForums.categories[catIndexTracker].forums[forumIndexTracker] = forumIn;
                
                
                forumService.saveForumCounts($scope.savedForums);
            }

            $scope.init();
        }]) 
angular.module("BossCollection.forums")
    .service('forumService', [
        '$location', '$mdDialog', '$q', '$routeParams', 'siteServices', '$mdMedia', '$rootScope', '$resource',  '$cookies',
        function ($location, $mdDialog, $q, $routeParams, siteServices, $mdMedia, $rootScope, $resource, $cookies) {

            var currentForum;

            var categoryResource = $resource('/forum/createCategory');
            var categoryEditResource = $resource('/forum/editCategory');
            var categoryDeleteResource = $resource('/forum/deleteCategory');
            var getForumsResource = $resource('/forum/getCategories');
            var deleteForumsResource = $resource('/forum/deleteForum');
            var editForumResource = $resource('/forum/editForum');
            var createNewForumResource = $resource('/forum/createForum');
            var createNewThreadResource = $resource('/forum/createThread');
            var getThreadsResource = $resource('/forum/getThreads');
            var deleteThreadResource = $resource('/forum/deleteThread');
            var editThreadResource = $resource('/forum/editThread')
            var getThreadResource = $resource('/forum/thread');
            var createCommentResource = $resource('/forum/createComment', {}, {});
            var getCommentsResource = $resource('/forum/getComments', {}, {});
            var editCommentResource = $resource('/forum/editComment', {}, {});
            var deleteCommentResource = $resource('/forum/deleteComment', {}, {});
            
            
            var forums;
            var currentForum;            
            var thread;
            
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
            
            function saveForumCounts(forums){
                
                localStorage.setItem("forums", angular.toJson(forums));
            }
            
            function getForumCountsLocal(){
                
                return angular.fromJson(localStorage.forums);
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
            
            function saveThreadCounts(threads){
                
                localStorage.setItem("threads", angular.toJson(threads));   
            }
            
            function getThreadCountsLocal(){
                
                return angular.fromJson(localStorage.threads);
            }
            
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
            
            
            function setSelectedThread(selectedThread){
                thread = selectedThread;
            }
            
            function removeSelectedThread(){
                thread = {};
            }
            
            function getSelectedThread(threadID){
                
                var defer = $q.defer();
                
                if(thread == undefined){
                    getThreadResource.save({threadID:threadID}).$promise
                        .then(function(threadData){
                            
                            defer.resolve(threadData);
                        })
                        .catch(function (err) {

                            defer.reject(err);
                        })
                        .finally(function () {

                        })
                }
                else{
                    
                    defer.resolve(thread);
                }
                
                return defer.promise;
            }
            
            //==== Comment Functions ==================
            
            function deleteComment(comment) {
                
                var defer = $q.defer();
                
                deleteCommentResource.save({comment: comment}).$promise
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

            function editComment(comment) {
                
                var defer = $q.defer();
                
                editCommentResource.save({ comment: comment }).$promise
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
                getComments:getComments,
                saveForumCounts:saveForumCounts,
                getForumCountsLocal:getForumCountsLocal,
                saveThreadCounts:saveThreadCounts,
                getThreadCountsLocal:getThreadCountsLocal,
                setSelectedThread:setSelectedThread,
                removeSelectedThread:removeSelectedThread,
                getSelectedThread:getSelectedThread
            }
        }]) 
        
      
                
    
'use strict';
/**
 *
 */
angular.module("BossCollection.attendance")
    .controller("attendanceStatsCtrl", ["$scope", '$location', 'userLoginSrvc', 'absenceService', 'siteServices', '$filter',
        function($scope, $location, userLoginSrvc, absenceService, siteServices, $filter){
        
        siteServices.updateTitle('Attendance Statistics');    
        $scope.absenceHighchartData = [];
        $scope.absenceHighchartDrillDownSeries = [];
        
        
        $scope.late = 1;
        $scope.absent = 6;
        $scope.weeksCounted = 4;
        $scope.raidsPerWeek = 3;
        $scope.startingDate = moment();
        
        $scope.init = function(){
            
            $scope.getAbsences();
            $scope.buildHighChart();
            
        }
           
        $scope.getAbsences = function () {
            $scope.currentlySelected = "All absences"
            $scope.loading = true;
            
            var absenceHistory = {
                date:$scope.startingDate, 
                weeks:$scope.weeksCounted
            }
            
            absenceService.getAbsenceHistory(absenceHistory).then(function (result) {

                $scope.loading = false;
                $scope.absences = result.absences;
                $scope.calculateAttendance();

            },
                function (err) {
                    siteServices.showMessageModal(err.message)
                    $scope.loading = false;
                    console.log(err);
                })
        }
        
        /** 
         * 
         * 
         * 
         */
        $scope.calculateAttendance = function(){
            
            //get an object of unique users in the absence list
            var listOfUsers = _.groupBy($scope.absences, "user");
            $scope.absenceHighchartData = [];
            $scope.absenceHighchartDrillDownSeries = [];
            
            _(listOfUsers).forEach(function(user) {
                
                //group the users absences by type
                var absentTypes = _.groupBy(user, "type");
                var lateCount = 0;
                var absentCount = 0;
                
                //Get the number of each type
                if(absentTypes.late){
                    lateCount = absentTypes.late.length || 0;    
                }
                if(absentTypes.absent){
                    absentCount = absentTypes.absent.length || 0;
                }
                    
                
                //Calculate total value based on weights and number of days.
                var totalAttendancePoints = ($scope.weeksCounted * $scope.raidsPerWeek) * $scope.absent;
                
                var lateWeight = $scope.late/$scope.absent * $scope.absent;
                //Get flat value by subtracting the total value minus the weighted values times the number of times they've occured a particular type. 
                var attendanceRating =  totalAttendancePoints - (lateCount * lateWeight) - (absentCount * $scope.absent);
                //Divide to get the %
                var percentAttendanceRating = attendanceRating / totalAttendancePoints;
                
                //Build the initial highchart object.
                $scope.absenceHighchartData.push({ 
                    name: user[0].user,
                    y: percentAttendanceRating * 100,
                    drilldown: user[0].user
                })
                
                var drillDownData = []
                
                //build the drilldown data.
                _(absentTypes.late).forEach(function(lateObject){
                    
                    drillDownData.push([
                        lateObject.date,
                        $scope.late
                    ])
                }) 
                    
                _(absentTypes.absent).forEach(function(absentObject){
                    
                    drillDownData.push([
                        absentObject.date,
                        $scope.absent
                    ])
                })  
                
                
                
                $scope.absenceHighchartDrillDownSeries.push({
                    name: user[0].user,
                    id: user[0].user,
                    data: drillDownData
                })
                
            }, this);
            
            $scope.buildHighChart();
        }
        
        $scope.redrawChart = function(seriesData, drilldownData){
            
            $scope.chart.series[0].setData([{
                    name: "Member",
                    colorByPoint: true,
                    data: $scope.absenceHighchartData
                }])
            
            $scope.chart.drilldown.setData({
                    series: $scope.absenceHighchartDrillDownSeries
                })
        }
        
        
        $scope.buildHighChart = function () {
            
            $scope.chart = new Highcharts.Chart({
                chart: {
                    type: 'column',
                    renderTo: 'container'
                },
                title: {
                    text: 'Member attendance rates'
                },
                subtitle: {
                    text: 'Click the columns to view dates missed.'
                },
                xAxis: {
                    type: 'category'
                },
                yAxis: {
                    title: {
                        text: 'Percent attendance'
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y:.1f}%'
                        }
                    }
                },
                series: [{
                    name: "Member",
                    colorByPoint: true,
                    data: $scope.absenceHighchartData
                }],

                drilldown: {
                    series: $scope.absenceHighchartDrillDownSeries

                }

            });
        }
        
        
        
        
        $scope.init();
 
    }])



'use strict';
/**
 *
 */
angular.module("BossCollection.attendance")
    .controller("absenceReportController", ["$scope", '$location', 'userLoginSrvc', 'absenceService', 'siteServices', '$filter', 'guildServices',
        function($scope, $location, userLoginSrvc, absenceService, siteServices, $filter, guildServices){
        
        var currentDay = moment().day();
        
        var self = this;
        
        self.showContentBool = false;
        $scope.newAbsence = {};
        $scope.absences = {};
        $scope.loading = false;
        $scope.typePicked = false;
        $scope.today = moment(); 
        $scope.dayDesired;
        $scope.currentlySelected = moment().format('dddd - Do');
        
        self.selectedUser = {};
        
        $scope.toolbar = {
            isOpen: false,
            direction: "right"
        }
        
        self.showContent = function(){
           self.showContentBool = true;
       }
        
        $scope.currentlySelected = "Today";
        $scope.isToolSetOpen = false;
        
        
             
                
        $scope.init = function(){
            
            siteServices.updateTitle('Report Absence');
            
            if($scope.user.rank < 3){
                self.selectedUser = $scope.user;
                self.showContent();  
            }
            else{
                $scope.getGuildUsers();    
            }
                
        }
        
        $scope.getGuildUsers = function(){
            
            $scope.loading = true;
            
            guildServices.getGuildMembers($scope.user.guild.name)
                .then(function(users){
                    
                    $scope.users = users;
                    self.showContent();  
                })
                .finally(function(){
                    
                    $scope.loading = false;
                })
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
         
        $scope.filterSearch = function (filterSearch) {

            return $filter('filter')($scope.users, filterSearch);
        }
         
        $scope.submitNewAbsence = function () {

            if ($scope.newAbsence.date == null) {

                siteServices.showMessageModal("Must select a date")
            }
            else if($scope.newAbsence.type == null){
                siteServices.showMessageModal("Must select a type: Late or Absent")
            }
            else { 
                
                if ($scope.user.rank < 3) {
                    
                    self.selectedUser = $scope.user.name;
                }
                else{
                    
                    $scope.newAbsence.user = self.selectedUser.user;
                }
                
                
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
    
        $scope.init();

    }])

'use strict';
/**
 *
 */
angular.module("BossCollection.attendance")
    .controller("absenceSubmissionsController", ["$scope", '$location', 'userLoginSrvc', 'absenceService', 'siteServices', '$filter',
        function($scope, $location, userLoginSrvc, absenceService, siteServices, $filter){
        
        var currentDay = moment().day();
        var self = this;
        
        self.showContentBool = false;
        self.newAbsence = {};
        self.absences = {};
        self.loading = false;
        self.typePicked = false;
        self.today = moment(); 
        self.dayDesired;
        self.currentlySelected = moment().format('dddd - Do');
        
        var ALLFUTUREABSENCES = "All Future Absences";
        var TITLE = "Upcoming Absences";
        
        /**
         * 0 = all future absences
         * 1 = specific date
         */
         self.viewing = 0;
         
        
       self.init = function(){

           
           self.getAbsences()
           
           self.toolbar = {
               isOpen: false,
               direction: "right"
           }

           self.currentlySelected = ALLFUTUREABSENCES;
           self.isToolSetOpen = false;


           siteServices.updateTitle(TITLE);   
           
       }
       
       self.showContent = function(){
           self.showContentBool = true;
       }
        
       self.updateList = function(){
           self.viewing = 1;
           self.currentlySelected = moment(self.dayDesired).format('dddd - Do');
           
           self.getAbsencesByDate();
       }
       
       self.dateHasPassed = function(absence){
           
           if(moment(absence.date).isBefore(moment())){
               return false;
           }
           else{
               return true;
           }
       }
       
       function calculateNumOfDaysUntil(dayDesired){
           var numOfDaysInWeek = 7;
           
           var nextDate = dayDesired - currentDay;
           
           if(nextDate < 0){
               
                nextDate = numOfDaysInWeek - Math.abs(nextDate);    
           }
           
           
           
           return nextDate;
       }
       
       self.formatDate = function(date){
           
           return moment.utc(date).format('dddd, MMM D');
       }

        self.getAbsences = function(){
            
            self.currentlySelected = "All absences"
            self.loading = true;
            self.viewing = 0;
            
            absenceService.getAbsences().then(function(result){
                
                self.loading = false;                
                self.absences = result.absences;
                self.showContent(); 
            }, 
            function(err){
                
                siteServices.showMessageModal(err.message)
                 
                self.loading = false;
                console.log(err);  
            })
        }
        
        self.deleteAbsence = function(absence){
            
            siteServices.confirmDelete()
                .then(function(result){
                    
                    return absenceService.deleteAbsence(absence);
                })   
                .then(function(result){
                    
                    if(self.viewing == 0){
                        self.getAbsences();
                    }
                    else{
                        self.updateList();    
                    }
                })               
                .finally(function(){
                    
                })
        }
        
        self.editAbsence = function(absence){
            
            absenceService.openEditModal('editAbsence', absence)
                .then(function(result){
                    
                    if(self.viewing == 0){
                        self.getAbsences();
                    }
                    else{
                        self.updateList();    
                    }
                    
                    
                })
        }
        
        self.getAbsencesByDate = function(){
            
            self.loading = true;
            
            absenceService.getAbsencesByDate(self.dayDesired).then(function(result){
                
                self.loading = false;
                self.absences = result.absences; 
            }, 
            function(err){
                siteServices.showMessageToast(err) 
                self.loading = false;
                console.log(err);  
            })
        }
         
        self.submitNewAbsence = function () {

            if (self.newAbsence.date == null) {

                siteServices.showMessageModal("Must select a date")
            }
            else if(self.newAbsence.type == null){
                siteServices.showMessageModal("Must select a type: Late or Absent")
            }
            else {
                
                absenceService.submitNewAbsence(self.newAbsence).then(function (result) {
                
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
        
        self.init();
    

    }])

angular.module("BossCollection.forums")
    .controller('commentsController', [
        '$scope', '$routeParams', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', 'userLoginSrvc',
        function ($scope, $routeParams, siteServices, forumService, $mdBottomSheet, $mdDialog, userLoginSrvc) {
            
            var self = this;
            
            self.threadSearch = "";
            self.orderBy = "-dateCreated";
            self.loading = false;
            
            
            $scope.comment = "";
            $scope.commentToDelete;
            
            $scope.init = function(){
                
                
                
                self.threadID = $routeParams.threadID;
                self.loading = true
                
                forumService.getSelectedThread(self.threadID)
                    .then(function(thread){
                        
                        if(thread.thread){
                            self.thread = thread.thread[0];
                            
                        }
                        else{
                            self.thread = thread;
                         
                        }
                        
                    })
                    .then(function(){
                        
                        return self.getComments();        
                    })
                    .finally(function(){
                        self.loading = false;
                    })
                
                
            }
            
            self.editThread = function(thread){

                forumService.openBottomSheet('threadEdit', thread);
            }
            
            self.getComments = function(){
                
                self.loading = true
                
                return forumService.getComments(self.threadID)
                    .then(function(comments){

                        self.thread.comments = comments.comments;
                    })
                    .finally(function(){
                        
                        self.loading = false
                    })
            }  
            
            $scope.goBack = function(){
                $scope.goTo('/forum/' + self.thread.forumID);
            }
            
            self.orderByDateCreated = function(){
                self.orderBy = "dateCreated"
            }
            
            self.orderByDateCreatedReversed = function(){
                self.orderBy = "-dateCreated"
            }
            
            $scope.cancelComment = function () {
                $scope.replying = false;
            }

            $scope.cancelCommentEdit = function (comment) {
                comment.editing = false;
            }

            $scope.saveCommentEdit = function (comment) {

                forumService.editComment(comment)
                    .then(function (savedComment) {

                        $scope.cancelCommentEdit(comment);
                    })
            }
            
            $scope.formatDate = function (date) {
                
                var localTime  = moment.utc(date).toDate();
        
                return moment(localTime).format('dddd, MMM D hh:mm a');
            }

            $scope.confirmDelete = function (comment) {

                $scope.commentToDelete = comment;
                

                forumService.confirmDelete()
                    .then(function(result){

                        if(result){
                            
                            $scope.deleteComment(comment)
                        }
                    })
                    .then(function(response){

                        $scope.refresh();
                    })
            
            }

            $scope.deleteComment = function (comment) {

                forumService.deleteComment(comment)
                    .then(function (result) {

                        self.getComments();
                    })
                    .catch(function (err) {

                    })
                    .finally(function () {
                        
                        $scope.loading = false;
                    })
            }

            $scope.saveComment = function () {

                var comment = {
                    message: self.thread.newComment,
                    threadId: self.thread._id
                }

                forumService.createComment(comment)
                    .then(function (comment) {

                        self.thread.newComment = "";
                        self.thread.comments.push(comment.comment);
                        $scope.cancelComment();
                    })
            }

            $scope.openCommentBox = function () {
                $scope.replying = true;
            }

            $scope.close = function () {
                $mdDialog.hide(self.thread);
            }
            
            $scope.init();
        }]);
angular.module("BossCollection.forums")
    .controller('threadController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', '$window', '$filter', '$timeout',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, $window, $filter, $timeout) {

            

            $scope.forum = {};
            $scope.loading = false;
            $scope.orderBy = "-dateCreated";
            $scope.masterThread = []
            
            

            $scope.getLength = function (){
                return $scope.threads.length
            }

            $scope.getItemAtIndex = function(index){
                return $scope.threads[index];
            }
            
            $scope.formatDate = function (date) {
                
                var localTime  = moment.utc(date).toDate();
        
                return moment(localTime).format('dddd, MMM D hh:mm a');
            }
             
            $scope.init = function(){  

                $scope.loading = true;
                $scope.savedThreads = forumService.getThreadCountsLocal();
                
                
                forumService.getCurrentForum()
                    .then(function(forum){
                        $scope.forum = forum;
                    })
                    .then(function(){
                        
                        siteServices.updateTitle($scope.forum.name + ' Forum');
                        
                        if($scope.forum.threads.length > 0){
                            return $scope.forum.threads
                        }
                        else{
                            return forumService.getThreads($scope.forum);    
                        }
                        
                    })
                    .then(function(threads){
                        
                        $scope.threads = threads;
                        $scope.forum.threads = threads;
                        
                        forumService.setForum($scope.forum);
                        $scope.masterThread = threads;
                        
                        if ($scope.savedThreads == undefined) {
                            
                            $scope.savedThreads = threads;
                            forumService.saveThreadCounts(threads);
                        }
                        
                        //$scope.initInfiniteScroll();
                        
                        sortThreads();
                        
                    })
                    .catch(function(err){

                        $scope.loading = false;
                    })
                    .finally(function(){

                        $scope.loading = false;
                    })
            }

            $scope.listStyle = {
                height: ($window.innerHeight - 312) + 'px'
            };

           $scope.initInfiniteScroll = function(){
               
               $scope.threadRepeat = {
                            toLoad:0,
                            numLoaded: 0,
                            threads: $scope.threads,
                            getItemAtIndex: function (index) {
                                
                                if(index > this.numLoaded && index < $scope.threads.length){
                                    this.fetchMoreThreads(index);
                                    return null;
                                }

                                if(index < $scope.threads.length){
                                    return $scope.threads[index];    
                                }
                                
                            },
                            getLength: function () {
                                if($scope.threads.length == 0){
                                    return 0;
                                }
                                else{
                                    return this.numLoaded + 1;    
                                }
                                
                            },
                            fetchMoreThreads: function (index) {

                                if (this.toLoad < index) {
                                    this.toLoad += 20;

                                    this.numLoaded = this.toLoad;
                                    
                                    if(this.numLoaded > $scope.threads.length){
                                        this.numLoaded = $scope.threads.length - 1;
                                    }

                                }
                            }
                        }
               
           }

            $scope.refresh = function(){

                $scope.loading = true;

                forumService.getThreads($scope.forum)
                    .then(function(threads){

                        $scope.loading = false;
                        $scope.threads = threads;
                        $scope.masterThread = threads;
                        sortThreads();
                    })
                    .catch(function(err){

                        $scope.loading = false;
                    })
            }

            $scope.deleteThread = function(thread){

                forumService.confirmDelete()
                    .then(function(result){

                        if(result){
                            
                            return forumService.deleteThread(thread);
                        }
                    })
                    .then(function(response){

                        $scope.refresh();
                    })
            }
            
            $scope.$watch('threadSearch', function(){
                
                sortThreads();
                
            })
            
            $scope.$watch('orderBy', function(){
                
                sortThreads();
                
            })
            
            function sortThreads(){
                
                $scope.threads = $filter('filter')($scope.masterThread, $scope.threadSearch);
                $scope.threads = $filter('orderBy')($scope.threads, $scope.orderBy);
                
                if($scope.threadRepeat){
                    $scope.threadRepeat.numLoaded = $scope.threads.length - 1;    
                }
            }

            $scope.orderByDateCreated = function(){
                $scope.orderBy = "dateCreated"
            }

            $scope.orderByDateCreatedReversed = function(){
                $scope.orderBy = "-dateCreated"
            }

            $scope.openThread = function(thread){
                
                forumService.setSelectedThread(thread);
                $scope.updateThreadViewed(thread);
                
                $scope.goTo('/thread/' + thread._id);
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
                $scope.goTo('/forum');
            } 
            
            $scope.isRead = function (threadIn) {
                
                
                var oldThread = _.find($scope.savedThreads, function (thread) {
                    return thread._id == threadIn._id;
                })


                if (oldThread == undefined || oldThread.commentCount != threadIn.commentCount) {
                    return "unread";
                }
                else {
                    return "read";
                }
            }
            
            $scope.updateThreadViewed = function(threadIn){
                
                var threadIndexTracker;
                        
                _.find($scope.savedThreads, function (thread, threadIndex) {

                    if (thread._id == threadIn._id) {
                        threadIndexTracker == threadIndex;
                        $scope.savedThreads[threadIndex] = threadIn;
                    }
                })
                
                if($scope.savedThreads.length == 0 || threadIndexTracker == undefined){
                    $scope.savedThreads.push(threadIn);
                }
                
                
                forumService.saveThreadCounts($scope.savedThreads);
            }
            
            $scope.init();
        }])
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

'use strict';
/**
 
 *

 */
angular.module("BossCollection.guild")
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
                    
                    
                    convertClasses();
                },
                function(err){
                    
                    $scope.loading = false;
                    console.log(err);
                    siteServices.showMessageToast("Seems something broke. Try again in a few... Make sure you're logged in and a part of a guild.");
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
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.guild")
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
angular.module("BossCollection.guild")
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
angular.module("BossCollection.guild")
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
            
            $scope.showContent();
    }])
 
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

'use strict';
angular.module("BossCollection.controllers")    
    .controller("rosterController", ["$scope",  'filterFilter', 'guildServices', '$http', '$cookies', '$location', 'siteServices',
        function($scope, filterFilter, guildServices, $http, $cookies, $location, siteServices){
            
            
            
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
                    console.log(err);
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
    .controller("editAccountController", ["$scope", '$location', '$http', 'userLoginSrvc', 'siteServices', 'guildServices',
        function ($scope, $location, $http, userLoginSrvc, siteServices, guildServices) {

            siteServices.updateTitle('Account');

            $scope.leaveGuild = function () {

                var guildName = $scope.user.guild.name;

                siteServices.confirmDelete()
                    .then(function (result) {
                        guildServices.leaveGuild(guildName)
                            .then(function (user) {

                                $scope.user = userLoginSrvc.updateUser();
                            })
                    })
                
                 
            }

            $scope.updateAccount = function () {

                
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

'use strict'
angular.module("BossCollection.controllers")
    .controller("strategyRoomController", ['$scope',
                function($scope){
    
    
    
    }])
'use strict'
angular.module("BossCollection.controllers")    
    .controller("bossStrategyController", ['$scope', 'bossStrats', '$routeParams',
            function($scope, bossStrats, routeParams){

                
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
    .controller("bossStrategyController", ['$scope', 'bossStrats', '$modal', '$routeParams',
            function($scope, bossStrats, $modal,  routeParams){

              
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
  directive('ad', ['$timeout', function ($timeout) {
        return {
            restrict: 'E',
            template: '<ins class="adsbygoogle"style="display:block;overflow:hidden;"data-ad-client="ca-pub-4895481554192451"data-ad-slot="1814022675"data-ad-format="auto">',
 
            link: function (scope, elm, attrs) {
                
                $timeout(function () {
                    try {
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    }
                    catch (err) {
                        
                        //console.log(err);

                    }
                }, 2000)
                  
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
 
angular.module("BossCollection.directives")
    .directive('myEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if (event.which === 13) {
                    scope.$apply(function () {
                        scope.$eval(attrs.myEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    });  
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
                
                scope.$watch('markdown', function(){
                    scope.converToHtml(scope.markdown);
                })
                
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
    .factory('bossStrats', ['$resource', '$q', function ($resource, $q) {
        
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
        '$http', '$q', '$resource', 'siteServices', 'userLoginSrvc', 
    function ($http, $q, $resource, siteServices, userLoginSrvc) {

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
    .factory('siteServices', ['$rootScope', '$mdBottomSheet', '$mdDialog', '$mdToast', '$q',
    function ($rootScope, $mdBottomSheet, $mdDialog, $mdToast, $q) {
        
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
            hideLoadingModal:hideLoadingModal,
            confirmDelete:confirmDelete
        }
    }])
'use strict';



angular.module("BossCollection.services")
    .factory('socketProvider', [function () {
        
        //var socket = io("http://bosscollection.net:4001");
        //var socket = io("http://localhost:4001/guilds");
         
        //return socket;
    }]) 
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
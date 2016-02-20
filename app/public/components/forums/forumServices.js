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
            var editCommentResource = $resource('/forum/editComment', {}, {});
            var deleteCommentResource = $resource('/forum/deleteComment', {}, {});
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
                getComments:getComments
            }
        }]) 
        
      
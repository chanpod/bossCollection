angular.module("BossCollection.forums")
    .service('forumService', [
        '$location', '$mdDialog', '$q', '$routeParams', 'siteServices', '$mdMedia', '$rootScope',
        function ($location, $mdDialog, $q, $routeParams, siteServices, $mdMedia, $rootScope) {

            var currentForum = {};
            
            
            var forums = {               
                
                    "categories": [
                        {
                            "name": "Strategy",
                            "forums": [
                                {
                                    "name": "HM",
                                    "threads": [
                                        {
                                            title: "Test Title",
                                            user: "tester",
                                            comments: [
                                                {
                                                    user: "chanpod",                                                    
                                                    message: "I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long." 
                                                },
                                                {
                                                    user: "test",                                                    
                                                    message: "I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long." 
                                                },
                                                {
                                                    user: "tester",                                                    
                                                    message: "I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long. I'm leaving a message for this thread. It will be very long." 
                                                }
                                            ],
                                            message: "I created a thread!",
                                        },
                                        {
                                            title: "Test Title",
                                            user: "test",
                                            comments: [],
                                            message: "I created a thread!",
                                        },
                                        {
                                            title: "Test Title",
                                            user: "test2",
                                            comments: [],
                                            message: "I created a thread!",
                                        }
                                    ]
                                },
                                {
                                    "name": "BRF",
                                    "threads": [
                                        {
                                            title: "Test",
                                            user: "Tester",
                                            comments: [],
                                            message: "I created a thread!",
                                        },
                                        {
                                            title: "Test",
                                            user: "Tester",
                                            comments: [],
                                            message: "I created a thread!",
                                        },
                                        {
                                            title: "Test",
                                            user: "Tester",
                                            comments: [],
                                            message: "I created a thread!",
                                        }
                                    ]
                                },
                                {
                                    "name": "HFC",
                                    "threads": [
                                        {
                                            title: "Test",
                                            user: "Tester",
                                            comments: [],
                                            message: "I created a thread!",
                                        },
                                        {
                                            title: "Test",
                                            user: "Tester",
                                            comments: [],
                                            message: "I created a thread!",
                                        },
                                        {
                                            title: "Test",
                                            user: "Tester",
                                            comments: [],
                                            message: "I created a thread!",
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "name": "General",
                            "forums": [
                                {
                                    "name": "Whatever"
                                },
                                {
                                    "name": "Real Life"
                                },
                                {
                                    "name": "Other Games"
                                }
                            ]
                        }
                    ]
            }

            function setForum(selectedforum) {
                currentForum = selectedforum;
            }
            
            function getSelectedForum(){
                var defer = $q.defer();
                
                if(currentForum){
                    defer.resolve(currentForum);
                }
                else{
                    
                    defer.resolve(forums.categories[0].forums[0]);
                }
                
                return defer.promise;
            }

            function getThreads(thread) {

            }
            
            function deleteThread(thread){
                
            }
            
            function editThread(thread){
                
            }
            
            function createThread(thread){
                
            }
            
            function deleteComment(comment){
                
            }
            
            function editComment(comment){
                
            }
            
            function createComment(comment){
                
            }

            function deleteCategory(category) {

            }

            function createNewCategory(category) {

                var defer = $q.defer();

                defer.resolve(category);

                return defer.promise;
            }
            
            function getForums(){
                
                var defer = $q.defer();

                defer.resolve(forums);

                return defer.promise;
            }

            function editCategory(category) {

                var defer = $q.defer();

                defer.resolve(category);

                return defer.promise;
            }

            function deleteForum(forum) {

                var defer = $q.defer();

                defer.resolve(forum);

                return defer.promise;
            }

            function createNewForum(forum) {

                var defer = $q.defer();

                defer.resolve(forum);

                return defer.promise;
            }

            function editForum(forum) {

                var defer = $q.defer();

                defer.resolve(forum);

                return defer.promise;
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
                editForum:editForum,
                createNewForum:createNewForum,
                deleteForum:deleteForum,
                cancel: cancel,
                getForums: getForums,
                getThreads:getThreads,
                getCurrentForum:getSelectedForum,
                deleteThread:deleteThread,
                editThread:editThread,
                createThread:createThread,
                deleteComment:deleteComment,
                editComment:editComment,
                createComment:createComment,
            }
        }]) 
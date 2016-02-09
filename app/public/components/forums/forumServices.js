angular.module("BossCollection.forums")
    .service('forumService', [
        '$location', '$mdDialog', '$q', 'siteServices',
        function ($location, $mdDialog, $q, siteServices) {

            var currentForum = {};
            var forums = {               
                
                    "categories": [
                        {
                            "name": "Strategy",
                            "forums": [
                                {
                                    "name": "HM"
                                },
                                {
                                    "name": "BRF"
                                },
                                {
                                    "name": "HFC"
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

            function setForum(forum) {
                currentForum = forum;
            }

            function getThread(thread) {

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
                var localCopy = angular.copy(locals);
                
                $mdDialog.show({
                    templateUrl: template,
                    controller: 'dialogController',
                    parent: angular.element(document.body),
                    clickOutsideToClose: false,
                    locals: { data: localCopy }
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
                getForums: getForums
            }
        }]) 
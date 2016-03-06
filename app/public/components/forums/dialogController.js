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
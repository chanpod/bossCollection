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
            
            $scope.deleteCategory = function(){
                
                forumService.deleteCategory($scope.object)
                    .then(function(result){
                        
                        $scope.close(result);
                    })
            }
            
            $scope.deleteForum = function(){
                
                forumService.deleteForum($scope.object)
                    .then(function(result){
                        
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

                var thread = {
                    name: $scope.object.name,
                    forumId: $scope.object.forum._id,
                    message: $scope.object.message
                }

                forumService.createThread(thread)
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

            $scope.saveForum = function () {

                $scope.loading = true;

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
        }]);
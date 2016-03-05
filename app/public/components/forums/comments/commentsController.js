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
            
            $scope.orderByDateCreated = function(){
                $scope.orderBy = "dateCreated"
            }
            
            $scope.orderByDateCreatedReversed = function(){
                $scope.orderBy = "-dateCreated"
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

            $scope.confirmDelete = function (comment) {

                $scope.commentToDelete = comment;
                $scope.confirmDeleteBool = true;
            }

            $scope.deleteComment = function () {

                forumService.deleteComment($scope.commentToDelete)
                    .then(function (result) {

                        self.getComments();
                    })
                    .catch(function (err) {

                    })
                    .finally(function () {
                        $scope.loading = false;
                        $scope.confirmDeleteBool = false;
                    })
            }

            $scope.cancelCommentDelete = function () {

                $scope.commentToDelete = {};
                $scope.confirmDeleteBool = false;
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
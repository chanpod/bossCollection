angular.module("BossCollection.forums")
    .controller('commentsController', [
        '$scope', '$routeParams', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', 'userLoginSrvc',
        function ($scope, $routeParams, siteServices, forumService, $mdBottomSheet, $mdDialog, userLoginSrvc) {
            
            var self = this;
            
            self.threadSearch = "";
            self.orderBy = "-dateCreated";
            self.orderByString = 'Newest';
            self.loading = false;
            
            
            $scope.comment = "";
            $scope.commentToDelete;
            
            $scope.init = function(){
                
                
                self.isComingFromFavorites = forumService.getIsComingFromFavorites();
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
            
            $scope.goBack = function () {
                
                if (forumService.getIsComingFromFavorites()) {
                    forumService.setIsComingFromFavorites(false);
                    $scope.goToBackwards('/forum/favorites');
                } else{
                    $scope.goToBackwards('/forum/' + self.thread.forumID);    
                }
                
            }
            
            self.flipOrderBySorting = function(){
                
                if(self.orderBy == "dateCreated"){
                    
                    self.orderByString = 'Newest';
                    self.orderBy = "-dateCreated";    
                }
                else{
                    self.orderByString = 'Oldest';
                    self.orderBy = "dateCreated";    
                }
                
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
                
                $scope.loading = true;
                
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
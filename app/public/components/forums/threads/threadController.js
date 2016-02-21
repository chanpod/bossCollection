angular.module("BossCollection.forums")
    .controller('threadController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog) {
            
            console.log("Thread Controller Loaded");
            
            $scope.forum = {};
            $scope.loading = false;
            $scope.orderBy = "dateCreated";
            
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
            
            $scope.orderByDateCreated = function(){
                $scope.orderBy = "dateCreated"
            }
            
            $scope.orderByDateCreatedReversed = function(){
                $scope.orderBy = "-dateCreated"
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
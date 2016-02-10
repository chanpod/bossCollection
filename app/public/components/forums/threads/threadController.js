angular.module("BossCollection.forums")
    .controller('threadController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog) {
            
            console.log("Thread Controller Loaded");
            
            $scope.forum = {};
            $scope.loading = false;
            
            $scope.init = function(){
                
                
                
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
            }  
            
            $scope.openThread = function(thread){
                
                forumService.openBottomSheet('threadComments', thread);
            }
            
            $scope.goBack = function(){
                window.history.back();
            }
            
            $scope.init();
        }])
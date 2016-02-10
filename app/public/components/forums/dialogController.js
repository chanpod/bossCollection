angular.module("BossCollection.forums")
    .controller('dialogController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', 'data',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, data) {

            $scope.object = {};
            $scope.loading = false;
            $scope.replying = false;
            $scope.comment = "";
            
            if(data){
                
                $scope.object = data; 
            }
            else{
                $scope.object = {};
            }
            
            
            
            
            $scope.cancel = function () {

                $mdDialog.cancel();
            }
            
            $scope.cancelComment = function(){
                $scope.replying = false;
            }
            
            $scope.saveComment = function(){
                
                forumService.saveComment()
                    .then(function(){
                        
                        $scope.comment = "";
                    })
            }
            
            $scope.openCommentBox = function(){
                $scope.replying = true;
            }
            
            $scope.close = function(){
                $mdDialog.hide($scope.object);
            }

            $scope.saveCategory = function () {

                $scope.loading = false;

                forumService.createNewCategory({name: $scope.object.name})
                    .then(function (result) {
                        
                        $scope.close(result);
                    })
                    .catch(function (err) {

                    })
                    .finally(function () {
                        $scope.loading = false;
                    })
            }
            
            $scope.saveThread = function(){
                
                forumService.createNewThread()
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
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

                forumService.createNewCategory()
                    .then(function (result) {

                        $scope.close();
                    })
                    .catch(function (err) {

                    })
                    .finally(function () {
                        $scope.loading = false;
                    })
            }

            $scope.saveForum = function () {
                
                $scope.loading = false;

                forumService.createNewForum()
                    .then(function () {

                        $scope.close();
                    })
                    .catch(function (err) {

                    })
                    .finally(function () {
                        $scope.loading = false;
                    })
            }
        }]);
angular.module("BossCollection.forums")
    .controller('forumController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', '$window',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, $window) {

            console.log("Forum Controller loaded");
            siteServices.updateTitle('Forums');
            $scope.testListCount = [];
            $scope.loading = false;
            
            
            for (var i = 0; i < 5; i++) {
                $scope.testListCount.push(i);
            }


            $scope.markdown = "";
            
            $scope.init = function(){
                
                $scope.getForums();
            }
            
            $scope.getForums = function(){
                
                $scope.loading = true;
                return forumService.getForums()
                    .then(function(forums){
                        
                        $scope.loading = false;  
                        $scope.forums = forums;
                    })
                    .catch(function(err){
                        
                        $scope.loading = false;
                        console.log(err);
                    })
            }
            
            $scope.newCategory = function () {

                $scope.category = {};
                
                forumService.openBottomSheet('category')
                    .then(function(result){
                        
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
                    .then(function(){
                        
                        //Category created. 
                        forumService.cancel();
                    })
                    .catch(function(err){
                        
                        siteServices.showMessageModal(err);
                    })
            }

            $scope.editCategory = function (category) {

                //$scope.category = category;
                
                forumService.openBottomSheet('category', category)
                    .then(function(result){
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
                    .catch(function(err){
                        //Didn't save
                    })
            } 

            $scope.deleteCategory = function (category) {

                forumService.confirmDelete()
                    .then(function(result){
                        
                        if(result){
                            console.log("Deleting the category")
                            return forumService.deleteCategory(category);
                        }
                    })
                    .then(function(response){
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
            }
            
            $scope.createForum = function (category) {
                
                var categoryId = category._id;
                
                forumService.openBottomSheet('forumEdit', {object: {categoryId: categoryId}})
                    .then(function(result){
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
                    .catch(function(err){
                        //Didn't save
                    })
                
            }

            $scope.editForum = function(forum){
                
                forumService.openBottomSheet('category', { object: forum })
                    .then(function (result) {
                        
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
            }
            
            $scope.deleteForum = function(forum){
                
                 forumService.confirmDelete()
                    .then(function(result){
                        
                        if(result){
                            console.log("Deleting the forum")
                            return forumService.deleteForum(forum);
                        }
                    })
                    .then(function(response){
                        forumService.removeLocalForums();
                        $scope.getForums();
                    })
            }

            $scope.goToForum = function (forum) {

                forumService.setForum(forum);
                $location.url('/forum/' + forum._id)
            }


            $scope.init();
        }]) 
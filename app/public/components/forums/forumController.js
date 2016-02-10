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
                
                forumService.openBottomSheet('category', {object: category})
                    .then(function(result){
                        
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
                            forumService.deleteCategory(category);
                        }
                    })
            }
            
            $scope.createForum = function (category) {
                
                var categoryId = category._id;
                
                forumService.openBottomSheet('forumEdit', {object: {categoryId: categoryId}});
                
            }

            $scope.editForum = function(forum){
                
                forumService.openBottomSheet('category', { object: forum })
                    .then(function (result) {

                        console.log(result);
                    })
            }
            
            $scope.deleteForum = function(forum){
                
                 forumService.confirmDelete()
                    .then(function(result){
                        
                        if(result){
                            console.log("Deleting the forum")
                            forumService.deleteForum(forum);
                        }
                    })
            }

            $scope.goToForum = function (forum) {

                forumService.setForum(forum);
                $location.url('/forum/' + forum._id)
            }


            $scope.init();
        }]) 
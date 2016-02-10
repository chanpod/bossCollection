angular.module("BossCollection.forums")
    .controller('forumController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', '$window',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, $window) {

            console.log("Forum Controller loaded");
            siteServices.updateTitle('Forums');
            $scope.testListCount = [];
            
            
            
            for (var i = 0; i < 5; i++) {
                $scope.testListCount.push(i);
            }


            $scope.markdown = "";
            
            $scope.init = function(){
                
                forumService.getForums()
                    .then(function(forums){
                        
                        $scope.forums = forums;
                    })
            }
            
            $scope.newCategory = function () {

                $scope.category = {};
                forumService.openBottomSheet('category');
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
            
            $scope.createForum = function () {
                
                forumService.openBottomSheet('forumEdit');
                
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
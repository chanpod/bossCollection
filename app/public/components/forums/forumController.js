angular.module("BossCollection.forums")
    .controller('forumController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', '$window', '$timeout',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, $window, $timeout) {

            console.log("Forum Controller loaded");
            siteServices.updateTitle('Forums');
            $scope.testListCount = [];
            $scope.loading = false;
           
            
            for (var i = 0; i < 5; i++) {
                $scope.testListCount.push(i);
            }


            $scope.markdown = "";
            
            $scope.init = function(){
                
                $scope.savedForums = forumService.getForumCountsLocal();
                $scope.getForums();
            }
            
            $scope.getForums = function(){
                
                $scope.loading = true;
                return forumService.getForums()
                    .then(function(forums){
                        
                        if ($scope.savedForums == undefined) {
                            
                            $scope.savedForums = forums;
                            forumService.saveForumCounts(forums);
                        }
                        
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
                        
                        //siteServices.showMessageModal(err);
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
            
            $scope.isRead = function(forumIn, category){
                var oldForum;
                var oldCategory = _.find($scope.savedForums.categories, function(cat){
                    return cat._id == category._id;
                })
                
                if(oldCategory != undefined){
                    
                    oldForum = _.find(oldCategory.forums, function (forum) {

                        return forum._id == forumIn._id;
                    })
                }
                
                
                if(oldForum == undefined || oldForum.threadCount != forumIn.threadCount){
                    return "unread";
                }
                else{
                    return "read";
                }
            }
            
            $scope.editForum = function(forum){
                
                forumService.openBottomSheet('forumEdit', forum)
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
                
                
                $scope.updateForumViewed(forum);
                forumService.setForum(forum);
                $scope.goTo('/forum/' + forum._id);
                
            }
            
            $scope.updateForumViewed = function(forumIn){
                
                var catIndexTracker, forumIndexTracker;
                
                _.find($scope.savedForums.categories, function(cat, catIndex){
                    if(cat._id == forumIn.categoryId){
                        catIndexTracker = catIndex;
                        _.find(cat.forums, function (forum, forumIndex) {

                            if (forum._id == forumIn._id) {
                                
                                forumIndexTracker = forumIndex;
                            }
                        })
                        
                        if(cat.forums.length == 0){
                            cat.forums.push(forumIn);
                        }
                    }
                })
                
                $scope.savedForums.categories[catIndexTracker].forums[forumIndexTracker] = forumIn;
                
                
                forumService.saveForumCounts($scope.savedForums);
            }

            $scope.init();
        }]) 
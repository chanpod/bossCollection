angular.module("BossCollection.forums")
    .controller('threadController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', '$window', '$filter', '$timeout',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, $window, $filter, $timeout) {

            

            $scope.forum = {};
            $scope.loading = false;
            $scope.orderBy = "-dateCreated";
            $scope.orderByString = 'Newest';
            $scope.masterThread = []
            $scope.sticky = 'true';
            

            $scope.getLength = function (){
                return $scope.threads.length
            }

            $scope.getItemAtIndex = function(index){
                return $scope.threads[index];
            }
            
            $scope.formatDate = function (date) {
                
                var localTime  = moment.utc(date).toDate();
        
                return moment(localTime).format('dddd, MMM D hh:mm a');
            }
             
            $scope.init = function(){  

                $scope.loading = true;
                $scope.savedThreads = forumService.getThreadCountsLocal();
                
                
                forumService.getCurrentForum()
                    .then(function(forum){
                        $scope.forum = forum;
                    })
                    .then(function(){
                        
                        siteServices.updateTitle($scope.forum.name + ' Forum');
                        
                        if($scope.forum.threads.length > 0){
                            return $scope.forum.threads
                        }
                        else{
                            return forumService.getThreads($scope.forum);    
                        }
                        
                    })
                    .then(function(threads){
                        
                        $scope.threads = threads;
                        $scope.forum.threads = threads;
                        
                        forumService.setForum($scope.forum);
                        $scope.masterThread = threads;
                        
                        if ($scope.savedThreads == undefined) {
                            
                            $scope.savedThreads = threads;
                            forumService.saveThreadCounts(threads);
                        }
                        
                        //$scope.initInfiniteScroll();
                        
                        $scope.sortThreads();
                        
                    })
                    .catch(function(err){

                        $scope.loading = false;
                    })
                    .finally(function(){

                        $scope.loading = false;
                    })
            }

            $scope.getStickyThreads = function () {                
                
            }            

            $scope.listStyle = {
                height: ($window.innerHeight - 312) + 'px'
            };

           $scope.initInfiniteScroll = function(){
               
               $scope.threadRepeat = {
                            toLoad:0,
                            numLoaded: 0,
                            threads: $scope.threads,
                            getItemAtIndex: function (index) {
                                
                                if(index > this.numLoaded && index < $scope.threads.length){
                                    this.fetchMoreThreads(index);
                                    return null;
                                }

                                if(index < $scope.threads.length){
                                    return $scope.threads[index];    
                                }
                                
                            },
                            getLength: function () {
                                if($scope.threads.length == 0){
                                    return 0;
                                }
                                else{
                                    return this.numLoaded + 1;    
                                }
                                
                            },
                            fetchMoreThreads: function (index) {

                                if (this.toLoad < index) {
                                    this.toLoad += 20;

                                    this.numLoaded = this.toLoad;
                                    
                                    if(this.numLoaded > $scope.threads.length){
                                        this.numLoaded = $scope.threads.length - 1;
                                    }

                                }
                            }
                        }
               
           }

            $scope.refresh = function(){

                $scope.loading = true;

                forumService.getThreads($scope.forum)
                    .then(function(threads){

                        $scope.loading = false;
                        $scope.threads = threads;
                        
                        $scope.forum.threads = $scope.threads
                        forumService.setForum($scope.forum);
                        
                        $scope.masterThread = threads;
                        $scope.sortThreads();
                    })
                    .catch(function(err){

                        $scope.loading = false;
                    })
            }

            $scope.deleteThread = function(thread){

                forumService.confirmDelete()
                    .then(function(result){

                        if(result){
                            
                            return forumService.deleteThread(thread);
                        }
                    })
                    .then(function(response){

                        $scope.refresh();
                    })
            }
            
            $scope.$watch('threadSearch', function(){
                
                $scope.sortThreads();
                
            })            
            
            
            $scope.sortThreads = function(){
                
                
                $scope.stickyThreads = _.filter($scope.masterThread, function (thread) {
                    return thread.sticky == true;
                })

                $scope.threads = _.filter($scope.masterThread, function (thread) {
                    return thread.sticky != true;
                })

                $scope.threads = $filter('filter')($scope.threads, $scope.threadSearch);
                
                $scope.stickyThreads = $filter('orderBy')($scope.stickyThreads, [$scope.orderBy]); 
                $scope.threads = $filter('orderBy')($scope.threads, [ $scope.orderBy]);                
                
            }

            $scope.flipOrderBySorting = function(){
                
                if($scope.orderBy == "dateCreated"){
                    
                    $scope.orderByString = 'Newest';
                    $scope.orderBy = "-dateCreated"    
                }
                else{
                    $scope.orderByString = 'Oldest';
                    $scope.orderBy = "dateCreated"    
                }
                
            }

            $scope.orderByDateCreatedReversed = function(){
                $scope.orderByString = 'Oldest';
                $scope.orderBy = "-dateCreated"
            }

            $scope.openThread = function(thread){
                
                forumService.setSelectedThread(thread);
                forumService.setIsComingFromFavorites(false);
                $scope.updateThreadViewed(thread);
                
                $scope.goTo('/thread/' + thread._id);
            }

            $scope.stickyThread = function (thread) {
                
                if (thread.sticky) {
                    
                    thread.sticky = !thread.sticky;
                }
                else {
                    thread.sticky = true;
                }

                $scope.saveThread(thread);
            }    

            $scope.isFavorite = function (thread) {

                var doesExist = _.find(thread.favorites, function (username) {
                    return $scope.user.name == username;
                })  

                if (doesExist != undefined) {
                    return true;
                }
                else {
                    return false;
                }
            }

            $scope.favoriteThread = function (thread) {

                var doesExist = $scope.isFavorite(thread);
                
                if (doesExist == false) {

                    if (thread.favorites == undefined) {
                        thread.favorites = [];
                    }
                    
                    thread.favorites.push($scope.user.name);
                }
                else {

                    _.remove(thread.favorites, function (favorite) {
                        return favorite == $scope.user.name;
                    })
                }
                
                $scope.saveThread(thread);
            }     

            $scope.saveThread = function (thread) {
                
                $scope.loading = false;
                
                forumService.editThread(thread)
                    .then(function (response) {

                        
                    })
                    .catch(function (err) {

                    })
                    .finally(function () {
                        $scope.loading = false;
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
                $scope.goToBackwards('/forum');
            } 
            
            $scope.isRead = function (threadIn) {
                
                
                var oldThread = _.find($scope.savedThreads, function (thread) {
                    return thread._id == threadIn._id;
                })


                if (oldThread == undefined || oldThread.commentCount != threadIn.commentCount) {
                    return "unread";
                }
                else {
                    return "read";
                }
            }
            
            $scope.updateThreadViewed = function(threadIn){
                
                var threadIndexTracker;
                        
                _.find($scope.savedThreads, function (thread, threadIndex) {

                    if (thread._id == threadIn._id) {
                        threadIndexTracker == threadIndex;
                        $scope.savedThreads[threadIndex] = threadIn;
                    }
                })
                
                if($scope.savedThreads.length == 0 || threadIndexTracker == undefined){
                    $scope.savedThreads.push(threadIn);
                }
                
                
                forumService.saveThreadCounts($scope.savedThreads);
            }
            
            $scope.init();
        }])
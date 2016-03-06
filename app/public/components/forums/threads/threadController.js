angular.module("BossCollection.forums")
    .controller('threadController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', '$window', '$filter', '$timeout',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, $window, $filter, $timeout) {

            

            $scope.forum = {};
            $scope.loading = false;
            $scope.orderBy = "-dateCreated";
            $scope.masterThread = []
            
            

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
                        return forumService.getThreads($scope.forum);
                    })
                    .then(function(threads){
                        //$scope.threads = threads;
                        $scope.threads = threads;
                        $scope.masterThread = threads;
                        
                        if ($scope.savedThreads == undefined) {
                            
                            $scope.savedThreads = threads;
                            forumService.saveThreadCounts(threads);
                        }
                        
                        
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
                        
                        sortThreads();
                        
                    })
                    .catch(function(err){

                        $scope.loading = false;
                    })
                    .finally(function(){

                        $scope.loading = false;
                    })
            }

            $scope.listStyle = {
                height: ($window.innerHeight - 312) + 'px'
            };

           

            $scope.refresh = function(){

                $scope.loading = true;

                forumService.getThreads($scope.forum)
                    .then(function(threads){

                        $scope.loading = false;
                        $scope.threads = threads;
                        $scope.masterThread = threads;
                        sortThreads();
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
                
                sortThreads();
                
            })
            
            $scope.$watch('orderBy', function(){
                
                sortThreads();
                
            })
            
            function sortThreads(){
                $scope.threads = $filter('filter')($scope.masterThread, $scope.threadSearch);
                $scope.threads = $filter('orderBy')($scope.threads, $scope.orderBy);
                
                if($scope.threadRepeat){
                    $scope.threadRepeat.numLoaded = $scope.threads.length - 1;    
                }
                
                
            }

            $scope.orderByDateCreated = function(){
                $scope.orderBy = "dateCreated"
            }

            $scope.orderByDateCreatedReversed = function(){
                $scope.orderBy = "-dateCreated"
            }

            $scope.openThread = function(thread){
                
                forumService.setSelectedThread(thread);
                $scope.goTo('/thread/' + thread._id);
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
                $scope.goTo('/forum');
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


angular.module("BossCollection.forums")
	.controller('favoritesController', [
		'$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', '$window', '$filter', '$timeout',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, $window, $filter, $timeout) {

			var self = this;      
 
            self.favorites = {};
            self.loading = false;
            self.orderBy = "-dateCreated"; 
            self.orderByString = 'Newest'; 
            self.masterThread = [] 
            siteServices.updateTitle('Favorites');
             

            self.getLength = function (){ 
                return self.threads.length
            }

            self.getItemAtIndex = function(index){
                return self.threads[index];
            }   
             
            self.formatDate = function (date) {
                
                var localTime  = moment.utc(date).toDate();
        
                return moment(localTime).format('dddd, MMM D hh:mm a');
            }
              
            self.init = function(){   

                self.loading = true;
                self.savedThreads = forumService.getThreadCountsLocal();
                
                
                forumService.getFavorites()
                    .then(function(favorites){
                        self.favorites = favorites;
                    })                    
                    .then(function(threads){
                        
                        sortFavorites();
                        
                    })
                    .catch(function(err){

                        self.loading = false;
                    })
                    .finally(function(){

                        self.loading = false;
                    })
            }

            self.listStyle = {
                height: ($window.innerHeight - 312) + 'px'
            };

           self.initInfiniteScroll = function(){
               
               self.threadRepeat = {
                            toLoad:0,
                            numLoaded: 0,
                            threads: self.threads,
                            getItemAtIndex: function (index) {
                                
                                if(index > this.numLoaded && index < self.threads.length){
                                    this.fetchMoreThreads(index);
                                    return null;
                                }

                                if(index < self.threads.length){
                                    return self.threads[index];    
                                }
                                
                            },
                            getLength: function () {
                                if(self.threads.length == 0){
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
                                    
                                    if(this.numLoaded > self.threads.length){
                                        this.numLoaded = self.threads.length - 1;
                                    }

                                }
                            }
                        }
               
           }

            self.refresh = function(){

                self.loading = true;

                forumService.getFavorites()
                    .then(function(favorites){
                        self.favorites = favorites;
                    })                    
                    .then(function(threads){
                        
                        sortFavorites();
                        
                    })
                    .catch(function(err){

                        self.loading = false;
                    })
                    .finally(function(){

                        self.loading = false;
                    })
            }

            self.deleteThread = function(thread){

                forumService.confirmDelete()
                    .then(function(result){

                        if(result){
                            
                            return forumService.deleteThread(thread);
                        }
                    })
                    .then(function(response){
                        siteServices.successfulUpdate();
                        self.refresh();
                    })
            }
            
            $scope.$watch('threadSearch', function(){
                
                sortFavorites();
                
            })
            
            $scope.$watch('orderBy', function(){
                
                //sortFavorites();
                
            })
            
            function sortFavorites(){
                
                self.threads = $filter('filter')(self.masterThread, self.threadSearch);
                self.threads = $filter('orderBy')(self.threads, self.orderBy);
                
                if(self.threadRepeat){
                    self.threadRepeat.numLoaded = self.threads.length - 1;    
                }
            }

            self.flipOrderBySorting = function(){
                
                if(self.orderBy == "dateCreated"){
                    
                    self.orderByString = 'Newest';
                    self.orderBy = "-dateCreated"    
                }
                else{
                    self.orderByString = 'Oldest';
                    self.orderBy = "dateCreated"    
                }
                
            }

            self.orderByDateCreatedReversed = function(){
                self.orderByString = 'Oldest';
                self.orderBy = "-dateCreated"
            }
            
            self.openThread = function(thread){
                
                forumService.setSelectedThread(thread);
                forumService.setIsComingFromFavorites(true);
                self.updateThreadViewed(thread);
                
                $scope.goTo('/thread/' + thread._id);
            }

            self.isFavorite = function (thread) {

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

   

            self.favoriteThread = function (thread) {

                var doesExist = self.isFavorite(thread);

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

            self.createThread = function () {

                forumService.openBottomSheet('threadEdit', { forum: self.favorites })
                    .then(function (response) {
                        self.refresh();
                    })
            }

            self.editThread = function(forum){

                forumService.openBottomSheet('threadEdit', forum);
            }

            self.goBack = function(){
                $scope.goBack();
            } 
            
            self.isRead = function (threadIn) {
                
                
                var oldThread = _.find(self.savedThreads, function (thread) {
                    return thread._id == threadIn._id;
                })


                if (oldThread == undefined || oldThread.commentCount != threadIn.commentCount) {
                    return "unread";
                }
                else {
                    return "read";
                }
            }
            
            self.updateThreadViewed = function(threadIn){
                
                var threadIndexTracker;
                        
                _.find(self.savedThreads, function (thread, threadIndex) {

                    if (thread._id == threadIn._id) {
                        threadIndexTracker == threadIndex;
                        self.savedThreads[threadIndex] = threadIn;
                    }
                })
                
                if(self.savedThreads.length == 0 || threadIndexTracker == undefined){
                    self.savedThreads.push(threadIn);
                }
                
                
                forumService.saveThreadCounts(self.savedThreads);
            }
            
            self.init();

	}]) 
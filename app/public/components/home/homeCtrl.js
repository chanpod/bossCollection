
angular.module("BossCollection.home")
    .controller("homeController", ["$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices',
        function($scope, $location, $http, $timeout, siteServices, guildServices){
            $scope.guild = {};
            $scope.editing = false;
            $scope.content;            
            $scope.newTab;            
            
            var newTab = {title: "New Tab", content: "Make me whatever you want."};
            
            $scope.init = function() {
                
                $scope.newTab = newTab;
                
                guildServices.getHomepageContent()
                    .then(function(guild){
                        $scope.guild = guild.guild;
                    })
                    .catch(function(err){
                        siteServices.showMessageModal(err.message);
                    })
            }

            $scope.editTab = function(){
                $scope.editing = true;
            }
            
            $scope.saveTab = function(){
                
                guildServices.updateHomepageContent($scope.guild)
                    .then(function(res){
                        
                        $scope.cancel();
                        //It worked, do nothing.
                    })
                    .catch(function(err){
                        
                        siteServices.showMessageModal(err.message);
                    })
                
            }
            
            $scope.deleteTab = function(index){
                
                siteServices.confirmDelete()
                    .then(function(){
                        
                        $scope.guild.tabs.remove(index);
                        $scope.saveTab();
                        
                    })
            }
            
            $scope.addNewTab = function(){
                
                $scope.guild.tabs.push($scope.newTab);
                
                $scope.saveTab();
                
                $scope.newTab = newTab;
            }
            
            $scope.cancel = function(){
                
                $scope.editing = false;
            }
            
            siteServices.updateTitle('Home');
            
            $scope.init();
            
            Array.prototype.remove = function(from, to) {
                var rest = this.slice((to || from) + 1 || this.length);
                this.length = from < 0 ? this.length + from : from;
                return this.push.apply(this, rest);
            };
    }])
  
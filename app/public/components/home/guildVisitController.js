
angular.module("BossCollection.home")
    .controller("guildVisitController", ["$scope", '$location', '$routeParams', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc',
        function($scope, $location, $routeParams, $http, $timeout, siteServices, guildServices, userLoginSrvc){
            
            $scope.guild = {};
            $scope.editing = false;
            $scope.content;            
            $scope.newTab;            
            $scope.guildImagesLoaded = false;
            $scope.guildName = $routeParams.guildName
           
            
           
            
            $scope.init = function() {
                
                $scope.getHomepageContent();
            }
            
            $scope.getHomepageContent = function() {

                $scope.guildImagesLoaded = false;

                guildServices.getHomepageContent($scope.guildName)
                    .then(function(guild) {

                        if(guild.guild == undefined){
                            siteServices.showMessageModal("Guild not found. Check the spelling. Spaces and Case matter.");
                        }
                        
                        $scope.guild = guild.guild;
                        
                        var sliderHTML = "<awesome-slider  height=\"x60%\" autostart=\"true\" bullets=\"true\">"
                            + "<item source=\"/images/expansionBanners/wodbanner.jpg\"></item>";
                        
                        
                        
                        if ($scope.guild && $scope.guild.images) {
                            $scope.guild.images.forEach(function(image) {
                                sliderHTML += "<item source = " + image + "></item>"
                            }, this);
                        }


                        sliderHTML += "</awesome-slider>";

                        document.getElementById('imageGallery').innerHTML = sliderHTML;

                        $scope.guildImagesLoaded = true;
                    })
                    .catch(function(err) {
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
  
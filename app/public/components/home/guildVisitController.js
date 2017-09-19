
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

                if($scope.guildName == undefined){
                    $scope.guildName = "TBD"; 
                }

                guildServices.getHomepageContent($scope.guildName)
                        .then(function (guild) {

                            $scope.guild = guild.guild;

                            // var sliderHTML = "<awesome-slider  height=\"x60%\" autostart=\"true\" bullets=\"true\">"
                            //     + "<item source=\"/images/expansionBanners/legionbanner.png\"></item>";

                            // if ($scope.guild && $scope.guild.images) {
                            //     $scope.guild.images.forEach(function (image) {
                            //         sliderHTML += "<item source = " + image + "></item>"
                            //     }, this);
                            // }


                            // sliderHTML += "</awesome-slider>";

                            // document.getElementById('imageGallery').innerHTML = sliderHTML;

                            $scope.guildImagesLoaded = true;
                        })
                        .catch(function (err) {
                            siteServices.handleError(err);
                        }) 

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
  
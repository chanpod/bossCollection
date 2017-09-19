
angular.module("BossCollection.home")
    .controller("homeController", ["$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc',
        function ($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc) {

            $scope.guild = {};
            $scope.editing = false;
            $scope.content;
            $scope.newTab;
            $scope.guildImagesLoaded = false;

            var newTab = { title: "New Tab", content: "Insert Content here. Markup supported. Click on the question mark in the preview bar below to get more details." };

            $scope.$on("loggedin", (event, user) => {

                userLoginSrvc.getUser()
                    .then(function (user) {
                        if (user) {
                            $scope.user = user;
                            $scope.loggedIn = true;
                            $scope.getHomepageContent();
                        }
                    },
                    function (err) {
                        $scope.user = undefined;
                        $scope.guild = undefined;
                        // document.getElementById('imageGallery').innerHTML = "";
                        $scope.loggedIn = false;
                    })


            })

            $scope.login = () => {
                siteServices.showLoadingBottomSheet();
            }

            $scope.init = () => {

                $scope.newTab = Object.assign({}, newTab);

                $scope.getHomepageContent();

            }

            $scope.getHomepageContent = () => {

                $scope.guildImagesLoaded = false;

                if ($scope.user && $scope.user.guild) {

                    guildServices.getHomepageContent($scope.user.guild.name)
                        .then(function (guild) {

                            $scope.guild = guild.guild;
                     

                            $scope.guildImagesLoaded = true;
                        })
                        .catch(function (err) {
                            siteServices.showMessageModal(err.data);
                        })
                }
                else {
                    guildServices.getHomepageContent("TBD")
                        .then(function (guild) {

                            $scope.guild = guild.guild;
           

                            $scope.guildImagesLoaded = true;
                        })
                        .catch(function (err) {
                            siteServices.showMessageModal(err.data);
                        })
                }
            }

            $scope.editTab = function () {
                $scope.editing = true;
            }

            $scope.saveTab = function () {

                guildServices.updateHomepageContent($scope.guild, $scope.user.guild.name)
                    .then(function (res) {

                        $scope.cancel();
                        //It worked, do nothing.
                    })
                    .catch(function (err) {

                        siteServices.showMessageModal(err.data);
                    })

            }

            $scope.deleteTab = function (index) {

                siteServices.confirmDelete()
                    .then(function () {

                        $scope.guild.tabs.remove(index);
                        $scope.saveTab();

                    })
            }

            $scope.addNewTab = function () {

                $scope.guild.tabs.push($scope.newTab);

                $scope.saveTab();

                $scope.newTab = Object.assign({}, newTab);
                //$scope.newTab = newTab; 
            }

            $scope.cancel = function () {

                $scope.editing = false;
            }

            siteServices.updateTitle('Home');

            $scope.init();

            Array.prototype.remove = function (from, to) {
                var rest = this.slice((to || from) + 1 || this.length);
                this.length = from < 0 ? this.length + from : from;
                return this.push.apply(this, rest);
            };
        }])


angular.module("BossCollection.home")
    .controller("recruitmentController", ["$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc', '$mdMedia', '$mdDialog',
        function ($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc, $mdMedia, $mdDialog) {
             
             console.log("Get recruitment object");             

             $scope.init = () => {

                 $scope.getRecruitment();
             }

             $scope.editRecruitment = () => {
                 
                console.log("Open edit modal");
                var template = "recruitmentEditTemplate";

                var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;

                $mdDialog.show({
                    templateUrl: template,
                    locals: {parent: $scope},
                    bindToController: true,
                    controller: angular.noop,
                    controllerAs: 'ctrl',

                    clickOutsideToClose: false,                    
                    fullscreen: true
                })
                    .then(function (result) {

                        
                    },
                        function () {
                            
                            //Something broke or they canceled
                        })
            }

            $scope.getRecruitment = () => {
                
                guildServices.getRecruitment($scope.user.guild.name)
                    .then(recruitment => {
                        console.log(recruitment)
                        $scope.recruitment = recruitment.recruitment;
                    })
                    .catch(err => {
                        console.log(err)
                        siteServices.handleError(err);
                    })
            }

            $scope.saveRecruitment = () => {
                //guildName, recruitment
                $scope.recruitment.recruitmentNeeds.push({spec: "Marksman"});
                guildServices.updateRecruitment($scope.user.guild.name, $scope.recruitment)
                    .then(recruitment => {
                        console.log(recruitment)
                        $scope.recruitment = recruitment;
                    })
                    .catch(err => {
                        console.log(err)
                        siteServices.handleError(err);
                    })
            }             

            $scope.init();

        }])
  
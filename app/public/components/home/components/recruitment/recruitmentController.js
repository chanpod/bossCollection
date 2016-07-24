
angular.module("BossCollection.home")
    .controller("recruitmentController", ["$scope", '$location', '$http', '$timeout', 'siteServices', 'guildServices', 'userLoginSrvc', '$mdMedia', '$mdDialog',
        function ($scope, $location, $http, $timeout, siteServices, guildServices, userLoginSrvc, $mdMedia, $mdDialog) {

            console.log("Get recruitment object");

            $scope.desireOptions = [
                "High",
                "Med",
                "Low",
                "None"
            ]

            $scope.init = () => {

                $scope.getRecruitment();
            }

            $scope.editRecruitment = (classObject) => {

                console.log("Open edit modal");
                var template = "recruitmentEditTemplate";

                var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
                $scope.selectedClass = classObject;

                $mdDialog.show({
                    templateUrl: template,
                    locals: { parent: $scope },
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

            $scope.calculateTotal = (classObject) => {

                classObject.total = 0;

                _.forEach(classObject.specs, (value, key) => {
                    if (value.desire != "None") {

                        classObject.total += parseInt(value.amount);
                    }
                    else{
                        value.amount = 0;
                    }
                })
            }

            $scope.cancel = () => {
                $mdDialog.hide();
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

            $scope.getRecruitmentSpecTyle = (classType) => {

                if (classType.anySpec) {
                    return "Any Spec ";
                }
                else {
                    return "Amount ";
                }
            }

            $scope.init();

        }])

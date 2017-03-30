
angular.module("BossCollection.home")
    .controller("recruitmentController", ["$scope", '$location', '$http', '$timeout', '$routeParams', 'siteServices', 'guildServices', 'userLoginSrvc', '$mdMedia', '$mdDialog',
        function ($scope, $location, $http, $timeout, $routeParams, siteServices, guildServices, userLoginSrvc, $mdMedia, $mdDialog) {

            console.log("Get recruitment object");
            $scope.loading = true;
            $scope.savedRecruitment = {};

            $scope.desireOptions = [
                "High",
                "Med",
                "Low",
                "None"
            ]

            $scope.init = () => {


                if ($scope.user) {

                    $scope.guildName = $scope.user.guild.name;
                }
                else {
                    $scope.guildName = $routeParams.guildName
                }
                $scope.getRecruitment();
            }

            $scope.editRecruitment = (classObject) => {

                console.log("Open edit modal");
                var template = "recruitmentEditTemplate";

                var customFullscreen = $mdMedia('xs') || $mdMedia('sm');
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && customFullscreen;
                $scope.selectedClass = classObject;

                angular.copy($scope.recruitment, $scope.savedRecruitment);

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
                    else {
                        value.amount = 0;
                    }
                })
            }

            $scope.cancel = () => {

                angular.copy($scope.savedRecruitment, $scope.recruitment);
                $mdDialog.hide();
            }

            $scope.close = () => {
                $mdDialog.hide();
            }



            $scope.getRecruitment = () => {
                $scope.loading = true;
                guildServices.getRecruitment($scope.guildName)
                    .then(recruitment => {
                        console.log(recruitment)
                        $scope.recruitment = recruitment.recruitment;

                    })
                    .catch(err => {
                        console.log(err)
                        siteServices.handleError(err);
                    })
                    .finally(() => {
                        $scope.loading = false;
                    })
            }

            $scope.saveRecruitment = () => {
                //guildName, recruitment

                guildServices.updateRecruitment($scope.user.guild.name, $scope.recruitment)
                    .then(recruitment => {
                        console.log(recruitment)
                        $scope.recruitment = recruitment;
                        $scope.close();
                    })
                    .catch(err => {
                        console.log(err)
                        siteServices.handleError(err);
                    })
                    .finally(() => {
                        siteServices.successfulUpdate();
                    })
            }

            $scope.getRecruitmentSpecTyle = (classType) => {

                if (classType != undefined) {

                    if (classType.anySpec) {
                        return "Any Spec ";
                    }
                    else {
                        return "Amount ";
                    }
                }
            }

            $scope.init();

        }])

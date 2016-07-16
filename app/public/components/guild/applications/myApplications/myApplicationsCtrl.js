angular.module("BossCollection.guild")
    .controller('myApplicationsCtrl', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', 'data', 'userLoginSrvc',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, data, userLoginSrvc) {
            
            $scope.orderBy = "dateCreated"


            $scope.init = function () {

                if (data) {

                    $scope.application = data;
                }
                else { 
                    $scope.application = {};
                }

                $scope.user = userLoginSrvc.updateUser();
            }

            $scope.cancel = function () {

                $mdDialog.cancel();
            }
            
            $scope.getNormalProgression = function (progression) {

                try {
                    var raidProgression = 0;
                    var raidLength = progression.bosses.length;
                    for (var i = 0; i < raidLength; i++) {

                        if (progression.bosses[i].normalKills > 0) {
                            raidProgression++;
                        }
                    }

                    return raidProgression + "/" + raidLength;
                }
                catch (err) {
                    return 0 + "/" + 0;
                }

            }

            $scope.getHeroicProgression = function (progression) {

                try {
                    var raidProgression = 0;
                    var raidLength = progression.bosses.length;
                    for (var i = 0; i < raidLength; i++) {

                        if (progression.bosses[i].heroicKills > 0) {
                            raidProgression++;
                        }
                    }

                    return raidProgression + "/" + raidLength;
                }
                catch (err) {
                    return 0 + "/" + 0;
                }

            }

            $scope.getMythicProgression = function (progression) {

                try {
                    var raidProgression = 0;
                    var raidLength = progression.bosses.length;
                    for (var i = 0; i < raidLength; i++) {

                        if (progression.bosses[i].mythicKills > 0) {
                            raidProgression++;
                        }
                    }

                    return raidProgression + "/" + raidLength;
                }
                catch (err) {
                    return 0 + "/" + 0;
                }

            }
  

            $scope.close = function () {
                $mdDialog.hide(self.thread);
            }
     
            $scope.init();
        }]);
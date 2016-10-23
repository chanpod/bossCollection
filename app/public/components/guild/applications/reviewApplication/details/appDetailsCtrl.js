angular.module("BossCollection.forums")
    .controller('appDetailsController', [
        '$scope', '$location', 'siteServices', 'forumService', '$mdBottomSheet', '$mdDialog', 'data', 'userLoginSrvc', 'guildServices',
        function ($scope, $location, siteServices, forumService, $mdBottomSheet, $mdDialog, data, userLoginSrvc, guildServices) {
            
            $scope.orderBy = "dateCreated"


            $scope.init = function () {

                if (data) {

                    $scope.application = data;
                    $scope.updateProgression();
                }
                else { 
                    $scope.application = {};
                }

                $scope.user = userLoginSrvc.updateUser();
            }

            $scope.cancel = function () {

                $mdDialog.cancel();
            }

            $scope.updateProgression = function(){
                guildServices.getProgression($scope.application.character.name, $scope.application.realm.name)
                    .then(function(result){
                         $scope.parseProgression(result);
                    })
            }

            $scope.parseProgression = function (result) {

                $scope.raids = result.raids;

                $scope.hfc = _.find($scope.raids, function (raid) {

                    return raid.name == "Hellfire Citadel";
                })

                $scope.brf = _.find($scope.raids, function (raid) {

                    return raid.name == "Blackrock Foundry";
                })
 
                $scope.hm = _.find($scope.raids, function (raid) {  

                    return raid.name == "Highmaul";
                })

                $scope.en = _.find($scope.raids, function (raid) {  

                    return raid.name == "The Emerald Nightmare";
                })

                $scope.nh = _.find($scope.raids, function (raid) {  

                    return raid.name == "Nighthold";
                })

                $scope.application.progression = {};

                $scope.application.progression.hfc = $scope.hfc;
                $scope.application.progression.brf = $scope.brf;
                $scope.application.progression.hm = $scope.hm;
                $scope.application.progression.en = $scope.en;
                $scope.application.progression.nh = $scope.nh;
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
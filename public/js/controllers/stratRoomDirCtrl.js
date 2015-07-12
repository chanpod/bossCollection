'use strict'
angular.module("BossCollection.controllers")    
    .controller("bossStrategyController", ['$scope', 'bossStrats', '$modal', 'socketProvider','$routeParams',
            function($scope, bossStrats, $modal, socketProvider, routeParams){

                var socket = socketProvider;
                $scope.highmaulBossSelected = false;
                $scope.brfBossSelected = false;
                $scope.hfcBossSelected = false;
                (adsbygoogle = window.adsbygoogle || []).push({});
                
                var desiredRaid = routeParams.raid;
                
                $scope.highmaul = "hm";
                $scope.brf = "brf";
                $scope.hfc = "hfc";
                $scope.bossInfo = {};
                $scope.loadChat = false;
                $scope.difficultySelected = "";                
                $scope.currentEmbedUrl = "";                
                $scope.addNewBoss = false;
                $scope.currentRaid = {}
                $scope.raidToDisplay = {};
                
                console.log("Loading controller");
                
                //New Boss Info
                $scope.name = "";
                $scope.url = "";
                
                
                
                function setSideNavHeight(){
                    console.log("Height of window is: " + window.outerHeight);
                    document.getElementById("sideNavID").style.height = window.outerHeight/2 + "px";
                    console.log("Height of sideNav is: " + document.getElementById("sideNavID").style.height);
                }

                setSideNavHeight();

                $scope.addVideo= function(bossName, difficulty, currentRaid){
                    console.log("name: " + bossName);
                    console.log("Difficulty: " + difficulty);

                    $scope.currentBoss = bossName;
                    $scope.currentDifficulty = difficulty;
                    $scope.currentRaid = currentRaid;
                };
               

                $scope.saveNewBossInfo = function(name, url){
                    var isHeroic = false;
                    var isMythic = false;
                    var isHighmaul = false;
                    var isBRF = false;
                    var isHFC = false;

                    console.log(name);

                    if($scope.currentDifficulty == "heroic"){
                        isHeroic = true;
                    }
                    else if ($scope.currentDifficulty == "mythic"){
                        isMythic = true;
                    }

                    if($scope.currentRaid == "highmaul"){
                        isHighmaul = true;
                    }
                    else if($scope.currentRaid == "brf"){
                        isBRF = true;
                    }
                    else if($scope.currentRaid == "hellfire"){
                        isHFC = true
                    }

                    var raidInfo = {
                        isHighmaul: isHighmaul,
                        isBRF: isBRF,
                        isHFC: isHFC,
                        isHeroic: isHeroic,
                        isMythic: isMythic,
                        bossName: $scope.currentBoss,
                        newBossInfo: {
                            "name" : name,
                            "url" : url
                        }
                    };

                    console.log(raidInfo);

                    bossStrats.saveStrats(raidInfo);

                    $scope.name = "";
                    $scope.url = "";

                    $scope.addNewBoss = !$scope.addNewBoss;
                };

                socket.on("addVideoSuccess", function(message){
                    console.log("Success: " + message);
                   if(message == "success"){
                       console.log("Getting updated boss info");
                       bossStrats.getStrats();
                       $scope.addNewBoss = !$scope.addNewBoss;
                   }
                });

                socket.on("saveFailed", function(erMsg){
                    console.log(erMsg);
                });

                $scope.heroicDifficultySelected = function(boss){

                    boss.heroic.isSelected = !boss.heroic.isSelected;
                    boss.mythic.isSelected = false;
                    $scope.difficultySelected = "- Heroic";
                    $scope.addNewBoss = false;
                };

                $scope.mythicDifficultySelected = function(boss){

                    boss.mythic.isSelected = !boss.mythic.isSelected;
                    boss.heroic.isSelected = false;
                    $scope.difficultySelected = "- Mythic";
                    $scope.addNewBoss = false;
                };

                $scope.changeHMBossInfo = function(boss){

                    boss.isSelected = !boss.isSelected;
                    boss.heroic.isSelected = false;
                    boss.mythic.isSelected = false;
                    $scope.difficultySelected = "";
                    $scope.highmaulBossSelected = !$scope.highmaulBossSelected;

                    $scope.bossSelected = boss.name;
                    $scope.addNewBoss = false;
                    
                };
                
                $scope.changeBossInfo = function(boss, difficulty){
                    
                    boss.isSelected = !boss.isSelected;

                    $scope.bossSelected = boss.name;
                    $scope.addNewBoss = false;
                    
                    
                }
                
                $scope.changeDifficulty = function(boss, difficulty){
                    boss.difficultySelected = difficulty;
                    
                    if(difficulty == "- Heroic"){
                        
                        boss.heroic.isSelected = !boss.heroic.isSelected;
                        boss.mythic.isSelected = false;  
                    }
                    else{
                         boss.mythic.isSelected = !boss.mythic.isSelected;
                         boss.heroic.isSelected = false;
                    }
                    
                }

                $scope.changeBRFBossInfo = function(boss){
                    boss.isSelected = !boss.isSelected;
                    boss.heroic.isSelected = false;
                    boss.mythic.isSelected = false;
                    $scope.difficultySelected = "";
                    $scope.brfBossSelected = !$scope.brfBossSelected;

                    $scope.bossSelected = boss.name;
                    $scope.addNewBoss = false;                    
                };
                
                $scope.changeHFCBossInfo = function(boss){
                    boss.isSelected = !boss.isSelected;
                    boss.heroic.isSelected = false;
                    boss.mythic.isSelected = false;
                    
                    $scope.difficultySelected = "";
                    $scope.hfcBossSelected = !$scope.hfcBossSelected;

                    $scope.bossSelected = boss.name;
                    $scope.addNewBoss = false;
                    
                };

                $scope.cancelHMBossSelection = function(currentSelectedBoss){
                    
                    currentSelectedBoss.isSelected = !currentSelectedBoss.isSelected;
                    currentSelectedBoss.heroic.isSelected = false;
                    currentSelectedBoss.mythic.isSelected = false;
                    $scope.difficultySelected = "";
                    $scope.highmaulBossSelected = !$scope.highmaulBossSelected;

                    
                    $scope.addNewBoss = false;
                    
                };

                $scope.cancelBRFBossSelection = function(currentSelectedBoss){
                    currentSelectedBoss.isSelected = !currentSelectedBoss.isSelected;
                    currentSelectedBoss.heroic.isSelected = false;
                    currentSelectedBoss.mythic.isSelected = false;
                    $scope.difficultySelected = "";
                    $scope.brfBossSelected = !$scope.brfBossSelected;

                    
                    $scope.addNewBoss = false;
                    
                };
                
                $scope.cancelHFCBossSelection = function(currentSelectedBoss){
                    
                    currentSelectedBoss.isSelected = !currentSelectedBoss.isSelected;
                    currentSelectedBoss.heroic.isSelected = false;
                    currentSelectedBoss.mythic.isSelected = false;
                    
                    $scope.difficultySelected = "";
                    $scope.hfcBossSelected = !$scope.hfcBossSelected;

                    
                    $scope.addNewBoss = false;
                    
                };

                socket.on("bossInfoData", function(data){
                    
                    console.log(desiredRaid);
                    
                    $scope.raidToDisplay = data.bosses;
                    
                    $scope.$apply();

                });

                bossStrats.getStrats(desiredRaid);


                $scope.setUrl = function(newUrl){
                    $scope.currentEmbedUrl = newUrl;
                };

                $scope.open = function (url) {
                    $scope.setUrl(url);
                    console.log(url);
                    var modalInstance = $modal.open({
                        templateUrl: 'videoModal',
                        controller: 'videoController',
                        size: 'lg',
                        windowClass: "videoModal",
                        resolve: {
                            currentUrl: function () {
                                return  $scope.currentEmbedUrl;
                            }
                        }
                    });
                }
        }])
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
               

                $scope.saveNewBossInfo = function(name, url, boss, difficulty){
                    
                    if (verifyYoutubeURL(url)) {
                        
                        var parsedUrl = url.split("=");
                        url = parsedUrl[1];

                        if (difficulty == "heroic") {
                            boss.heroic.videos.push(
                                {
                                    "name": name,
                                    "url": url
                                }
                                )
                        }
                        else if (difficulty == "mythic") {
                            boss.mythic.videos.push(
                                {
                                    "name": name,
                                    "url": url
                                }
                                )
                        }



                        $scope.raidData.bosses = $scope.raidToDisplay;
                        console.log($scope.raidData);

                        bossStrats.saveStrats($scope.raidData, url);

                        $scope.name = "";
                        $scope.url = "";

                        $scope.addNewBoss = !$scope.addNewBoss;
                    }
                };
                
                function verifyYoutubeURL(url) {

                    return /(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/.test(url);
                }

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
                

                socket.on("bossInfoData", function(data){
                    
                    console.log(desiredRaid);
                    
                    $scope.raidToDisplay = data.bosses;
                    $scope.raidData = data;
                    
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
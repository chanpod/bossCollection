'use strict';
angular.module("BossCollection.controllers")    
    .controller("rosterController", ["$scope",  'filterFilter', 'socketProvider', 'guildServices', '$http', '$cookies',
        function($scope, filterFilter, socketProvider, guildServices, $http, $cookies){
            $scope.currentRosterDropdown = true;
            $scope.applicantsDropdown = false;
            $scope.trials = [];
            var classes = ["placeholder","warrior", "paladin", "hunter", "rogue", "priest", "dk", "shaman", "mage", "warlock","monk","druid"]
            $scope.raiders = [];
            $scope.trialRanks = [9];
            $scope.raiderRanks = [0, 1, 3, 6];
            $scope.guild = "mkdir bosscollection";
            $scope.realm = "zul'jin";
            
            getSavedRanksList();
            
            $scope.getMembers = function(){
                $scope.raiders = [];
                $scope.trials = [];
                console.log("Function called");
                guildServices.getGuild($scope.realm, $scope.guild).then(function(data){
                    console.log(data);
                    parseMembers(data);
                },
                function(err){
                    console.log(err);
                });
            }
            
            $scope.getUser = function(){
                
                $http({method: 'POST', url: '/getUser'}).success(function(data){
                   
                   console.log(data);
                });
            }
            
            $scope.saveRanksList = function(){
                
                var ranksList = {
                    guild: $scope.guild,
                    realm: $scope.realm, 
                    trialRanks: $scope.trialRanks,
                    raiderRanks: $scope.raiderRanks
                }
                
                $cookies.putObject("ranksList", ranksList);
            }
            
            function getSavedRanksList(){
                
                var ranksList = $cookies.getObject("ranksList");
                
                if(ranksList){
                    $scope.raiderRanks = ranksList.raiderRanks;
                    $scope.trialRanks = ranksList.trialRanks;
                    $scope.guild = ranksList.guild;
                    $scope.realm = ranksList.realm;
                }
            }
            
            var parseMembers = function(membersObject){
                //var $scope.raiderRanks = [0, 1, 3, 5];
                //var trialRank = 8;
                
                for(var i = 0; i < membersObject.length; i++){
                    var rnk = membersObject[i].rank
                    for(var j = 0; j < $scope.raiderRanks.length; j++){
                        if($scope.raiderRanks[j] == rnk){
                            
                            var clss = classes[membersObject[i].character.class];
                            var newMember = {
                                "name": membersObject[i].character.name,
                                "class": clss.charAt(0).toUpperCase() + clss.slice(1),
                                "rank" : rnk,
                                "spec" : membersObject[i].character.spec.name,
                                "avatar" : "http://us.battle.net/static-render/us/" + membersObject[i].character.thumbnail
                            }
                            
                            $scope.raiders.push(newMember);
                        }
                        
                    }
                    
                    for(var j = 0; j < $scope.trialRanks.length; j++){
                        if($scope.trialRanks[j] == rnk){
                   
                            var clss = classes[membersObject[i].character.class];
                            var newMember = {
                                "name": membersObject[i].character.name,
                                "class": clss.charAt(0).toUpperCase() + clss.slice(1),
                                "rank" : rnk,
                                "spec" : membersObject[i].character.spec.name,
                                "avatar" : "http://us.battle.net/static-render/us/" + membersObject[i].character.thumbnail
                            }
                            
                            $scope.trials.push(newMember);
                        }
                    }
                }
                
                $scope.raiders.sort(function(a, b){return a.rank-b.rank});
            }
            
            
            $scope.lowLvlTrials = [];
            
            
           $scope.getMembers()

        }])
'use strict';
angular.module("BossCollection.controllers")    
    .controller("rosterController", ["$scope",  'filterFilter', 'socketProvider', 'guildServices', '$http', '$cookies', '$location', 'siteServices',
        function($scope, filterFilter, socketProvider, guildServices, $http, $cookies, $location, siteServices){
            
            try{
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
            catch(err){
              //Don't care, keep going df
            }
            
            siteServices.updateTitle('Guild Roster');
            
            $scope.currentRosterDropdown = true;
            $scope.applicantsDropdown = false;
            
            var classes = ["placeholder","warrior", "paladin", "hunter", "rogue", "priest", "death knight", "shaman", "mage", "warlock","monk","druid"]
            
            $scope.raiders = [];
            $scope.trials = [];
            
            $scope.trialRanks = [9];
            $scope.raiderRanks = [0, 2, 6];
            
            $scope.guild = "mkdir bosscollection";
            $scope.realm = "zul'jin";
            
            $scope.loading = true;
            $scope.genders = ['Male', 'Female']
            
            
            getSavedRanksList();
            $('ul.tabs').tabs(); //jquery
            
            $scope.getMembers = function(){
                
                $scope.raiders = [];
                $scope.trials = [];
                
                $scope.loading = true;
                
                guildServices.getGuild($scope.realm, $scope.guild).then(function(data){
                    
                    console.log(data);
                    $scope.loading = false;
                    parseMembers(data);
                },
                function(err){
                    
                    $scope.loading = false;
                    console.log(err);
                });
            }
            
            $scope.getUser = function(){
                
                $http({method: 'POST', url: '/getUser'}).success(function(data){
                   
                   console.log(data);
                });
            }
            
            $scope.openArmoryProfile = function(name, realm){
                
                var armoryURL = "http://us.battle.net/wow/en/character/" + realm +"/" + name + "/simple";
                window.open(armoryURL);
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
            
            var buildRaiderObject = function(raider, rank, classType){
                
                try {

                    var newMember = {
                        "name": raider.character.name,
                        "class": classType.charAt(0).toUpperCase() + classType.slice(1),
                        "rank": rank,
                        "gender": $scope.genders[raider.character.gender],
                        "race": raider.character.race,
                        "spec": raider.character.spec.name,
                        "achievementPoints": raider.character.achievementPoints,
                        "avatar": "http://us.battle.net/static-render/us/" + raider.character.thumbnail
                    }

                    return newMember;
                }
                catch(err){
                    console.log(raider);
                }
            }
            
            var parseMembers = function(membersObject){               
                
                for(var i = 0; i < membersObject.length; i++){
                    
                    var memberRank = membersObject[i].rank
                    
                    var raiderRankValid = _.find($scope.raiderRanks, function(rank){
                        return memberRank == rank;
                    })
                    
                    var trialRankValid = _.find($scope.trialRanks, function(rank){
                        return memberRank == rank;
                    })
                    
                    var classType = classes[membersObject[i].character.class];
                    
                    if (raiderRankValid) {

                        $scope.raiders.push(buildRaiderObject(membersObject[i], memberRank, classType));
                    }
                    
                    if(trialRankValid){
                        $scope.trials.push(buildRaiderObject(membersObject[i], memberRank, classType));
                    }
                }
                
                $scope.raiders.sort(function(a, b){return a.rank-b.rank});
            }
            
            
            $scope.lowLvlTrials = [];
            
            
           $scope.getMembers()

        }])
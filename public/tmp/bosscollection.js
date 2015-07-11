'use strict';



angular.module('BossCollection', [  
  'BossCollection.controllers',  
  'BossCollection.services',
  'BossCollection.directives',
  'ngRoute',
  'ui.bootstrap',
  'ngResource',
  'btford.socket-io',
  'ngCookies'

]).factory('mySocket', function(socketFactory){
    return socketFactory();
}).
config(function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider) {



    $routeProvider.
    when('/', {
      templateUrl: 'home',
      controller: 'homeController'
    }).
    when('/strategyRoom/:raid', {
        templateUrl: 'strategyRoom',
        controller: 'strategyRoomController',
    }).
    when('/roster', {
        templateUrl: 'roster',
        controller: 'rosterController'
    }).
    otherwise({
      redirectTo: '/'
    });

    $locationProvider.hashPrefix('!');

    $sceDelegateProvider.resourceUrlWhitelist([
        'self',
        'https://www.youtube.com/**',
        'https://pagead2.googlesyndication.com'
    ]);

  $locationProvider.html5Mode(true);

});
'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers", [])
    .controller("homeController", ["$scope", '$location', '$http', '$timeout',
        function($scope, $location, $http, $timeout){

            (adsbygoogle = window.adsbygoogle || []).push({});

            twitter();

            $scope.myInterval = 10000;
            var listofImages = [{image: '/images/InterfaceSS/defragInterface.jpg', text: "Ortharion's Interface!"},
                {image: '/images/InterfaceSS/caesarInterface.jpg', text: "Caesar's Interface!"},
                {image: 'http://i.imgur.com/MGgMDok.jpg', text: "Szii's Interface!"},
                {image: 'http://i.imgur.com/ePuSV2G.jpg', text: "Natsuri's Interface!"},
                {image: '/images/InterfaceSS/rayyenInterface.jpg', text: "Rayyan's Interface!"},
                {image: 'http://i.imgur.com/bf5QUqy.jpg', text: "Ortharion's alternate Interface!"}

            ];

            var slides = $scope.slides = [];
            $scope.addSlide = function(index) {
                slides.push(listofImages[index]);
            };

            for(var i =0; i < listofImages.length; i++) {
                $scope.addSlide(i);
            }


        $scope.stroke = 9;
        $scope.radius = 40;
        $scope.progressColor = "#069";
        $scope.bgColor = '#eaeaea';
        $scope.isSemi = false;
        $scope.showGuild = false;

        $scope.welcomeMessage = "Welcome to Boss Collection's Guild Website.";
        $scope.guild = "";
        $scope.realm = "Zul'jin";
        $scope.characterName = "";
        $scope.character = {};
        $scope.classColor = "shamanClassColor";
        $scope.iLvl = "";
        $scope.achievmentPoints = $scope.character.achievementPoints;
        $scope.characterImage = "";
        $scope.showLoadingGif = false;


        $scope.$watch('character', function (newValue, oldValue) {
            $scope.achievmentPoints = $scope.character.achievementPoints;
        }, true);

            $('#getGuildMessage').popover({
                content: 'Seems to be taking a while. ' +
                'Did you spell the guild name correctly? Sometimes this functionality can be blocked by corporate firewalls.' +
                    'Could be something just broke :( ',
                trigger: 'manual'
            })

    }])
'use strict';
angular.module("BossCollection.controllers")    
    .controller("rosterController", ["$scope",  'filterFilter', 'socketProvider', 'guildServices', '$http',
        function($scope, filterFilter, socketProvider, guildServices, $http){
            $scope.currentRosterDropdown = true;
            $scope.applicantsDropdown = false;
            $scope.trials = [];
            var classes = ["placeholder","warrior", "paladin", "hunter", "rogue", "priest", "dk", "shaman", "mage", "warlock","monk","druid"]
            $scope.raiders = [];
            $scope.trialRanks = [9];
            $scope.raiderRanks = [0, 1, 3, 6];
            $scope.guild = "mkdir bosscollection";
            $scope.realm = "zul'jin";
            
            
            
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
'use strict'
angular.module("BossCollection.controllers")
    .controller("strategyRoomController", ['$scope',
                function($scope){
    
    
    
    }])
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

                    $scope.bossInfo.highmaul = data.highmaul;
                    $scope.bossInfo.brf = data.brf;
                    $scope.bossInfo.hellfire = data.hellfire;
                    
                    console.log(desiredRaid);
                    
                    if(desiredRaid == $scope.hfc){
                        $scope.raidToDisplay = $scope.bossInfo.hellfire;
                       
                    }
                    else if(desiredRaid == "hm"){
                        $scope.raidToDisplay = $scope.bossInfo.highmaul;
                    }
                    else if(desiredRaid == "brf"){
                        $scope.raidToDisplay = $scope.bossInfo.brf;
                        
                    }
                    $scope.$apply();

                });

                bossStrats.getStrats();


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
'use strict'
angular.module("BossCollection.controllers")
	.controller("videoController", ['$scope', 'currentUrl', '$modalInstance',
		function ($scope, currentUrl, $modalInstance) {


			$scope.url = currentUrl;


			$scope.getIframeSrc = function () {
				return 'https://www.youtube.com/embed/' + $scope.url;
			};


			$scope.close = function () {
				$modalInstance.dismiss('cancel');
			};


			$scope.embedUrl = $scope.url;
		}])


/* Directives */

angular.module('BossCollection.directives', []).
  directive('bossstrategies', function () {
        return {
            restrict: 'E',
            templateUrl: 'bossStrategy',
            controller: 'bossStrategyController',

            link: function(scope, elm, attrs) {
            }
        }
  });

'use strict';

/* Filters */

angular.module('BossCollection.filters', []).
  filter('interpolate', function (version) {
    return function (text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  });

'use strict';

angular.module("BossCollection.services", [])
    .factory('bossStrats', ['socketProvider', function (socket) {
        
        
        
        var bossStratsApi = {

            getStrats: function () {

                console.log("Request Boss Info");
                socket.emit("getBossInfo");
            },
            saveStrats: function (updatedStrats) {
                console.log("Saving info now");
                socket.emit("saveStrats", updatedStrats);
            }
        };

        return bossStratsApi;
    }])
'use strict';



angular.module("BossCollection.services")
    .factory('guildServices', ['$http','$q',function ($http, $q) {

      var getMembersUrl = "https://us.api.battle.net/wow/guild/Zul'jin/mkdir%20Bosscollection?fields=members,items&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d"
        var blizzardBaseUrl = "https://us.api.battle.net/wow/guild/";
        var blizzardEndingUrl = "?fields=members&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";
        
        var guildApi = {
            checkGuild: function(achievements) {

            },

            getGuild: function(realm, guildName){
                var deferred = $q.defer()
                
                if(realm != "" && guildName != ""){
                    var getMembersUrl = blizzardBaseUrl + encodeURIComponent(realm) + "/" + encodeURIComponent(guildName) + blizzardEndingUrl;
                }
                
                $http({method: 'GET', url: getMembersUrl}).success(function(data){
                   
                   deferred.resolve(data.members);
                });
                
                return deferred.promise;
            }
        };

        return guildApi;
    }])
'use strict';



angular.module("BossCollection.services")
    .factory('socketProvider', [function () {
        
        var socket = io("http://54.173.24.121:4001");
        //var socket = io("http://localhost:4001");
        
        return socket;
    }])
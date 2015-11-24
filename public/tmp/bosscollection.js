'use strict';



angular.module('BossCollection', [
  'BossCollection.controllers',
  'BossCollection.services',
  'BossCollection.directives',
  'ngRoute',
  //'ui.bootstrap',
  'ngResource',
  'btford.socket-io',
  'ngCookies'

]).factory('mySocket', ['socketFactory', function(socketFactory){
    return socketFactory();
}]).
config(['$routeProvider', '$locationProvider', '$httpProvider', '$sceDelegateProvider',
    function ($routeProvider, $locationProvider, $httpProvider, $sceDelegateProvider) {




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

}]);

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
            try{
            (adsbygoogle = window.adsbygoogle || []).push({});
            }
            catch(err){
              //Don't care, keep going
            }

              $('.parallax').parallax();

              var options = [
                {selector: '#staggered-test', offset: 50, callback: 'Materialize.toast("This is our ScrollFire Demo!", 1500 )' },
                {selector: '#staggered-test', offset: 205, callback: 'Materialize.toast("Please continue scrolling!", 1500 )' },
                {selector: '#staggered-test', offset: 400, callback: 'Materialize.showStaggeredList("#staggered-test")' },
                {selector: '#image-test', offset: 500, callback: 'Materialize.fadeInImage("#image-test")' }
              ];

              Materialize.scrollFire(options);




    }])

'use strict';
angular.module("BossCollection.controllers")    
    .controller("rosterController", ["$scope",  'filterFilter', 'socketProvider', 'guildServices', '$http', '$cookies', '$location',
        function($scope, filterFilter, socketProvider, guildServices, $http, $cookies, $location){
            $scope.currentRosterDropdown = true;
            $scope.applicantsDropdown = false;
            $scope.trials = [];
            var classes = ["placeholder","warrior", "paladin", "hunter", "rogue", "priest", "dk", "shaman", "mage", "warlock","monk","druid"]
            $scope.raiders = [];
            $scope.trialRanks = [9];
            $scope.raiderRanks = [0, 2, 6];
            $scope.guild = "mkdir bosscollection";
            $scope.realm = "zul'jin";
            $scope.loading = true;
            $scope.genders = ['Male', 'Female']
            
            
            getSavedRanksList();
            $('ul.tabs').tabs();
            
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
                                "gender" : $scope.genders[membersObject[i].character.gender],
                                "race" : membersObject[i].character.race,
                                "spec" : membersObject[i].character.spec.name,
                                "achievementPoints": membersObject[i].character.achievementPoints,
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
    .controller("bossStrategyController", ['$scope', 'bossStrats', 'socketProvider','$routeParams',
            function($scope, bossStrats, socketProvider, routeParams){

                var socket = socketProvider;
                $scope.highmaulBossSelected = false;
                $scope.brfBossSelected = false;
                $scope.hfcBossSelected = false;
                
                $('.modal-trigger').leanModal();
                
                try{
                (adsbygoogle = window.adsbygoogle || []).push({});
                }
                catch(err){
                    console.log("Google broke again");
                }
                
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
                
                
                
                //New Boss Info
                $scope.name = "";
                $scope.url = "";
                
                
                
                $scope.init = function(){
                    
                    setSideNavHeight();
                        
                    bossStrats.getStrats(desiredRaid).then(function (bossData) {
                        $scope.raidToDisplay = bossData.bosses;
                        $scope.raidData = bossData;
                        resetSelectedBosses();
                    })

                }
                
                

                $scope.addVideo= function(bossName, difficulty, currentRaid){
                    

                    $scope.currentBoss = bossName;
                    $scope.currentDifficulty = difficulty;
                    $scope.currentRaid = currentRaid;
                };
               

                $scope.saveNewBossInfo = function(name, url, boss, difficulty){
                    
                    console.log(boss);
                     
                    if (verifyYoutubeURL(url)) {
                        
                        var parsedUrl = url.split("&");
                        parsedUrl = parsedUrl[0].split("=")
                        url = parsedUrl[1];

                        if (difficulty == "heroic") {
                            boss.heroic.videos[boss.heroic.videos.length] =
                                {
                                    "name": name,
                                    "url": url
                                }
                                
                        }
                        else if (difficulty == "mythic") {
                            boss.mythic.videos[boss.mythic.videos.length] =
                                {
                                    "name": name,
                                    "url": url
                                }
                        }                        
                        
                        $scope.raidData.bosses = $scope.raidToDisplay;
                        
                        console.log($scope.raidData);

                        bossStrats.saveStrats($scope.raidData, url);                        
                        $scope.addNewBoss = false;
                        
                        $scope.name = "";
                        $scope.url = "";

                        $scope.addNewBoss = !$scope.addNewBoss;
                    }
                    else{
                        $("#urlInput").popover('show');
                    }
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
                




                $scope.setUrl = function(newUrl){
                    $scope.currentEmbedUrl = newUrl;
                };

                $scope.open = function (url) {
                    $scope.setUrl(url);
                    console.log(url);
                    $('#bossVideo').openModal();
                    
                }
                
                function resetSelectedBosses(){
                    for(var boss in $scope.raidToDisplay){
                        $scope.raidToDisplay[boss].isSelected = false;
                    }
                }
                
                function setSideNavHeight(){                    
                    document.getElementById("sideNavID").style.height = window.outerHeight/2 + "px";
                }
                
                function verifyYoutubeURL(url) {

                    return /(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/.test(url);
                }
                
                
                
                
                
                $scope.init();
        }])
'use strict'
angular.module("BossCollection.controllers")    
    .controller("bossStrategyController", ['$scope', 'bossStrats', '$modal', 'socketProvider','$routeParams',
            function($scope, bossStrats, $modal, socketProvider, routeParams){

                var socket = socketProvider;
                $scope.highmaulBossSelected = false;
                $scope.brfBossSelected = false;
                $scope.hfcBossSelected = false;
                
                try{
                (adsbygoogle = window.adsbygoogle || []).push({});
                }
                catch(err){
                    console.log("Google broke again");
                }
                
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
                
                
                
                //New Boss Info
                $scope.name = "";
                $scope.url = "";
                
                
                
                $scope.init = function(){
                    
                    setSideNavHeight();
                        
                    bossStrats.getStrats(desiredRaid).then(function (bossData) {
                        $scope.raidToDisplay = bossData.bosses;
                        $scope.raidData = bossData;
                        resetSelectedBosses();
                    })

                }
                
                

                $scope.addVideo= function(bossName, difficulty, currentRaid){
                    

                    $scope.currentBoss = bossName;
                    $scope.currentDifficulty = difficulty;
                    $scope.currentRaid = currentRaid;
                };
               

                $scope.saveNewBossInfo = function(name, url, boss, difficulty){
                    
                    console.log(boss);
                     
                    if (verifyYoutubeURL(url)) {
                        
                        var parsedUrl = url.split("&");
                        parsedUrl = parsedUrl[0].split("=")
                        url = parsedUrl[1];

                        if (difficulty == "heroic") {
                            boss.heroic.videos[boss.heroic.videos.length] =
                                {
                                    "name": name,
                                    "url": url
                                }
                                
                        }
                        else if (difficulty == "mythic") {
                            boss.mythic.videos[boss.mythic.videos.length] =
                                {
                                    "name": name,
                                    "url": url
                                }
                        }                        
                        
                        $scope.raidData.bosses = $scope.raidToDisplay;
                        
                        console.log($scope.raidData);

                        bossStrats.saveStrats($scope.raidData, url);                        
                        $scope.addNewBoss = false;
                        
                        $scope.name = "";
                        $scope.url = "";

                        $scope.addNewBoss = !$scope.addNewBoss;
                    }
                    else{
                        $("#urlInput").popover('show');
                    }
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
                
                function resetSelectedBosses(){
                    for(var boss in $scope.raidToDisplay){
                        $scope.raidToDisplay[boss].isSelected = false;
                    }
                }
                
                function setSideNavHeight(){                    
                    document.getElementById("sideNavID").style.height = window.outerHeight/2 + "px";
                }
                
                function verifyYoutubeURL(url) {

                    return /(?:https?:\/\/|www\.|m\.|^)youtu(?:be\.com\/watch\?(?:.*?&(?:amp;)?)?v=|\.be\/)([\w‌​\-]+)(?:&(?:amp;)?[\w\?=]*)?/.test(url);
                }
                
                
                
                
                
                $scope.init();
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
  directive('bossstrategies', [function () {
        return {
            restrict: 'E',
            templateUrl: 'bossStrategy',
            controller: 'bossStrategyController',
 
            link: function(scope, elm, attrs) {
            }
        } 
  }]); 
 
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
    .factory('bossStrats', ['socketProvider', '$resource', '$q', function (socket, $resource, $q) {
        
        var stratsAPI = $resource('/api/bossStrats', {},
            {
                update: {
                    method: 'PUT'
                }
            })
        
        
        var bossStratsApi = {

            getStrats: function (boss) {
                
                var defer = $q.defer();
                
                console.log("Request Boss Info");
                //socket.emit("getBossInfo", boss); 
                
                var data = {name: boss};
                
                stratsAPI.save(data).$promise.then(function(result){
                    console.log("Result: " );
                    console.log(result);
                    defer.resolve(result.result);
                })
                
                return defer.promise;
            },
            saveStrats: function (updatedStrats, url) {
                console.log("Saving info now");
                var parameters = {
                    raidData: updatedStrats,
                    url: url
                }
                parameters = angular.toJson(parameters);
                console.log(parameters); 
                //socket.emit("saveStrats", parameters);
                stratsAPI.data = parameters;
                
                stratsAPI.update(parameters, function(result){
                    console.log("Result: " + result);
                })
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
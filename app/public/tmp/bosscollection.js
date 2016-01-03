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
    })
    .when('/strategyRoom/:raid', {
        templateUrl: 'strategyRoom',
        controller: 'strategyRoomController',
    })
    .when('/roster', {
        templateUrl: 'roster',
        controller: 'rosterController'
    })
    .when('/auth/login', {
        templateUrl: 'login',
        controller: 'loginController'
    })
    .when('/auth/signup', {
        templateUrl: 'signup',
        controller: 'signupController'
    })
    .when('/forum', {
        templateUrl: 'forums',
        controller: 'forumsController'
    })
    .when('/auth/updateAccount', {
        templateUrl: 'editAccount',
        controller: 'editAccountController' 
    })
    .when('/auth/application', {
        templateUrl: 'application',
        controller: 'applicationController'
    })
    .when('/reviewApplications', {
        templateUrl: 'reviewApplications',
        controller: 'applicationsReviewController'
    })
    .otherwise({
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
 *
 */
angular.module("BossCollection.controllers", [])
    .controller("editAccountController", ["$scope", '$location', '$http', 'userLoginSrvc', 
        function($scope, $location, $http, userLoginSrvc){
        
        userLoginSrvc.getUser().then(function(user){
             
            console.log("Got the user");
            
            $scope.user = user;
            
        })
        
        $scope.updateAccount = function () {
            
            console.log("Updating account");
            userLoginSrvc.updateAccount($scope.user).then(function (response) { 
                Materialize.toast("User updated");
            },
                function (err) {

                    Materialize.toast(err);
                })
        }
        
        $scope.alreadyLoggedIn = function(){
            
            if(userLoginSrvc.loggedIn() != true){
                $location.path('/auth/login');
            }
        }
        
        

    }])

'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("loginController", ["$scope", '$location', '$http', 'userLoginSrvc', 
        function($scope, $location, $http, userLoginSrvc){

        $scope.user = {};
        $scope.user = userLoginSrvc.getUser()
        
        $scope.alreadyLoggedIn = function(){
            
            if(userLoginSrvc.loggedIn() == true){
                $location.path('/');
            }
        }
        
        $scope.login = function(){
            
            userLoginSrvc.login($scope.user).then(function(response){
                
                //navigate to some page
                console.log(response);
            },
            function(err){
                
                Materialize.toast(err)
                console.log(err);
            })
        }

    }])

'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("signupController", ["$scope", '$location', '$http', '$timeout', 'userLoginSrvc',
        function($scope, $location, $http, $timeout, userLoginSrvc){
        
        $scope.user = {};
        
        $scope.register = function(){
            
            userLoginSrvc.registerNewUser($scope.user).then(function(result){
                //save user to cookie
                console.log(result);
            },
            function(err){
                Materialize.toast(err)
                console.log(err);
            }) 
            
        }

    }])

'use strict';
/**
 
 *

 */
angular.module("BossCollection.controllers")
    .controller("applicationController", ["$scope", '$location', '$http', '$timeout', 'realmServices', 'guildServices',
        function($scope, $location, $http, $timeout, realmServices, guildServices){
            
            
            console.log("Loading application ctrl...");
            $scope.application = {};            
            try{
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
            catch(err){
              //Don't care, keep going 
            }
            
            $scope.validCharacterName = false;
            
            realmServices.getRealms()
                .then(function(realms){
                    
                    $scope.realms = realms;
                    
                    $timeout(function(){ //waiting for angular digest cycle so select updates properly

                        $('select').material_select();
                       
                    }, 100)
                    
                    
                });
            
            
            $scope.validateCharactername = function(){
                
                $scope.validCharacterName = false; //Immediately invalidate until response comes back
                
                guildServices.validateCharacterName($scope.application.characterName, $scope.application.realm.name)
                    .then(function(character){
                        
                        $scope.validCharacterName = true;
                        $scope.application.character = character;
                    },
                    function(err){
                        $scope.validCharacterName = false;
                        
                    })
                
            }
            
            
            $scope.submitApplication = function(){
                
                if($scope.validCharacterName == false){
                    
                    Materialize.toast("Sorry, we couldn't find your character. Please verify your Realm and Character are correct.");
                }
                else{
                    guildServices.submitApplication($scope.application)
                        .then(function(result){
                            
                            $location.path('/reviewApplications');
                        },
                        function(err){
                            
                            Materialize.toast(err);
                        })
                }
            }
            
    }])

'use strict';
/**
 
 *

 */
angular.module("BossCollection.controllers")
    .controller("applicationsReviewController", ["$scope", '$location', '$http', '$timeout', 'guildServices',
        function($scope, $location, $http, $timeout, guildServices){
            
            try{
            (adsbygoogle = window.adsbygoogle || []).push({});
            }
            catch(err){
              //Don't care, keep going df
            }
            
             var classes = ["placeholder","warrior", "paladin", "hunter", "rogue", "priest", "death knight", "shaman", "mage", "warlock","monk","druid"]
            
            $scope.loading = true;
            
            guildServices.getApplications()
                .then(function(applications){
                    $scope.loading = false;
                    $scope.applications = applications.applications; //object to array
                    console.log($scope.applications);
                    
                    convertClasses();
                },
                function(err){
                    
                    $scope.loading = false;
                    console.log(err);
                    Materialize.toast("Seems something broke. Try again in a few...");
                })
                
            function convertClasses(){
                
                for(var i = 0; i < $scope.applications.length; i++){
                    
                    $scope.applications[i].character.class = classes[$scope.applications[i].character.class];
                }
            }

    }])

'use strict';
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("forumsController", ["$scope", '$location', '$http', 'userLoginSrvc', '$rootScope',
        function($scope, $location, $http, userLoginSrvc, $rootScope){
            
        $scope.user.name = userLoginSrvc.getUser();
        
        if($scope.user.name == undefined){
            $location.path('/');
        }
        

    }])

'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
angular.module("BossCollection.controllers")
    .controller("homeController", ["$scope", '$location', '$http', '$timeout',
        function($scope, $location, $http, $timeout){
            
            try{
            (adsbygoogle = window.adsbygoogle || []).push({});
            }
            catch(err){
              //Don't care, keep going df
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
/**
 *
 */
angular.module("BossCollection.controllers")
    .controller("navbar", ["$scope", '$location', '$http', 'userLoginSrvc', '$rootScope',
        function($scope, $location, $http, userLoginSrvc, $rootScope){
            
        console.log("Working?");

        $scope.user = {};
        $scope.user.name = userLoginSrvc.getUser();
        $scope.loggedIn = false;
        
        
        
        $rootScope.$on("loggedin", function(event, user){
            
            console.log(user);
            
            if(user.name){
                $scope.user.name = user.name;
            }
            else{
                
                $scope.user.name = userLoginSrvc.getUser();    
            }
            
            $scope.loggedIn = user.loggedIn;
            
        })
        
        $scope.logout = function(){
            
            userLoginSrvc.logout().then(function(response){
                //navigate to some page
                
            },
            function(err){
                console.log(err);
            })
        }
        
        
        $scope.areWeLoggedIn = function(){
            
            userLoginSrvc.currentlyLoggedIn().then(function(response){
                
                console.log(response);
                $scope.loggedIn = response;
            })
        }
        
        $scope.areWeLoggedIn();

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

'use strict';
angular.module("BossCollection.controllers")    
    .controller("rosterController", ["$scope",  'filterFilter', 'socketProvider', 'guildServices', '$http', '$cookies', '$location',
        function($scope, filterFilter, socketProvider, guildServices, $http, $cookies, $location){
            
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
    .factory('guildServices', ['$http','$q', '$resource', function ($http, $q, $resource) {

        var getMembersUrl = "https://us.api.battle.net/wow/guild/Zul'jin/mkdir%20Bosscollection?fields=members,items&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d"
        var blizzardBaseUrl = "https://us.api.battle.net/wow/guild/";
        var blizzardEndingUrl = "?fields=members&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";
        
        
        
        var apply = $resource('/api/applicationSubmission', {}, {});
        var getApplicationsUrl = $resource('/api/getApplications', {}, {});
        
        var guildApi = {
            getApplications: function(){
                
                var defer = $q.defer();
                
              getApplicationsUrl.get().$promise
                .then(function(applications){
                    
                    defer.resolve(applications);
                },
                function(err){
                    
                    defer.reject(err);
                })  
                
                return defer.promise;
            },
            validateCharacterName: function(characterName, realm) {
                var defer = $q.defer();
                var getCharacterUrl = "https://us.api.battle.net/wow/character/" + realm + "/" + characterName + "?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";        
                
                var getCharacter = $resource(getCharacterUrl, {}, {});
                
                getCharacter.get().$promise.then(function(data){
                   
                   defer.resolve(data);
                },
                function(err){
                    
                    defer.reject("Character not found");
                });
                
                return defer.promise;
            },
            
            getGuild: function(realm, guildName){
                var defer = $q.defer()
                
                if(realm != "" && guildName != ""){
                    var getMembersUrl = blizzardBaseUrl + encodeURIComponent(realm) + "/" + encodeURIComponent(guildName) + blizzardEndingUrl;
                }
                
                $http({method: 'GET', url: getMembersUrl}).then(function(data){
                   
                   defer.resolve(data.data.members);
                });
                
                return defer.promise;
            },
            submitApplication: function(newApplicant){
                var defer = $q.defer();
                
                var getCharacterUrl = "https://us.api.battle.net/wow/character/" + newApplicant.realm.name + "/" + newApplicant.character.name + "?fields=talents&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";      
                
                var getCharacter = $resource(getCharacterUrl, {}, {});
                
                getCharacter.get().$promise
                    .then(function (characterWithSpec) {

                            return characterWithSpec;
                        },
                        function (err) {

                            defer.reject("Character not found");
                        })
                    .then(function (characterWithSpec) {
                        
                        newApplicant.character.specs = characterWithSpec.talents;
                        
                        apply.save({ "newApplicant": newApplicant }).$promise.then(function (submitted) {

                            defer.resolve(submitted);
                        },
                        function (err) {

                            defer.reject(err);
                        })

                    })
                return defer.promise;
            }
        };

        return guildApi;
    }])
'use strict';



angular.module("BossCollection.services")
    .factory('realmServices', ['$http','$q',function ($http, $q) {

        var getRealmsUrl = "https://us.api.battle.net/wow/realm/status?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d"
        var realms = [];
        
        function parseRealNames() {
            
            

        }
        
        parseRealNames();
        
        var realmApi = {             

            getRealms: function(){
                var defer = $q.defer();

                if (realms.length == 0) {

                    $http({ method: 'GET', url: getRealmsUrl }).success(function (returnedRealms) {

                        //realms = _.pluck(returnedRealms.realms, "name");
                        realms = returnedRealms.realms;
                        defer.resolve(realms);
                        realms = realms;
                        //realms
                    });

                }
                else {
                    defer.resolve(realms);
                }
                
                return defer.promise; 
            } 
        };

        return realmApi;
    }])
'use strict';



angular.module("BossCollection.services")
    .factory('socketProvider', [function () {
        
        var socket = io("http://bosscollection.net:4001");
        //var socket = io("http://localhost:4001");
         
        return socket;
    }])
'use strict';

angular.module("BossCollection.services")
    .factory('userLoginSrvc', ['$resource', '$q', '$location', '$cookies', '$rootScope', function ($resource, $q, $location, $cookies, $rootScope) {
        
        var registration = $resource('/auth/signup', {},
            {
                
            })
        
        var login = $resource('/auth/login', {}, {})
        var logout = $resource('/auth/logout', {}, {});
        var loggedIn = $resource('/auth/loggedin', {}, {});
        var updateAccount = $resource('/auth/updateAccount', {}, {});
        var getUser = $resource('/auth/currentUser', {}, {});
        
        
        
        var accountApi = {
            
            updateAccount: function(updatedUser){
                
                var defer = $q.defer();
                
                updateAccount.save(updatedUser).$promise.then(function(response){
                    
                    
                    defer.resolve(response);
                },
                function(err){
                    console.log(err);
                    defer.reject(err.data);
                })
                
                return defer.promise;
            },
            getUser: function(){
                
                var defer = $q.defer();
                
                getUser.get().$promise.then(function(user){
                    
                    console.log(user);
                    defer.resolve(user);
                })
                return defer.promise;  
            },
            currentlyLoggedIn: function(){
                
                var defer = $q.defer();
                var loggedInBool = false;
                
                loggedIn.save({}).$promise.then(function(response){                
                    
                    if(response.loggedIn == true){
                        $cookies.put("name", response.user.name);
                        loggedInBool = true;    
                        $rootScope.$broadcast("loggedin", {name: response.user.name, loggedIn: true});
                    }
                    else{
                        
                        loggedInBool = false;
                    }
                    
                    
                    console.log(response);
                    defer.resolve(loggedInBool);
                    
                    //$cookies.set("name", response)
                },
                function(err){
                    
                    console.log(err);
                    defer.reject(err);
                    
                })
                
                return defer.promise; 
            },
            logout: function(){
                
                var defer = $q.defer();
               
                
                logout.save({}).$promise.then(function(result){
                    
                    if(result.loggedOut == true){                        
                        
                        $rootScope.$broadcast("loggedin" , {loggedIn: false});
                    }
                    
                    $location.path("/");
                    
                }, function(){
                    
                    console.log("WTF, delete cookies anyways...");
                    
                    $cookies.remove("name");
                    $cookies.remove("password");
                    $rootScope.$broadcast("loggedin", {loggedIn: false});
                    
                    $location.path("/");
                })
                
                
                
                return defer.promise;
            },
            registerNewUser: function (newUser) {
                
                var defer = $q.defer();
                
                console.log("Register new user");
                //socket.emit("getBossInfo", boss); 
                
      
                
                registration.save(newUser).$promise.then(function(result){
                    
                    console.log("Registration successfull. Redirecting to login page");
                    console.log(result);
                    
                    $location.path("/auth/login");
                }, function(err){
                    console.log(err.data);
                    defer.reject(err.data);
                })
                
                return defer.promise;
            },
            login: function (user) {
                var defer = $q.defer();
                
                login.save(user).$promise.then(function(result){
                    
                    $cookies.put("name", user.name);
                    $rootScope.$broadcast("loggedin", {name: user.name, loggedIn:true});
                    $location.path("/");
                    
                },
                function(err){
                    
                    defer.reject(err.data);
                })
                
                return defer.promise;
            }
        };

        return accountApi;
    }])
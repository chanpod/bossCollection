'use Strict'
angular.module("BossCollection.controllers", ['BossCollection.services'])
    .controller("homeController", ["$scope", '$location', '$http', 'charService', '$timeout', 'guildServices', 'raidProgression',
        function($scope, $location, $http, charService, $timeout, guildServices, raidProgression){

            (adsbygoogle = window.adsbygoogle || []).push({});



        $scope.stroke = 9;
        $scope.radius = 40;
        $scope.progressColor = "#069";
        $scope.bgColor = '#eaeaea';
        $scope.isSemi = false;
        $scope.showGuild = false;

        $scope.welcomeMessage = "Welcome to your Boss Collection";
        $scope.guild = "";
        $scope.realm = "Zul'jin";
        $scope.characterName = "";
        $scope.character = {};
        $scope.classColor = "shamanClassColor";
        $scope.iLvl = "";
        $scope.achievmentPoints = $scope.character.achievementPoints;
        $scope.characterImage = "";
        $scope.showLoadingGif = false;

        var progressionData = raidProgression.getRaidsData();

        $scope.wodNormalsData = progressionData.wodNormalsData;

        $scope.wodHeroicData = progressionData.wodHeroicData;

        $scope.wodMythicData = progressionData.wodMythicData;

        $scope.mopNormalData = progressionData.mopNormalData;

        $scope.mopHeroicData = progressionData.mopHeroicData;

        $scope.cataNormalData = progressionData.cataNormalData;

        $scope.cataHeroicData = progressionData.cataHeroicData;

        $scope.wotlkData = progressionData.wotlkData;

        $scope.$watch('character', function (newValue, oldValue) {
            $scope.achievmentPoints = $scope.character.achievementPoints;
        }, true);

        $scope.getGuild = function(){
            $scope.showLoadingGif = true;
            var promise = guildServices.getGuild($scope.realm, $scope.guild);

            promise.then(function(data){
                console.log(data);
                var promise2 = guildServices.checkGuild(data.achievements);

                promise2.then(function(data){

                    console.log(data);
                    progressionData = data.killCount;
                }, function(error){
                    console.log(error);
                })
            },function(error){
                console.log(error);
                    $scope.showLoadingGif = false;
            });
        };

        $scope.getCharacter = function() {

            $scope.showLoadingGif = true;

            var promise = charService.getCharacter($scope.realm, $scope.characterName);

            promise.then(function(result){
                $scope.character = result;

                $scope.classColor = charService.getClass($scope.character) + "ClassColor";

                $scope.iLvl = charService.getiLvl($scope.character);

                $scope.characterImage = staticResources + result.thumbnail;
                $scope.showGuild = true;
                $scope.showLoadingGif = false;

            },
            function(error){
                console.log(error);
                $scope.showLoadingGif = false;
            });


            $timeout(function(){
                $scope.showLoadingGif = false;
            }, 5000);
        }

    }]).controller("mkdirController", ["$scope", '$location', '$http', 'charService', '$timeout', 'guildServices', 'raidProgression', '$modal',
        function($scope, $location, $http, charService, $timeout, guildServices, raidProgression, $modal){


            var disqus_shortname = 'bosscollectionnet'; // required: replace example with your forum shortname
            var disqus_identifier = '/mkdir';
            
                /* * * DON'T EDIT BELOW THIS LINE * * */
            (function() {
                var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
                dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
                (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
            })();

            $scope.currentEmbedUrl = "";

            $scope.setUrl = function(newUrl){
                $scope.currentEmbedUrl = newUrl;
            }

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

            $scope.highmaulBossInfo = {
                "0kargath" : {
                    "embeddedUrl" : "D5QqzwJIPa0",
                    "name" : "Kargath Bladefist",
                    "stratUrl" : "http://www.icy-veins.com/wow/kargath-bladefist-strategy-guide-preview",
                    "img" : "Highmaul/kargath.png",
                    "wowheadNPCNum" : "87444"
                },
                "1butcher" : {
                    "embeddedUrl" : "QkLExQUJgW4",
                    "name" : "The Butcher",
                    "stratUrl" : "http://www.icy-veins.com/wow/the-butcher-strategy-guide-preview",
                    "img" : "Highmaul/theButcher.png",
                    "wowheadNPCNum" : "87447"
                },
                "2Tectus" : {
                    "embeddedUrl" : "C0VYzWNYDF0",
                    "name" : "Tectus",
                    "stratUrl" : "http://www.icy-veins.com/wow/tectus-strategy-guide-preview",
                    "img" : "Highmaul/tectus.png",
                    "wowheadNPCNum" : "87446"
                },
                "3brackenspore" : {
                    "embeddedUrl" : "mIdrE_7iqc8",
                    "name" : "Brackenspore",
                    "stratUrl" : "http://www.icy-veins.com/wow/brackenspore-strategy-guide-preview",
                    "img" : "Highmaul/brackenspore.png",
                    "wowheadNPCNum" : "87441"
                },
                "4twinOgron" : {
                    "embeddedUrl" : "AJ4xo4jqJlU",
                    "name" : "Twin Ogron",
                    "stratUrl" : "http://www.icy-veins.com/wow/twin-ogron-strategy-guide-preview",
                    "img" : "Highmaul/twinOgron.png",
                    "wowheadNPCNum" : "87449"
                },
                "5koragh" : {
                    "embeddedUrl" : "y9ha5_IkI7A",
                    "name" : "Ko'ragh",
                    "stratUrl" : "http://www.icy-veins.com/wow/ko-ragh-strategy-guide-preview",
                    "img" : "Highmaul/ko'ragh.png",
                    "wowheadNPCNum" : "87445"
                },
                "6margok" : {
                    "embeddedUrl" : "i4OMq9fYgVY",
                    "name" : "Imperator Mar'gok",
                    "stratUrl" : "http://www.icy-veins.com/wow/imperator-mar-gok-strategy-guide-preview",
                    "img" : "Highmaul/imperatorMar'gok.png",
                    "wowheadNPCNum" : "87818"
                }
            }

            }]).controller("videoController", ['$scope', 'currentUrl',
                function($scope, currentUrl){

                    $scope.url = currentUrl;

                    $scope.getIframeSrc = function() {
                        return 'https://www.youtube.com/embed/' + $scope.url;
                    };

                    $scope.embedUrl = $scope.url;
                }]);













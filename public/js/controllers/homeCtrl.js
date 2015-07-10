'use strict';
/**
 * This is the description for my class.
 *
 * @class Controllers
 * @constructor No Controller
 */
bc.module("BossCollection.controllers", ['BossCollection.services'])
    .controller("homeController", ["$scope", '$location', '$http', 'charService', '$timeout', 'guildServices',
        function($scope, $location, $http, charService, $timeout, guildServices){

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

        /**
         *  Gets the guild
         *
         *  @method getGuild
         */
        $scope.getGuild = function(){
            $('#getGuildMessage').popover("hide");
            $scope.showLoadingGif = true;
            var promise = guildServices.getGuild($scope.realm, $scope.guild);

            var errorTimeout = $timeout(function(){
                $scope.showLoadingGif = false;
                $('#getGuildMessage').popover("show");


            }, 6000)

            promise.then(function(data){

                var promise2 = guildServices.checkGuild(data.achievements);

                promise2.then(function(data){

                    $timeout.cancel(errorTimeout);

                    progressionData = data.killCount;

                    $scope.showLoadingGif = false;
                    $('#getGuildMessage').popover("hide");

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

    }])
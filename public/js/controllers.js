'use Strict'
angular.module("BossCollection.controllers", ['BossCollection.services'])
    .controller("homeController", ["$scope", '$location', '$http', 'charService', '$timeout', 'guildServices', 'raidProgression',
        function($scope, $location, $http, charService, $timeout, guildServices, raidProgression){

            (adsbygoogle = window.adsbygoogle || []).push({});

            twitter();

            $scope.myInterval = 10000;
            var listofImages = [{image: '/images/InterfaceSS/defragInterface.jpg', text: "Defragmentors Interface!"},
                {image: '/images/InterfaceSS/caesarInterface.jpg', text: "Caesar's Interface!"},
                {image: 'http://i.imgur.com/TLEGKlY.jpg', text: "Szii's Interface!"}
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

            /*
        var progressionData = raidProgression.getRaidsData();

        $scope.wodNormalsData = progressionData.wodNormalsData;

        $scope.wodHeroicData = progressionData.wodHeroicData;

        $scope.wodMythicData = progressionData.wodMythicData;

        $scope.mopNormalData = progressionData.mopNormalData;

        $scope.mopHeroicData = progressionData.mopHeroicData;

        $scope.cataNormalData = progressionData.cataNormalData;

        $scope.cataHeroicData = progressionData.cataHeroicData;

        $scope.wotlkData = progressionData.wotlkData;
*/

        $scope.$watch('character', function (newValue, oldValue) {
            $scope.achievmentPoints = $scope.character.achievementPoints;
        }, true);

            $('#getGuildMessage').popover({
                content: 'Seems to be taking a while. ' +
                'Did you spell the guild name correctly? Sometimes this functionality can be blocked by corporate firewalls.' +
                    'Could be something just broke :( ',
                trigger: 'manual'
            })

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

    }]).controller("mkdirController", ["$scope", '$location', '$http', 'charService', '$timeout', 'guildServices', 'raidProgression', '$modal', 'socket',
        function($scope, $location, $http, charService, $timeout, guildServices, raidProgression, $modal, socket){


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

        }]).controller("videoController", ['$scope', 'currentUrl',
            function($scope, currentUrl){

                $scope.url = currentUrl;

                $scope.getIframeSrc = function() {
                    return 'https://www.youtube.com/embed/' + $scope.url;
                };

                $scope.embedUrl = $scope.url;
        }]).controller("strategyRoomController", ['$scope',
            function($scope){



        }]).controller("bossStrategyController", ['$scope', 'bossStrats', '$modal',
            function($scope, bossStrats, $modal){

                (adsbygoogle = window.adsbygoogle || []).push({});

                socket.on("bossInfoData", function(data){

                    $scope.highmaulBosses = data.highmaul;
                    $scope.brfBosses = data.brf;
                    $scope.$apply();

                });

                bossStrats.getStrats();

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
        }]).controller("progressionController", ["$scope", 'cookies', 'filterFilter', 'socketProvider',
            function($scope, cookies, filterFilter, socketProvider){

                $scope.messages = [];
                $scope.filteredMessages = [];
                $scope.chatFilters = [];
                $scope.systemFilter = {};
                $scope.systemMute = false;
                $scope.users = {
                    userName : "",
                    muted : false
                };

                $scope.chatRoomName = "";

                var socket = socketProvider;

                $scope.hasEnteredUsername = false;

                $scope.userName = cookies.getUserName();

                $scope.createChatroom = function(userToAdd){
                    var roomParticipants = {
                        user1: $scope.userName,
                        user2: userToAdd
                    };

                    socket.emit("createChatroom", roomParticipants);
                    console.log("Joined the chat room");
                    $scope.chatRoomName = roomParticipants.user1 + "&" + roomParticipants.user2;
                };

                socket.on("inviteUsersToChatroom", function(users){
                    console.log("Invited to join chat room");
                    console.log(users);
                    if($scope.userName == users.user2){

                        console.log("Accepted invitation to join chat room");
                        socket.emit("acceptInvitation", users);

                        $scope.chatRoomName = users.user1 + "&" + users.user2;
                    }
                    else{
                        console.log("Invitation was not meant for you.");
                    }
                });

                if($scope.userName != null){
                    $scope.hasEnteredUsername = true;
                    socket.emit("init", $scope.userName);
                }

                $scope.open = function (url) {
                    $scope.setUrl(url);

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
                };

                socket.on("rejectUser", function(){
                    $scope.hasEnteredUsername = false;
                    alert("Username already in use. Try another one.");
                });

                socket.on("messagesFromServer", function(messages){
                    console.log("Message from server!");
                    $scope.messages = messages;
                    $scope.$apply();
                });

                socket.on("userConn_Disc", function(userList, messages){

                    $scope.messages = messages;

                    $scope.buildUsersList(userList);
                    $scope.$apply();
                });

                $scope.buildUsersList = function(usersList){
                    $scope.users = [];

                    for(i = 0; i< usersList.length; i++){
                        var user = {
                            userName : usersList[i],
                            muted : false
                        };
                        $scope.users.push(user);
                    }

                };

                $scope.$watch('messages', function(newMessages){
                    $scope.filteredMessages = newMessages;
                    $scope.applyFilter();
                });

                $scope.messageToSend = "";
                $scope.submitMessage = function(){
                    if($scope.chatRoomName == "") {
                        if ($scope.messageToSend == "") {
                            //Do nothing
                        }
                        else {
                            var message = {
                                userName: $scope.userName,
                                message: $scope.messageToSend
                            };
                            socket.emit("newMessage", message);
                            $scope.messageToSend = "";
                        }
                    }
                    else{

                        if ($scope.messageToSend == "") {
                            //Do nothing
                        }
                        else {
                            var message = {
                                userName: $scope.userName,
                                message: $scope.messageToSend,
                                chatRoom: $scope.chatRoomName
                            };
                            socket.emit("chatRoomMessage", message);
                            $scope.messageToSend = "";
                        }
                    }
                };

                $scope.hideSystemMessages = function(systemFilter){

                    if($scope.systemFilter.userName != systemFilter) {
                        $scope.systemFilter.userName = systemFilter
                    }
                    else{
                        $scope.systemFilter.userName = '';
                    }
                };

                $scope.applyFilter = function(){

                    $scope.filteredMessages = $scope.messages;


                    for(i = 0; i < $scope.chatFilters.length; i++) {

                        $scope.filteredMessages = filterFilter($scope.filteredMessages, $scope.chatFilters[i]);
                    }


                };

                $scope.filterUser = function(userToFilter){

                    if(userToFilter.userName == "System") {
                        $scope.systemMute = !$scope.systemMute
                    }
                    userToFilter.muted = !userToFilter.muted; //Reverse the bool

                    var doesExist = binarySearch("!"+userToFilter.userName, $scope.chatFilters);

                    if(doesExist == null) {

                        $scope.chatFilters.push("!" + userToFilter.userName);
                    }
                    else{

                        $scope.chatFilters.remove(doesExist);
                    }

                    $scope.applyFilter();
                };

                $scope.enterUsername = function(){
                    if($scope.userName == ""){
                        alert("invalid username");
                    }
                    else if($scope.userName.length > 15){
                        alert("Invalid username. Too long! Must be less than 15 char.");
                    }
                    else {
                        $scope.hasEnteredUsername = true;
                        socket.emit("init", $scope.userName);
                        cookies.saveUserName($scope.userName);
                    }
                };

                $scope.myInterval = 10000;
                var listofImages = [
                    {image: '/images/BossKills/ImpKill.jpg', text: "Normal Imperator Down!"},
                    {image: '/images/BossKills/Heroic_Imp_Kill.jpg', text: "Heroic Imperator Down!"},
                    {image: '/images/BossKills/silly_imp_kill.jpg', text: "Goofy Shot for heroic Imp kill"}
                ];

                var slides = $scope.slides = [];
                $scope.addSlide = function(index) {
                    slides.push(listofImages[index]);
                };

                for(var i =0; i < listofImages.length; i++) {
                    $scope.addSlide(i);
                }

                var userConDiscCallback = function(error, messages, users){
                    if(error){
                        console.log(error);
                        return;
                    }

                    $scope.messages = messages;
                    $scope.users = users;
                }

    }]);

function binarySearch(key, inputArray) {

    for(var i = 0; i < inputArray.length; i++){
        if(inputArray[i] == key){
            return i;
        }
    }

    return null;
}

function remove(from, to) {


    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};











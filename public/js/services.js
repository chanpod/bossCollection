'use strict';

/* Services */
var service = angular.module("BossCollection.services", ["ngResource"]);
var local = "locale=en_US";
var endUrl = local + "&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d&jsonp=JSON_CALLBACK";
var blizzApiRoot = "https://us.api.battle.net/wow/";
var getItems = "fields=items";
var getClasses = "data/character/classes";
var getGuild = "fields=achievements,members";

//https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d
//https://us.api.battle.net/wow/guild/Zul'jin/crux?fields=achievements&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d
var classes = ["warrior", "paladin", "hunter", "rogue", "priest", "dk", "shaman", "mage", "warlock","monk","druid"]

service.factory('socket', function(mySocket){

    var socket = mySocket;
    socket.connect('http://localhost:4001/');

    return {
        on: function (eventName, callback) {
            console.log("Initializing socket");
            socket.on(eventName, function () {
                console.log("Socket initialized.");
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            console.log("Emitting...");
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };

}).factory('charService', function($http, $q){

        var charApi = {
            getCharacter: function (realm, charName){
                var deferred = $q.defer();

                var charInfo = "character/" + realm + "/" + charName + "?" + getItems + ",progression,guild,talents,";
                var url = blizzApiRoot + charInfo + '?' + local + '&' + endUrl;
                $http.jsonp(url).success(function (data) {
                    console.log(data);
                    deferred.resolve(data)
                });

                return deferred.promise;
            },
            getClass: function(character){
                var className = "";

                classes.forEach(function(result, index){
                    if(character.class - 1 === index){
                        className = result;
                    }
                });



                return className;
            },
            getiLvl: function(character){
                //https://us.api.battle.net/wow/character/Zul'jin/Defragmentor?fields=items&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d

                    return character.items.averageItemLevelEquipped

            },
            getSpecs: function(character){
                return character.items.averageItemLevelEquipped
            },
        };

    return charApi;
    }).factory('guildServices', function($http, $q){
        //terrace,
        //var mopRaidAchIds = ["6689"];

        var guildApi = {
            checkGuild: function(achievements) {
//moguCriteria, hofCriteria, terraceCriteria,totCriteria, sooCriteria
                var deferred = $q.defer();

                if (achievements.criteria) {

                    var guildCriteria = achievements.criteria;

                    checkMOP(guildCriteria);
                    checkWOD(guildCriteria);

                    deferred.resolve(raidProgression);

                }


                return deferred.promise;
            },

            getGuild: function(realm, guildName){

                var deferred = $q.defer();
                var url = blizzApiRoot + "/guild/" + realm + "/" + guildName + '?' + getGuild + "&" + endUrl;

                $http.jsonp(url).success(function (data) {
                    console.log(data);
                    deferred.resolve(data)
                });

                return deferred.promise;
            }
        };

        return guildApi;
    }).factory('raidProgression', function(){

    var progressionApi = {

        getRaidsData: function() {

            return raidProgression;
        }
    };

    return progressionApi;
}).factory('bossStrats', function(){

    var bossStratsApi = {

        getStrats: function() {

            return raidBossesInfo;
        }
    };

    return bossStratsApi;
})

var raidBossesInfo = {

    "highmaulBossInfo" : {
        "0kargath": {
            "embeddedUrl": "D5QqzwJIPa0",
            "name": "Kargath Bladefist",
            "stratUrl": "http://www.icy-veins.com/wow/kargath-bladefist-strategy-guide-preview",
            "embeddedUrlFatboss" : "KpzfmKTZp8U",
            "img": "Highmaul/kargath.png",
            "wowheadNPCNum": "87444"
        },
        "1butcher": {
            "embeddedUrl": "QkLExQUJgW4",
            "name": "The Butcher",
            "stratUrl": "http://www.icy-veins.com/wow/the-butcher-strategy-guide-preview",
            "embeddedUrlFatboss" : "yIS0jjmcFgE",
            "img": "Highmaul/theButcher.png",
            "wowheadNPCNum": "87447"
        },
        "2Tectus": {
            "embeddedUrl": "C0VYzWNYDF0",
            "name": "Tectus",
            "stratUrl": "http://www.icy-veins.com/wow/tectus-strategy-guide-preview",
            "embeddedUrlFatboss" : "wNbJmeNLkjo",
            "img": "Highmaul/tectus.png",
            "wowheadNPCNum": "87446"
        },
        "3brackenspore": {
            "embeddedUrl": "mIdrE_7iqc8",
            "name": "Brackenspore",
            "stratUrl": "http://www.icy-veins.com/wow/brackenspore-strategy-guide-preview",
            "embeddedUrlFatboss" : "fsXhQtEKzms",
            "img": "Highmaul/brackenspore.png",
            "wowheadNPCNum": "87441"
        },
        "4twinOgron": {
            "embeddedUrl": "AJ4xo4jqJlU",
            "name": "Twin Ogron",
            "stratUrl": "http://www.icy-veins.com/wow/twin-ogron-strategy-guide-preview",
            "embeddedUrlFatboss" : "",
            "img": "Highmaul/twinOgron.png",
            "wowheadNPCNum": "87449"
        },

        "5koragh": {
            "embeddedUrl": "y9ha5_IkI7A",
            "name": "Ko'ragh",
            "stratUrl": "http://www.icy-veins.com/wow/ko-ragh-strategy-guide-preview",
            "embeddedUrlFatboss" : "XSeMw7-byOA",
            "img": "Highmaul/ko'ragh.png",
            "wowheadNPCNum": "87445"
        },
        "6margok": {
            "embeddedUrl": "i4OMq9fYgVY",
            "name": "Imperator Mar'gok",
            "stratUrl": "http://www.icy-veins.com/wow/imperator-mar-gok-strategy-guide-preview",
            "embeddedUrlFatboss" : "",
            "img": "Highmaul/imperatorMar'gok.png",
            "wowheadNPCNum": "87818"
        }
    },
    "blackrockFoundryBossInfo" : {
        "00" : {
            "embeddedUrl": "7w6Cxv3C8lc",
            "name": "Gruul",
            "stratUrl": "http://www.icy-veins.com/wow/gruul-strategy-guide-normal-heroic",
            "embeddedUrlFatboss" : "QrN5W7VxZ7Y",
            "img": "",
            "wowheadNPCNum": "76877"
        },
        "01" : {
            "embeddedUrl": "zoZR_twO7VI",
            "name": "Oregorger",
            "stratUrl": "http://www.icy-veins.com/wow/oregorger-strategy-guide-normal-heroic",
            "embeddedUrlFatboss" : "i0mGJkRLz3A",
            "img": "",
            "wowheadNPCNum": "77182"
        },
        "02" : {
            "embeddedUrl": "FUafR44FBKQ",
            "name": "The Blast Furnace",
            "stratUrl": "http://www.icy-veins.com/wow/the-blast-furnace-strategy-guide-normal-heroic",
            "embeddedUrlFatboss" : "tDzhPwDzdOc",
            "img": "",
            "wowheadNPCNum": "76806"
        },
        "03" : {
            "embeddedUrl": "H3JYPNYdCWA",
            "name": "Hans'gar and Franzok",
            "stratUrl": "http://www.icy-veins.com/wow/hans-gar-and-franzok-strategy-guide-normal-heroic",
            "embeddedUrlFatboss" : "FW4zMMtiXsw",
            "img": "",
            "wowheadNPCNum": "76973"
        },
        "04" : {
            "embeddedUrl": "uRYBm66s3-A",
            "name": "Flamebender Ka'graz",
            "stratUrl": "http://www.icy-veins.com/wow/flamebender-ka-graz-strategy-guide-normal-heroic",
            "embeddedUrlFatboss" : "vAViKBYoAFg",
            "img": "",
            "wowheadNPCNum": "76814"
        },
        "05" : {
            "embeddedUrl": "G4SPS2rV3So",
            "name": "Kromog",
            "stratUrl": "http://www.icy-veins.com/wow/kromog-strategy-guide-normal-heroic",
            "embeddedUrlFatboss" : "0BjCnIuTNbA",
            "img": "",
            "wowheadNPCNum": "77692"
        },
        "06" : {
            "embeddedUrl": "s9-YdfBoddk",
            "name": "Beastlord Darmac",
            "stratUrl": "http://www.icy-veins.com/wow/beastlord-darmac-strategy-guide-normal-heroic",
            "embeddedUrlFatboss" : "6ThCMYtspNU",
            "img": "",
            "wowheadNPCNum": "76865"
        },
        "07" : {
            "embeddedUrl": "xxxx",
            "name": "Operator Thogar",
            "stratUrl": "http://www.icy-veins.com/wow/operator-thogar-strategy-guide-normal-heroic",
            "embeddedUrlFatboss" : "Yb1KCCMXPeU",
            "img": "",
            "wowheadNPCNum": "76906"
        },
        "08" : {
            "embeddedUrl": "xxxx",
            "name": "The Iron Maidens",
            "stratUrl": "",
            "embeddedUrlFatboss" : "QnXH9Py-8_Y",
            "img": "",
            "wowheadNPCNum": "77557"
        },
        "09" : {
            "embeddedUrl": "xxxx",
            "name": "Blackhand",
            "stratUrl": "",
            "embeddedUrlFatboss" : "",
            "img": "",
            "wowheadNPCNum": "77325"
        }
    }
}

var sooCriteria = [23692, 23693, 23694, 23695,
    23696, 23697, 23698, 23699,
    23700, 23702, 23703, 23701,
    23704, 23705];

var moguCriteria = [22384, 19485, 19486, 19487, 19114, 19488];

var hofCriteria = [19489, 19490, 19491, 19630, 19492, 19493];

var terraceCriteria = [19651, 19652, 19494, 19495];

var totCriteria = [23072, 23073, 23074, 23075, 23076, 23077, 23078, 23079, 23080, 23081, 23082, 23083];

var hmCriteria = [25713, 25714, 25715, 25716, 25717, 25718, 25719];

var brfCriteria = [25720, 25721, 25722, 25723, 25724, 25725, 25726, 25727, 25728, 25729];

var checkMOP = function(guildCriteria){

   var killCount = 0;
    var totalKills = 0;
//===================Begin MOP Normals ===============================
    sooCriteria.forEach(function (raidID) {
        if (binarySearch(raidID, guildCriteria)) {

            killCount++;
        }
    })
    raidProgression.mopNormalData["4soo"].currentKills = killCount;

    totalKills += killCount;
    killCount = 0;

    moguCriteria.forEach(function (raidID) {
        if (binarySearch(raidID, guildCriteria)) {

            killCount++;
        }
    })
    raidProgression.mopNormalData["0msv"].currentKills = killCount;

    totalKills += killCount;
    killCount = 0;

    hofCriteria.forEach(function (raidID) {
        if (binarySearch(raidID, guildCriteria)) {

            killCount++;
        }
    })
    raidProgression.mopNormalData["1hof"].currentKills = killCount;

    totalKills += killCount;
    killCount = 0;

    terraceCriteria.forEach(function (raidID) {
        if (binarySearch(raidID, guildCriteria)) {

            killCount++;
        }
    })
    raidProgression.mopNormalData["2tos"].currentKills = killCount;

    totalKills += killCount;
    killCount = 0;

    totCriteria.forEach(function (raidID) {
        if (binarySearch(raidID, guildCriteria)) {

            killCount++;
        }
    })
    raidProgression.mopNormalData["3tot"].currentKills = killCount;

    totalKills += killCount;
    killCount = 0;

    raidProgression.mopNormalData["5total"].currentKills = totalKills;
}

var checkWOD = function(guildCriteria){

    var killCount = 0;
    var totalKills = 0;

    hmCriteria.forEach(function (raidID) {
        if (binarySearch(raidID, guildCriteria)) {

            killCount++;
        }
    })
    raidProgression.wodNormalsData["0hm"].currentKills = killCount;

    totalKills += killCount;
    killCount = 0;

    brfCriteria.forEach(function (raidID) {
        if (binarySearch(raidID, guildCriteria)) {

            killCount++;
        }
    })
    raidProgression.wodNormalsData["1brf"].currentKills = killCount;

    totalKills += killCount;
    killCount = 0;

    raidProgression.wodNormalsData["3total"].currentKills = totalKills;
}

var raidProgression = {
    "wodNormalsData" : {
        "0hm": {
            "name": "Highmaul",
            "currentKills": 0,
            "total": 7
        },
        "1brf": {
            "name": "Blackrock Foundry",
            "currentKills": 0,
            "total": 10
        },
        "3total": {
            "name": "Total",
            "total": 17,
            "currentKills": 0
        }
    },
    "wodHeroicData" : {
        "0hm": {
            "name": "Highmaul",
            "currentKills": 0,
            "total": 7
        },
        "1brf": {
            "name": "Blackrock Foundry",
            "currentKills": 0,
            "total": 10
        },
        "2total": {
            "name": "Total",
            "total": 17,
            "currentKills": 0
        }
    },

    "wodMythicData" : {
        "0hm": {
            "name": "Highmaul",
            "currentKills": 0,
            "total": 7
        },
        "1brf": {
            "name": "Blackrock Foundry",
            "currentKills": 0,
            "total": 10
        },
        "2total": {
            "name": "Total",
            "total": 17,
            "currentKills": 0
        }
    },

    "mopNormalData" : {
        "0msv": {
            "name": "Mogu'shan vaults",
            "currentKills": 0,
            "total": 6
        },
        "1hof": {
            "name": "Heart of Fear",
            "currentKills": 0,
            "total": 6
        },
        "2tos": {
            "name": "Terrace of Endless Spring",
            "currentKills": 0,
            "total": 4
        },
        "3tot": {
            "name": "Throne of Thunder",
            "currentKills": 0,
            "total": 12
        },
        "4soo": {
            "name": "Siege of Orgrimmar",
            "currentKills": 0,
            "total": 14
        },
        "5total": {
            "name": "Total",
            "total": 42,
            "currentKills": 0
        }

    },

    "mopHeroicData" : {
        "0msv": {
            "name": "Mogu'shan vaults",
            "currentKills": 0,
            "total": 6
        },
        "1hof": {
            "name": "Heart of Fear",
            "currentKills": 0,
            "total": 6
        },
        "2tos": {
            "name": "Terrace of Endless Spring",
            "currentKills": 0,
            "total": 4
        },
        "3tot": {
            "name": "Throne of Thunder",
            "currentKills": 0,
            "total": 13
        },
        "4soo": {
            "name": "Siege of Orgrimmar",
            "currentKills": 0,
            "total": 14
        },
        "5total": {
            "name": "Total",
            "total": 43,
            "currentKills": 0
        }
    },

    "cataNormalData" : {
        "0bwd": {
            "name": "Blackwing Descent",
            "currentKills": 0,
            "total": 6
        },
        "1bot": {
            "name": "Bastion of Twilight",
            "currentKills": 0,
            "total": 5
        },
        "2tfw": {
            "name": "Throne of the Four Winds",
            "currentKills": 0,
            "total": 2
        },
        "3bd": {
            "name": "Baradin Hold",
            "currentKills": 0,
            "total": 3
        },
        "4firelands": {
            "name": "Firelands",
            "currentKills": 0,
            "total": 7
        },
        "5ds": {
            "name": "DragonSoul",
            "currentKills": 0,
            "total": 8
        },
        "6total": {
            "name": "Total",
            "total": 31,
            "currentKills": 0
        }
    },

    "cataHeroicData" : {
        "0bwd": {
            "name": "Blackwing Descent",
            "currentKills": 0,
            "total": 6
        },
        "1bot": {
            "name": "Bastion of Twilight",
            "currentKills": 0,
            "total": 5
        },
        "2tfw": {
            "name": "Throne of the Four Winds",
            "currentKills": 0,
            "total": 2
        },
        "3bd": {
            "name": "Baradin Hold",
            "currentKills": 0,
            "total": 3
        },
        "4firelands": {
            "name": "Firelands",
            "currentKills": 0,
            "total": 7
        },
        "5ds": {
            "name": "DragonSoul",
            "currentKills": 0,
            "total": 8
        },
        "6total": {
            "name": "Total",
            "total": 31,
            "currentKills": 0
        }
    },

    "wotlkData" : {
        "0nax": {
            "name": "Naxxramas",
            "currentKills": 0,
            "total": 19
        },
        "1onyx": {
            "name": "Bastion of Twilight",
            "currentKills": 0,
            "total": 1
        },
        "2eoe": {
            "name": "Eye of Eternity",
            "currentKills": 0,
            "total": 1
        },
        "3voa": {
            "name": "Vault of Archavon",
            "currentKills": 0,
            "total": 4
        },
        "4coa": {
            "name": "Chamber of Aspects",
            "currentKills": 0,
            "total": 2
        },
        "5cc": {
            "name": "Crusaders' Coliseum",
            "currentKills": 0,
            "total": 5
        },
        "6ulduar": {
            "name": "Ulduar",
            "currentKills": 0,
            "total": 14
        },
        "7icc": {
            "name": "Ice Crown Citadel",
            "currentKills": 0,
            "total": 12
        },
        "8total": {
            "name": "Total",
            "total": 58,
            "currentKills": 0
        }
    }
};



function binarySearch(key, inputArray) {

    var low  = 0,
        high = inputArray.length - 1,
        mid;

    while (low <= high) {
        mid = low + (high - low) / 2;
        if ((mid % 1) > 0) { mid = Math.ceil(mid); }

        if (key < inputArray[mid]) { high = mid - 1; }
        else if (key > inputArray[mid]) { low = mid + 1; }
        else { return mid; }
    }

    return null;
}

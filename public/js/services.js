'use strict';

/* Services */
var service = angular.module("BossCollection.services", ["ngResource"]);
var local = "locale=en_US";
var endUrl = local + "&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d&jsonp=JSON_CALLBACK";
var blizzApiRoot = "https://us.api.battle.net/wow/";
var getItems = "fields=items";
var getClasses = "data/character/classes";
var getGuild = "fields=achievements";
var staticResources = "http://us.battle.net/static-render/us/";
//https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d
//https://us.api.battle.net/wow/guild/Zul'jin/crux?fields=achievements&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d
var classes = ["warrior", "paladin", "hunter", "rogue", "priest", "dk", "shaman", "mage", "warlock","monk","druid"];

service.factory('charService', function($http, $q){

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

        var guildApi = {
            checkGuild: function(achievements) {

                var deferred = $q.defer();
                console.log("test");
                var url = "http://bosscollection.net/checkGuild&jsonp=JSON_CALLBACK";
                $http.jsonp(url).success(function (data) {
                    console.log("testInner");
                    deferred.resolve(data);

                },function(error){
                    deferred.reject(error);
                });
                return deferred.promise;
            },

            getGuild: function(realm, guildName){

                var deferred = $q.defer();
                var url = blizzApiRoot + "/guild/" + realm + "/" + guildName + '?' + getGuild + "&" + endUrl;


                    $http.jsonp(url).success(function (data) {
                        console.log(data);
                        deferred.resolve(data)
                    }, function (error) {
                        deferred.reject(error);
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
})


var raidProgression = {
         "wodNormalsData" : {
            "0hm": {
                "name": "Highmaul",
                "currentKills": 4,
                "total": 7
            },
            "1brf": {
                "name": "Blackrock Foundry",
                "currentKills": 0,
                "total": 7
            },
            "2world": {
                "name": "World Bosses",
                "currentKills": 0,
                "total": 3
            },
            "3total": {
                "name": "Total",
                "total": 17,
                "currentKills": 17
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
            "total": 7
        },
        "2total": {
            "name": "Total",
            "total": 14,
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
            "total": 7
        },
        "2total": {
            "name": "Total",
            "total": 14,
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
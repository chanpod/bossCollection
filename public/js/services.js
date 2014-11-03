'use strict';

/* Services */
var service = angular.module("BossCollection.services", ["ngResource"]);
var local = "locale=en_US";
var endUrl = "&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d&jsonp=JSON_CALLBACK";
var blizzApiRoot = "https://us.api.battle.net/wow/";
var getItems = "fields=items";
var getClasses = "data/character/classes";
//https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d
var classes = ["warrior", "paladin", "hunter", "rogue", "priest", "dk", "shaman", "mage", "warlock","monk","druid"]

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
    }).factory('guildServices', function(){



    return guildApi;
    });

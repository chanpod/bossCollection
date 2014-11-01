'use strict';

/* Services */
var service = angular.module("BossCollection.services", ["ngResource"]);
var rootURL
var apiKey = "apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d";
var jsonP = "jsonp=JSON_CALLBACK";
var blizzApiRoot = "https://us.api.battle.net/wow/";

service.factory('charService', function($http){

        var charApi = {
            getCharacter: function (realm, charName){

                var charInfo = "character/" + realm + "/" + charName;
                var url = blizzApiRoot + charInfo + '?locale=en_US&' + apiKey + '&' + jsonP;
                $http.jsonp(url).success(function (data) {
                    console.log(data);
                });
            }
        }

    return charApi;
    }).factory('guildServices', function(){

        var guildApi = {

        }

    return guildApi;
    });

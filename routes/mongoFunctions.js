"use strict";

var databaseUrl = "bosscollection";
var collections = ["raidBossInfo"];
var db = require("mongojs").connect(databaseUrl, collections);
var q = require('q');

var getRaidBossInfo = function() {
    var defer = q.defer();
    console.log("Getting data from mongo");
    var raidBossInfo = {};
    db.raidBossInfo.find({}, function(err, raidBossInfo){

        defer.resolve(raidBossInfo[0]);
    });

    return defer.promise;
};

var saveRaidBossInfo = function(validBossInfo){
    var defer = q.defer();
    var raidInfoId = getRaidBossInfo().then(function(data){

        console.log(validBossInfo);
        if(validBossInfo.isHighmaul){
            if(validBossInfo.isHeroic){
                console.log("Iterating through the data");
                var highmaul = data.highmaul;
                highmaul.forEach(function(data){

                    console.log("Valid Boss Info: " + validBossInfo.bossName);
                    console.log("Data Boss: " + data.name);

                    if(validBossInfo.bossName.toUpperCase() == data.name.toUpperCase()){
                        var videos = data.heroic.videos;
                        var videosLength = (Object.keys(videos).length);

                        videos[videosLength] = validBossInfo.newBossInfo;


                        data.heroic.videos = videos;
                        console.log(data);
                    }
                })
            }
        }
    });
};


module.exports = {
    getRaidBossInfo:getRaidBossInfo,
    saveRaidBossInfo:saveRaidBossInfo
};
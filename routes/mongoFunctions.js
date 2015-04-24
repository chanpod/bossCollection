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

        var parsedUrl = validBossInfo.newBossInfo.url.split("=");
        validBossInfo.newBossInfo.url = parsedUrl[1];

        console.log(parsedUrl);
        if(validBossInfo.isHighmaul){

            if(validBossInfo.isHeroic){

                console.log("Iterating through the data");
                var highmaul = data.highmaul;
                highmaul.forEach(function(highmaulData, index){

                    //console.log("Valid Boss Info: " + validBossInfo.bossName);
                    //console.log("Data Boss: " + highmaulData.name);

                    if(validBossInfo.bossName.toUpperCase() == highmaulData.name.toUpperCase()){
                        var videos = highmaulData.heroic.videos;
                        var videosLength = (Object.keys(videos).length);

                        videos[videosLength] = validBossInfo.newBossInfo;

                        highmaulData.heroic.videos = videos;
                        data.highmaul[index] = highmaulData;

                    }
                })
            }
        }

        db.raidBossInfo.save(data, function(){
            console.log("Success")
        },
        function(err){
            console.log(err);
        })

    });
};


module.exports = {
    getRaidBossInfo:getRaidBossInfo,
    saveRaidBossInfo:saveRaidBossInfo
};
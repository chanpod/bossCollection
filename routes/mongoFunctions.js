"use strict";

var databaseUrl = "bosscollection";
var collections = ["raidBossInfo"];
var db = require("mongojs").connect(databaseUrl, collections);
var q = require('q');



var getRaidBossInfo = function(raid) {
    var defer = q.defer();
    console.log("Getting data from mongo");
    var raidBossInfo = {};
    console.log(raid);
    db.raidBossInfo.find(raid, function(err, raidBossInfo){

        defer.resolve(raidBossInfo[0]);
    });

    return defer.promise;
};


var saveRaidBossInfo = function(validBossInfo){
    var defer = q.defer();
    var raidInfoId = getRaidBossInfo().then(function(data){

        var parsedUrl = validBossInfo.newBossInfo.url.split("=");
        validBossInfo.newBossInfo.url = parsedUrl[1];

       
        if(validBossInfo.isHighmaul){

                console.log("Iterating through the data");
                var highmaul = data.highmaul;
                highmaul.forEach(function(highmaulData, index){

                    //console.log("Valid Boss Info: " + validBossInfo.bossName);
                    //console.log("Data Boss: " + highmaulData.name);

                    if(validBossInfo.bossName.toUpperCase() == highmaulData.name.toUpperCase()){

                        if(validBossInfo.isHeroic) {
                            var videos = highmaulData.heroic.videos;
                            var videosLength = (Object.keys(videos).length);

                            videos[videosLength] = validBossInfo.newBossInfo;

                            highmaulData.heroic.videos = videos;
                            data.highmaul[index] = highmaulData;
                        }
                        else{
                            var videos = highmaulData.mythic.videos;
                            var videosLength = (Object.keys(videos).length);

                            videos[videosLength] = validBossInfo.newBossInfo;

                            highmaulData.mythic.videos = videos;
                            data.highmaul[index] = highmaulData;
                        }
                    }
                })

        }
        else if(validBossInfo.isBRF){
            
            var brf = data.brf;
            brf.forEach(function(brfData, index){

                //console.log("Valid Boss Info: " + validBossInfo.bossName);
                //console.log("Data Boss: " + highmaulData.name);

                if(validBossInfo.bossName.toUpperCase() == brfData.name.toUpperCase()){

                    if(validBossInfo.isHeroic) {
                        var videos = brfData.heroic.videos;
                        var videosLength = (Object.keys(videos).length);

                        videos[videosLength] = validBossInfo.newBossInfo;

                        brfData.heroic.videos = videos;
                        data.brf[index] = brfData;
                    }
                    else{
                        var videos = brfData.mythic.videos;
                        var videosLength = (Object.keys(videos).length);

                        videos[videosLength] = validBossInfo.newBossInfo;

                        brfData.mythic.videos = videos;
                        data.brf[index] = brfData;
                    }
                }
            })
        }
        else if(validBossInfo.isHFC){
            var hfc = data.hellfire;
            console.log("hellfire is valid");
            
            try{    
                hfc.forEach(function(hfcData, index){
    
                    //console.log("Valid Boss Info: " + validBossInfo.bossName);
                    //console.log("Data Boss: " + highmaulData.name);
                    
                    
                    if(validBossInfo.bossName.toUpperCase() == hfcData.name.toUpperCase()){
                        
                        
                        if(validBossInfo.isHeroic) {
                            
                            
                            var videos = hfcData.heroic.videos;
                            var videosLength = (Object.keys(videos).length);
    
                            videos[videosLength] = validBossInfo.newBossInfo;
    
                            hfcData.heroic.videos = videos;
                            data.hfc[index] = hfcData;
                        }
                        else{
                            var videos = hfcData.mythic.videos;
                            var videosLength = (Object.keys(videos).length);
    
                            videos[videosLength] = validBossInfo.newBossInfo;
    
                            hfcData.mythic.videos = videos;
                            data.hfc[index] = hfcData;
                        }
                    }
            })
            }
            catch(err){
                console.log(err);
            }
        }
        
        console.log("Saving data...");

        db.raidBossInfo.save(data, function(){
            console.log("Success")
                defer.resolve("success");
        },
        function(err){
            console.log(err);
            defer.resolve(err);
        })

    });

    return defer.promise;
};


module.exports = {
    getRaidBossInfo:getRaidBossInfo,
    saveRaidBossInfo:saveRaidBossInfo
};
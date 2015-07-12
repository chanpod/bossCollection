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
    console.log(validBossInfo.raidData);
    db.raidBossInfo.save(validBossInfo.raidData, function(){            
                defer.resolve("success");
        },
        function(err){
            console.log(err);
            defer.resolve(err);
    })

    return defer.promise;
};


module.exports = {
    getRaidBossInfo:getRaidBossInfo,
    saveRaidBossInfo:saveRaidBossInfo
};
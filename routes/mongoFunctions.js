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

            }
        }

    });

};

module.exports = {
    getRaidBossInfo:getRaidBossInfo,
    saveRaidBossInfo:saveRaidBossInfo
};
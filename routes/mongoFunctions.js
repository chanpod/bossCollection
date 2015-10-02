"use strict";

var databaseUrl = "bosscollection";
var collections = ["raidBossInfo"];
var db = require("mongojs").connect(databaseUrl, collections);
var q = require('q');
var mongoose = require('mongoose');  

mongoose.connect('mongodb://127.0.0.1:27017/'+ databaseUrl);


var getRaidBossInfo = function(raid) {
    
    var defer = q.defer();
    console.log("Getting data from mongo");
    var raidBossInfo = {};
    console.log(raid);
    
    db.raidBossInfo.find(raid, function(err, raidBossInfo){

        if(err){
            defer.reject(err);
            return;
        }
        
        defer.resolve(raidBossInfo[0]);
    });

    return defer.promise;
};


var saveRaidBossInfo = function(validBossInfo){
    var defer = q.defer();    
    console.log(validBossInfo);
    db.raidBossInfo.save(validBossInfo, function (err, result) {
        if (err) {
            defer.reject(err);
            return;
        }

        defer.resolve("success");
    })
    return defer.promise;
}





module.exports = {
    getRaidBossInfo:getRaidBossInfo,
    saveRaidBossInfo:saveRaidBossInfo
};
"use strict";
var mongo = require("./mongoFunctions");
var q = require('q');


var getRaidBossInfo = function() {

    var raidInfo ={};
        mongo.getRaidBossInfo().then(function(data){
        raidInfo = data;
        return raidInfo;
    });


};

module.exports = {
    raids:getRaidBossInfo
};
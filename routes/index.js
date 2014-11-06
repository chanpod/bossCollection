var mongoose = require('mongoose');
var fs = require('fs');
var guildAchievements = JSON.parse(fs.readFileSync(__dirname + '/../data/apiDumps/guildAchievements.json', 'utf8'));
exports.checkGuild = function(req, res){
    res.send("Hello World");
};

/*
 * GET home page.
 */
var title = "BossCollection";
exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.checkGuild = function(req, res){

    //console.log(JSON.stringify(guildAchievements, 0, 4));
    //console.log(req.query);

    res.send("hello world");
};


var findAchievement = function(id){



};
var mongoose = require('mongoose');

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

    var killCount = 0;
console.log("Request for Guild kill count...");
if(req.query.criteria) {

    var guildCriteria = req.query.criteria;
    console.log("Criteria exist.");

    sooCriteria.forEach(function (raidID) {
            if (binarySearch(raidID, guildCriteria)) {

                killCount++;
            }
        }
    )
}
    console.log("Guild kill count: " + killCount);

    res.header('Content-Type', 'application/json');
    res.header('Charset', 'utf-8')
    //res.send(req.query.callback + {"killCount": killCount});

    res.jsonp({"killCount": killCount});
}

var sooCriteria = [23692, 23693, 23694, 23695,
    23696, 23697, 23698, 23699,
    23700, 23702, 23703, 23701,
    23704, 23705];

function binarySearch(key, inputArray) {

    var low  = 0,
        high = inputArray.length - 1,
        mid;

    while (low <= high) {
        mid = low + (high - low) / 2;
        if ((mid % 1) > 0) { mid = Math.ceil(mid); }

        if (key < inputArray[mid]) { high = mid - 1; }
        else if (key > inputArray[mid]) { low = mid + 1; }
        else { return mid; }
    }

    return null;
}
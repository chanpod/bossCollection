var https = require('https');
var querystring = require('querystring');

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

exports.getGuild = function(req,res){
/*
    var post_data = querystring.stringify({
        'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
        'output_format': 'json',
        'output_info': 'compiled_code',
        'warning_level' : 'QUIET',
        'js_code' : codestring
    });
*/

    var post_data = querystring.stringify({});
    var post_options = {
        host: "us.api.battle.net",
        port: '443',
        path: "/wow/guild/Zul'jin/crux?fields=achievements&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d&jsonp=JSON_CALLBACK",
        method: 'GET'
    };
    console.log("Make JSONP calls");

    var response = {};

    var req = https.request(post_options, function(res) {
        console.log("statusCode: ", res.statusCode);
        console.log("headers: ", res.headers);

        res.on('data', function(d) {
            response = process.stdout.write(d.JSON_CALLBACK);
        });
    });
    req.end();

    req.on('error', function(e) {
        console.error(e);
    });

    res.jsonp(response);
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
};

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



var local = "locale=en_US";
var endUrl = local + "&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d&jsonp=JSON_CALLBACK";
var blizzApiRoot = "https://us.api.battle.net/wow/";
var getItems = "fields=items";
var getClasses = "data/character/classes";
var getGuild = "fields=achievements";
var staticResources = "http://us.battle.net/static-render/us/";
//https://us.api.battle.net/wow/data/character/classes?locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d
//https://us.api.battle.net/wow/guild/Zul'jin/crux?fields=achievements&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d
var classes = ["warrior", "paladin", "hunter", "rogue", "priest", "dk", "shaman", "mage", "warlock","monk","druid"];
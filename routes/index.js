var https = require('https');
var querystring = require('querystring');
var Q = require('Q');

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

    var deferred = Q.defer();

    var post_data = querystring.stringify({});
    var post_options = {
        host: "us.api.battle.net",
        port: '443',
        path: "/wow/guild/Zul'jin/crux?fields=achievements&locale=en_US&apikey=fqvadba9c8auw7brtdr72vv7hfntbx7d&jsonp=JSON_CALLBACK",
        method: 'GET'
    };
    console.log("Make JSONP calls");

    var returnData = {};

    var req = https.request(post_options, function(response) {
        //console.log("statusCode: ", res.statusCode);
        //console.log("headers: ", res.headers);



        response.on('data', function(d) {

            var buffer = new Buffer(d);
            deferred.resolve(buffer.toString('utf8', 0, buffer.len));
        });
        console.log(returnData);
        res.jsonp(returnData);
    });
    req.end();

    req.on('error', function(e) {
        console.error(e);
    });


};




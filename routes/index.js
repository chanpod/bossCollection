var https = require('https');


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




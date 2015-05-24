var https = require('https');


/*
 * GET home page.
 */
var title = "BossCollection";
exports.index = function(req, res, next){
    if (req.isAuthenticated())
      res.render('index', { user: req.user }); 
    res.render('login');
    
       
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.login = function(req,res){
  res.render('index');
}

exports.register = function(req,res){
  res.render('register');
}





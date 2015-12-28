var https = require('https');
var express = require('express');
var router = express.Router();
var authentication = require('../auth/routes.js');
var RESTserver = require('./RestRoutes/REST.js');
var forums = require('./forums/routes.js');


/*
 * GET home page.
 */
var title = "BossCollection";
/*
exports.index = function(req, res, next){
    if (req.isAuthenticated())
      res.render('index', { user: req.user }); 
    res.render('login');
    
       
};
*/

module.exports = function(app){
    
    router.use(function(req, res, next){
        console.log("All routes go through me first.");
        next();
    })

    app.use('/auth', authentication);
    app.use('/forum', forums);


    router.get('/', function(req, res){
        
        console.log("Rendering index");
        res.render('index');  
    });

    app.use(router);

    app.use('/api', RESTserver);
    
    
}


/*
exports.index = function(req, res, next){
   console.log("Rendering index");
   res.render('index');        
};

exports.partials = function (req, res) {
    console.log("Rendering a partial: " + req.params.name);
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.login = function(req,res){
    console.log("Rendering login");
  res.render('index');
}

exports.register = function(req,res){
    console.log("Rendering register");
  res.render('register');
}



*/

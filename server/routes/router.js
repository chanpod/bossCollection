var https = require('https');
var express = require('express');
var router = express.Router();
var authentication = require('../auth/routes.js');
var RESTserver = require('./RestRoutes/REST.js');
var forums = require('./forums/routes.js');

var request = require('request');

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

module.exports = function(app) {

    router.use(function(req, res, next) {

        next();
    })

    app.use('/auth', authentication);
    app.use('/forum', forums);

    router.get('/sw.js', function(req, res) {

        console.log("sending service worker");
        res.sendfile('sw.js');
    })

    router.get('/cache-polyfill.js', function(req, res) {


        res.sendfile('cache-polyfill.js');
    })





    router.post('/pushNotification', function(req, res) {
        
        const https = require('https');
        
        var subId = req.body.subId;
        var API_KEY = "AIzaSyCsOC0YDE2dKWwp20f4SiHlh_KI-2uJ-P8";
        var BASE_GOOGLE_URL = "https://android.googleapis.com/gcm/send";
        
        
        
        var subscriptionId = req.body.subId;


        request.post({
            uri: 'https://android.googleapis.com/gcm/send',
            json: {
                registration_ids: [
                    subId
                ],
                data: {
                    message: "Test"
                }
            },
            headers: {
                Authorization: 'key=' + API_KEY
            }
        }, function(err, response, body) {
            if(err){
                res.status(400).send(err);
                
            }
            else{
                res.status(200).send(response);
            }
        })
        
        
    })

    router.get('/*', function(req, res) {
        res.render('index');
    });

    app.use('/api', RESTserver);
    app.use(router);




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

var https = require('https');
var express = require('express');
var router = express.Router();


var request = require('request');




    router.use(function(req, res, next) {

        next();
    })
    

    router.get('/sw.js', function(req, res) {

        console.log("sending service worker");
        res.sendFile('sw.js');
    })

    router.get('/cache-polyfill.js', function(req, res) {


        res.sendFile('cache-polyfill.js');
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

module.exports = router;



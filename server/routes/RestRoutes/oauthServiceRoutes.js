var express = require('express');
var router = express.Router();
var q = require('q');


var request = require('request');
// var atob = require('atob');
var btoa = require('btoa');
var moment = require('moment');
var util = require('utility');
var environment = require('environment.js')

console.log(environment);

router.route('/getblizzardaccesstoken')
    .post(function (req, res) {
        console.log("get access token");
        var accessTokenURI = "https://us.battle.net/oauth/token?"
            + "redirect_uri=" + encodeURIComponent(environment.redirectUri)
            + "&scope=wow.profile"
            + "&grant_type=authorization_code"
            + "&code=" + req.body.code;

        var options = {
            url: accessTokenURI,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': 'Basic ' + btoa(environment.clientId + ':' + environment.secret)
            },
            json: {
                password: environment.secret,
                username: environment.clientId
            }
        };

        function callback(error, response, body) {
            console.log(error)
            // console.log(response)
            console.log(body)
            if (!error && response.statusCode == 200) {
                console.log(body)
                res.status(200).send(body);
            }
            else {

                if (body && body.error && response) {

                    res.status(response.statusCode).send(body.error);
                }
                else {
                    res.status(response.statusCode).send(error);

                }
            }
        }

        request.post(
            options,
            callback
        );
    })

router.route('/validateBlizzardToken')
    .post(function (req, res) {

        var accessTokenURI = "https://us.battle.net/oauth/check_token?"
            + "token=" + req.body.access_token;


        var options = {
            url: accessTokenURI
        };

        function callback(error, response, body) {

            if (!error && response.statusCode == 200) {
                console.log(body)
                res.status(200).send(body);
            }
            else {

                if (body && body.error && response) {

                    res.status(response.statusCode).send(body.error);
                }
                else {
                    res.status(response.statusCode).send(error);

                }
            }
        }

        request.post(
            options,
            callback
        );

        // https://us.api.battle.net/account/check_token?access_token=" + this.blizzardAccess.access_token

    })

module.exports = router;
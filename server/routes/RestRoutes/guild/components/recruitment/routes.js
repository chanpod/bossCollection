var express = require('express');
var router = express.Router();
var q = require('q');
var AbsenceModel = require('models/absence.js');
var moment = require('moment');
var util = require('utility');

var Recruitment = require('./recruitment-manager.js');
var GuildManager = require('../guild/guild-manager.js');

router.use(function (req, res, next) {

    var errMessage = "You must be logged in and a part of a guild to use this";

    try {

        if (util.userExist(req)) {

            if (util.userHasGuild(req)) {

                next();
            }
            else {
                throw new Error("You are not part of a guild!");
            }
        }
        else {
            throw new Error("Please login!");
        }

    }
    catch (err) {
        res.status(400).send(util.handleErrors(err));
    }
})

router.route('/:guildName')
    .get(function (req, res) {
        Recruitment.getRecruitment(req, res)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch(function (err) {

                res.status(400).send(util.handleErrors(err));
            })
    })
    .post(function (req, res) {

        var requester = req.session.user.name;

        //========== PROTECTED ===============
        GuildManager.getGuild(req.session.user.guild.name)
            .then(guild => {

                if(GuildManager.isAdmin(guild.members, requester)){

                    Recruitment.updateRecruitment(req, res)
                        .then((result) => {
                            
                            res.status(200).send(result);
                        })                        
                }
                else{

                    throw new Error("Invalid permissions!");
                }
            })
            .catch(err => {
                res.status(400).send(util.handleErrors(err));
            })
    })

module.exports = router;
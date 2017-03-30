var express = require('express');
var router = express.Router();
var q = require('q');
var AbsenceModel = require('models/absence.js');
var moment = require('moment');
var util = require('utility');

var Guild = require('./guild-manager.js');

router.route('/guildSettings')
    .get(function (req, res) {
        Guild.getGuildSettings(req, res)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch(function (err) {

                res.status(400).send(util.handleErrors(err));
            })
    })
    .post(function (req, res) {
        
        Guild.saveGuildSettings(req, res)
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {

                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/listOfGuilds')
    .get(function (req, res) {

        Guild.getListOfGuilds(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail((err) => {

                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/addGuild')
    .post(function (req, res) {

       Guild.addGuild(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail((err) => {

                res.status(400).send(util.handleErrors(err));
            })

    })
    
/**
 * Verify permission
 * Find guild
 * Find member existing rank
 * update object
 * save to DB
 *  
 */
router.route('/updateRank')
    .post(function (req, res) {

        Guild.updateUserRank(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail((err) => {

                res.status(400).send(util.handleErrors(err));
            })


    })

router.route('/changeGuildName')
    .post(function (req, res) {
        
    })

router.route('/getGuildMembers')
    .post(function (req, res) {

        Guild.getGuildMembers(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail((err) => {

                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/addMember')
    .post(function (req, res) {

        Guild.addMember(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail((err) => {

                res.status(400).send(util.handleErrors(err));
            })

    })

/**
 * Force kicked by officer
 */
router.route('/kickMember')
    .post(function(req, res){
        
        Guild.kickMember(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail((err) => {

                res.status(400).send(util.handleErrors(err));
            })
    })

/**
 * Voluntarily leaving a guild
 */
router.route('/removeMember')
    .post(function (req, res) {

        Guild.removeMember(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail((err) => {

                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/ranks')
    .get((req, res) => {
        
        Guild.getRanks(req, res)
            .then((result) => {

                res.status(200).send(result);
            })
            .catch((err) => {

                res.status(400).send(util.handleErrors(err));
            })
    })
    .post((req, res) => {
        
        Guild.createRank(req, res)
            .then((result) => {

                res.status(200).send(result);
            })
            .catch((err) => {

                res.status(400).send(util.handleErrors(err));
            })
    })
    .put((req, res) => {
        
        Guild.updateGuildRank(req, res)
            .then((result) => {

                res.status(200).send(result);
            })
            .catch((err) => {

                res.status(400).send(util.handleErrors(err));
            })
    })
    .delete((req, res) => {
        
        Guild.deleteRank(req, res)
            .then((result) => {

                res.status(200).send(result);
            })
            .catch((err) => {

                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/guildHomepage/:guildName')
    .get(function(req, res){
        
       Guild.getGuildHomepage(req, res)
            .then(function(result) { 

                res.status(200).send(result); 
            })
            .fail((err) => {

                res.status(400).send(util.handleErrors(err));
            })
    })
    .post(function(req, res){
        
        Guild.updateGuildHomepage(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail((err) => {

                res.status(400).send(util.handleErrors(err));
            })
    })


module.exports = router;
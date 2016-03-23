var express = require('express');
var router = express.Router();
var q = require('q');

var moment = require('moment');
var util = require('utility');

var Absence = require('./absence.js');

router.route('/absence')
    .post(function(req, res) {

        Absence.saveAbsence(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail(function(err) {

                res.status(400).send(util.handleErrors(err));
            })
    })
    .get(function(req, res) {

        Absence.getAbsence(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail(function(err) {

                res.status(400).send(util.handleErrors(err));
            })

    })

router.route('/deleteAbsence')
    .post(function(req, res) {

        Absence.deleteAbsence(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail(function(err) {

                res.status(400).send(util.handleErrors(err));
            })

    })

router.route('/saveAbsence')
    .post(function(req, res) {

        Absence.updateAbsence(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail(function(err) {

                res.status(400).send(util.handleErrors(err));
            })

    })

router.route('/absenceHistory')
    .post(function(req, res) {

        Absence.getAbsenceHistory(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail(function(err) {

                res.status(400).send(util.handleErrors(err));
            })

    })

router.route('/absenceByDate')
    .post(function(req, res) {

        Absence.getAbsenceByDate(req, res)
            .then(function(result) {

                res.status(200).send(result);
            })
            .fail(function(err) {

                res.status(400).send(util.handleErrors(err));
            })

    })



module.exports = router;
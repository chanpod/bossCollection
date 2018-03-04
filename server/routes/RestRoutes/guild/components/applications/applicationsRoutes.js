var express = require('express');
var router = express.Router();
var Application = require('./applications.js');

router.route('/applicationSubmission')
    .post(function (req, res) {

        Application.submitApplication(req, res)
            .then(function (result) {

                res.status(200).send(result);
            })
            .fail(function (err) {

                res.status(400).send(util.handleErrors(err));
            })

    })

router.route('/approveApplication')
    .post(function (req, res) {

        Application.approveApplication(req, res)
            .then(function (result) {

                res.status(200).send(result);
            })
            .fail(function (err) {

                res.status(400).send(util.handleErrors(err));
            })
    })


router.route('/rejectApplication')
    .post(function (req, res) {

        Application.rejectApplication(req, res)
            .then(function (result) {

                res.status(200).send(result);
            })
            .fail(function (err) {

                res.status(400).send(util.handleErrors(err));
            })
    })


router.route('/getApplications/user/:user/:startDate')
    .get(function (req, res) {

        Application.getUserApplications(req, res)
            .then(function (result) {

                res.status(200).send(result);
            })
            .fail(function (err) {

                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/getApplications')
    .get(function (req, res) {

        Application.getApplications(req, res)
            .then(function (result) {

                res.status(200).send(result);
            })
            .fail(function (err) {

                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/getApplication/:appId')
    .get(function (req, res) {

        Application.getApplication(req, res)
            .then(function (result) {

                res.status(200).send(result);
            })
            .fail(function (err) {

                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/getApplications/:guild')
    .get(function (req, res) {

        Application.getGuildApplications(req, res)
            .then(function (result) {

                res.status(200).send(result);
            })
            .fail(function (err) {

                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/getRejectedApplications/:guild')
    .get(function (req, res) {

        Application.getRejectedGuildApplications(req, res)
            .then(function (result) {

                res.status(200).send(result);
            })
            .fail(function (err) {

                res.status(400).send(util.handleErrors(err));
            })
    })


router.route('/deleteApplication')
    .post(function (req, res) {

        Application.deleteApplication(req, res)
            .then(function (result) {

                res.status(200).send(result);
            })
            .fail(function (err) {

                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/getApplications/:startDate')
    .get(function (req, res) {

        Application.getApplications(req, res)
            .then(function (result) {

                res.status(200).send(result);
            })
            .fail(function (err) {

                res.status(400).send(util.handleErrors(err));
            })
    })



module.exports = router;
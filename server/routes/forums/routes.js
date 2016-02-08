var express = require('express');
var router = express.Router();
var ThreadManager = require('./components/threadManager')
var MessageManager = require('./components/messageManager')
var ForumManager = require('./components/forumManager')

router.use(function (req, res, next) {

    console.log(req.session.user);

    if (req.session.user) {

        next();
    }
    else {
        req.session.error = 'Access denied!';
        res.redirect('/');
    }

})

//=======Message Routes ================
router.route('/createMessage')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");

    });

router.route('/deleteMessage')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");

    });

router.route('/updateMessage')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");

    });









//=======Thread Routes ================

router.route('/createThread')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");

    });

router.route('/deleteThread')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");

    });

router.route('/updateThread')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");

    });







//=======Forum Routes ================

router.route('/createForum')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");

    });

router.route('/deleteForum')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");

    });

router.route('/updateForum')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");

    });

module.exports = router;
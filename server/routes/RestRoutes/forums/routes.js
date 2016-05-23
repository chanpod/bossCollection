var express = require('express');
var router = express.Router();
var ThreadManager = require('./components/threadManager')
var MessageManager = require('./components/messageManager')
var ForumManager = require('./components/forumManager')
var CategoryManager = require('./components/categoryManager');

var util = require('utility');

router.use(function (req, res, next) {

    next();
})

//=======Comment Routes ================
router.route('/createComment')
    .post(function (req, res) {

        console.log("Creating comment...");

        MessageManager.createComment(req, res)
            .then(function (response) {

                res.status(200).send(response)
            })
            .fail(function (err) {
                res.status(403).send(util.handleErrors(err));
            })
    });

router.route('/getComments')
    .post(function (req, res) {

        MessageManager.getComments(req.body.threadId, req.body.messageCount)
            .then(function (response) {

                res.status(200).send(response)
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })

    });


router.route('/deleteComment')
    .post(function (req, res) {


        MessageManager.deleteComment(req, res)
            .then(function (response) {

                res.status(200).send(response)
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })
    });

router.route('/editComment')
    .post(function (req, res) {

        console.log("Editing comment...");
        MessageManager.editComment(req, res)
            .then(function (response) {

                res.status(200).send(response)
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })
    });


router.route('/getCategories')
    .post(function (req, res) {

        CategoryManager.getCategories(req, res)
            .then(function (response) {

                res.status(200).send({ forums: response })
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/createCategory')
    .post(function (req, res) {

        console.log("Creating a new category...");

        CategoryManager.createCategory(req, res)
    });

router.route('/deleteCategory')
    .post(function (req, res) {



        CategoryManager.deleteCategories(req, res)
            .then(function (response) {

                res.status(200).send();
            })
            .fail(function (err) {

                res.status(400).send(util.handleErrors(err));
            })

    });

router.route('/editCategory')
    .post(function (req, res) {

        console.log("Edit Category...");
        CategoryManager.editCategory(req, res)
            .then(function (response) {

                res.status(200).send({ category: response })
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })

    });









//=======Thread Routes ================

router.route('/thread')
    .post(function (req, res) {

        ThreadManager.getThread(req.body.threadID)
            .then(function (response) {

                res.status(200).send(response);
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })
    })

router.route('/getThreads')
    .post(function (req, res) {

        console.log("Getting threads...");

        ThreadManager.getThreads(req.body.forumId)
            .then(function (response) {

                res.status(200).send(response);
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })

    });

router.route('/createThread')
    .post(function (req, res) {

        console.log("Creating a thread...dd");

        ThreadManager.createThread(req, res)
            .then(function (response) {

                res.status(200).send(response);
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })

    });

router.route('/deleteThread')
    .post(function (req, res) {

        console.log("Deleting Thread...");
        ThreadManager.deleteThread(req, res)
            .then(function (response) {

                res.status(200).send(response);
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })

    });

router.route('/editThread')
    .post(function (req, res) {

        console.log("Editing thread...");

        ThreadManager.editThread(req, res)
            .then(function (response) {

                res.status(200).send({ category: response })
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })
    });







//=======Forum Routes ================

router.route('/createForum')
    .post(function (req, res) {

        ForumManager.createForum(req, res);

    });

router.route('/deleteForum')
    .post(function (req, res) {

        console.log("Deleting forum...");
        ForumManager.deleteForum(req, res)
            .then(function (response) {

                res.status(200).send(response);
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })

    });

router.route('/editForum')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");

        ForumManager.editForum(req, res)
            .then(function (response) {

                res.status(200).send(response);
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })
    });

//=======Favorites Routes ================

router.route('/favorites')
    .get((req, res) => {

        console.log("Getting Favorites!");

        ThreadManager.getFavorites(req, res)
            .then(function (response) {

                console.log("Return Favorites!");
                res.status(200).send(response);
            })
            .catch(function (err) {
                res.status(400).send(util.handleErrors(err));
            })
    })

module.exports = router;
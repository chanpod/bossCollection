var express = require('express');
var router = express.Router();
var ThreadManager = require('./components/threadManager')
var MessageManager = require('./components/messageManager')
var ForumManager = require('./components/forumManager')
var CategoryManager = require('./components/categoryManager');

var util = require('../../utility');

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

//=======Comment Routes ================
router.route('/createComment')
    .post(function (req, res) {

        console.log("Creating comment...");
        
        MessageManager.createComment(req, res)
            .then(function(response){
                
                res.status(200).send(response)
            })
            .fail(function(err){
                res.status(400).send(util.handleErrors(err));
            })

    });
    
router.route('/getComments')
    .post(function (req, res) {
        
        MessageManager.getComments(req.body.threadId)
            .then(function(response){
                
                res.status(200).send(response)
            })
            .fail(function(err){
                res.status(400).send(util.handleErrors(err));
            })

    });


router.route('/deleteComment')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");

    });

router.route('/updateComment')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");

    });


router.route('/getCategories')
    .post(function(req, res){        
        
        CategoryManager.getCategories(req, res)
            .then(function(response){
                
                res.status(200).send({forums: response})
            })
            .fail(function(err){
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

        console.log("Successfully accessed forum route");
        
        CategoryManager.deleteCategories(req, res)
            .then(function(response){
                
                res.status(200).send();
            })
            .fail(function(err){
                
                res.status(400).send(util.handleErrors(err));
            })
        
    });

router.route('/editCategory')
    .post(function (req, res) {

        console.log("Edit Category...");
        CategoryManager.editCategory(req, res)
            .then(function(response){
                
                res.status(200).send({category: response})
            })
            .fail(function(err){
                res.status(400).send(util.handleErrors(err));
            })

    });









//=======Thread Routes ================

router.route('/getThreads')
    .post(function (req, res) {

        console.log("Creating a thread...");
        
        ThreadManager.getThreads(req.body.forumId)
            .then(function(response){
                
                res.status(200).send(response);
            })
            .fail(function(err){
                res.status(400).send(util.handleErrors(err));
            })

    });

router.route('/createThread')
    .post(function (req, res) {

        console.log("Creating a thread...");
        
        ThreadManager.createThread(req, res)
            .then(function(response){
                
                res.status(200).send(response);
            })
            .fail(function(err){
                res.status(400).send(util.handleErrors(err));
            })

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

        ForumManager.createForum(req, res);

    });

router.route('/deleteForum')
    .post(function (req, res) {

        console.log("Deleting forum...");
        ForumManager.deleteForum(req, res)
            .then(function(response){
                
                res.status(200).send(response);
            })
            .fail(function(err){
                res.status(400).send(util.handleErrors(err));
            })

    });

router.route('/editForum')
    .post(function (req, res) {

        console.log("Successfully accessed forum route");
        
        ForumManager.editForum(req, res)
            .then(function(response){
                
                res.status(200).send(response);
            })
            .fail(function(err){
                res.status(400).send(util.handleErrors(err));
            })
    });

module.exports = router;
var express = require('express');
var router = express.Router();
var q = require('q');
var moment = require('moment');
var _ = require('lodash');

var ForumManager = require('./forumManager');
var ThreadManager = require('./threadManager');

var util = require('utility');
var CategorydModel = require('models/forumModels/category.js');

function createCategory(req, res) {

    var newCategory = new CategorydModel();

    var name = req.body.category.name;
    var guild = req.session.user.guild.name;
    var forums = [];
    var permissions = req.body.category.permissions;

    newCategory.name = name;
    newCategory.guild = guild;
    newCategory.forums = forums;
    newCategory.permissions = permissions;

    newCategory.save(function () {

        res.status(200).send({ category: newCategory });
    }, function (err) {
        res.status(400).send(util.handleErrors(err));
    })

}

function editCategory(req, res) {

    var defer = q.defer();
    var categoryId = req.body.category._id
    var query = { "_id": categoryId };

    var categoryToUpdate = req.body.category;
    var categoryPermissions = categoryToUpdate.permissions;

    categoryToUpdate.forums = []; //we don't want to save these!

    CategorydModel.findOneAndUpdate(query, req.body.category)
        .then(function (response) {

            ForumManager.getForums(categoryId)
                .then(function (forums) {

                    _(forums).forEach(function (forum, index) {

                        forum.permissions = categoryPermissions;
                        req.body.forum = forum;
                        ForumManager.editForum(req, res);
                    })

                    defer.resolve(true);

                }, function (err) {

                    defer.reject(err);
                })

        }, function (err) {

            defer.reject(err);
        })


    return defer.promise;
}

/**
 *  get associated Forums
 *  delete Forums
 *  detele Category  
 */
function deleteCategories(req, res) {

    var defer = q.defer();
    var categoryId = req.body.category._id;


    ForumManager.getForums(categoryId)
        .then(function (forums) {

            _(forums).forEach(function (forum, index) {

                req.body.forum = forum;
                ForumManager.deleteForum(req, res);
            })

            CategorydModel.findOne({ "_id": categoryId })
                .then(function (category) {

                    category.remove();
                    defer.resolve();
                })

        }, function (err) {

            defer.reject(err);
        })


    return defer.promise;
}

function getCategories(req, res) {

    var defer = q.defer();

    if (util.userHasGuild(req)) {

        var guild = req.session.user.guild.name;
    }
    else {
        defer.reject("No guild association with the user or user isn't logged in.");
    }
    var forums = {};
    var categoriesPromise = [];
    var forumsPromise = [];

    var userPermissions = req.session.user.guild.members[0];
    var query = {};

    if (userPermissions.GM) {
        query = { "guild": guild };
    }

    else if (userPermissions.officer) {

        query = {
            $or: [

                {
                    $and: [
                        { "guild": guild },
                        { "permissions.officer": true }                        
                    ]
                },
                {
                    "public": true
                }
            ]
        };
    }

    else if (userPermissions.raider) {
        query = {
            $or: [
                
                {
                    $and: [
                        {"guild": guild},
                        { "permissions.officer": false },
                        { "permissions.raider": userPermissions.raider }
                    ]
                },
                {
                    "public": true
                }
            ]
        };

    }

    //query.public = true;

    CategorydModel.find(query)
        .then(function (categories) {

            forums.categories = categories;
            var categoryIds = []
            numOfCategories = forums.categories.length;

            if (forums.categories.length == 0) {
                defer.resolve([]);
            }


            _(forums.categories).forEach(function (category, index) {

                categoriesPromise.push(index);

                ForumManager.getForums(category._id)
                    .then(function (categoryForums) {

                        _(categoryForums).forEach(function (forum, forumIndex) {

                            forumsPromise.push(forumIndex);

                            ThreadManager.getThreadCount(forum._id)
                                .then(function (count) {

                                    forum.threadCount = count;
                                    category.forums.push(forum);

                                    forumsPromise.pop();

                                    forEachFinished();
                                })

                        })

                        categoriesPromise.pop();

                        forEachFinished();

                    })
            })


        }, function (err) {
            defer.reject(err);
        })

    function forEachFinished(index) {

        if (categoriesPromise.length == 0 && forumsPromise.length == 0) {

            console.log("Finished getting forums");

            defer.resolve(forums);
        }
    }

    return defer.promise;
}



function getCategoryPermissions(categoryId) {

    var defer = q.defer();

    CategorydModel.findOne({ "_id": categoryId })
        .then((category) => {

            defer.resolve(category.permissions);
        }, (err) => {
            defer.reject(err);
        })


    return defer.promise;
}


module.exports = {
    createCategory: createCategory,
    getCategories: getCategories,
    editCategory: editCategory,
    deleteCategories: deleteCategories,
    getCategoryPermissions: getCategoryPermissions
}
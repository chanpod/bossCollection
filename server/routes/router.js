var express = require('express');
var router = express.Router();

var RESTRoutes = require('./RestRoutes/REST.js');
var site = require('./site/routes.js');

module.exports = function(app) {

    router.use(function(req, res, next) {

        next();
    })

    app.use(RESTRoutes);
    app.use(site);
}
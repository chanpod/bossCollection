var _ = require('lodash');
var q = require('q');

var myExports = {
    
    saveSession: function(req, res){
        var defer = q.defer();
        console.log("Updating session");
        res.cookie('user', req.session.user, { maxAge: 90000000 });
        
        req.session.save(function () {
                        
            // update the user's login cookies if they exists //
            if (req.session.user != undefined) {                
                
                console.log("Session update complete");
                defer.resolve(req.session.user);                
            }
            else{
                console.log("Uh oh, session Broke. No user defined?");
                defer.reject("No session user defined.")
            }
        });
        
        return defer.promise;
    },
    handleErrors: function(err){
        var errObject = {}
        if (err.message) {
            errObject = {message: err.message };
        }
        else {
            errObject = {message: err };
        }
        
        return errObject;
    }
}

module.exports = myExports;
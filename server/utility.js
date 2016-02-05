var _ = require('lodash');
var q = require('q');

var myExports = {
    
    saveSession: function(req, res){
        var defer = q.defer();
        console.log("Updating session");
        req.session.save(function () {
                        
            // update the user's login cookies if they exists //
            if (req.session.user != undefined) {

                res.cookie('user', req.session.user, { maxAge: 900000 });
                
                req.session.reload(function () {

                    defer.resolve(req.session.user);
                })
            }
            else{
                defer.reject("No session user defined.")
            }
        });
        
        return defer.promise;
    },
    handleErrors: function(err){
        
        return {message: err};
    }
}

module.exports = myExports;
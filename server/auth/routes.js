
var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');
var guildManagement = require('../routes/RestRoutes/guild-manager')
var express = require('express');
var router = express.Router();
var q = require('q');
var util = require('../utility');


// main login page //
    
    
router.use(function (req, res, next) {

    next();
})

router.post('/loggedin', function (req, res) {

    console.log("Checking user...");

    if (req.session.user) {
        console.log("We're logged in...");

        //console.log(req.session.user);

        res.json({ loggedIn: true, user: req.session.user });
    }
    else {
        console.log("Not logged in...");
        res.json({ loggedIn: false });
    }
})

router.get('/application', function (req, res) {

    AM.verifyLoggedIn(req, res);
})

router.get('/absence', function (req, res) {

    AM.verifyLoggedIn(req, res);
})

router.post('/logout', function (req, res) {

    console.log("Logging out...");
    req.session.destroy();
    res.clearCookie("user");
    res.json({ loggedOut: true });;
})

router.get('/login', function (req, res) {
   
    // attempt automatic login //
    console.log("auto logging in");
    AM.autoLogin(req.cookies.name, req.cookies.password, function (user) {
        if (user != null) {
            console.log("setting user to session");
            req.session.user = user;

            setUser(req, res)
                .then(function (result) {

                    res.status(200).send(result);
                })
                .fail(function (err) {

                    res.status(400).send(util.handleErrors(err));
                })
            //res.redirect('/');
        } else {
            console.log("Log in failed...");
            console.log(user);
            res.render('index', { title: 'Hello - Please Login To Your Account' });
        }
    })

});

router.post('/login', function (req, res) {

    console.log("post auth /api/auth")
    //console.log(req.body);

    AM.manualLogin(req.body.name, req.body.password)
        .then(function (user) {

            console.log(user);

            req.session.user = user;

            setUser(req, res)
                .then(function (result) {

                    res.status(200).send(req.session.user);
                })
                .fail(function (err) {

                    res.status(400).send(util.handleErrors(err));
                })


        })
        .fail(function (err) {

            res.status(400).send(util.handleErrors(err));
        })
});
	
// logged-in user homepage //
	
router.get('/forum', function (req, res) {
    console.log("auth /forum")
    if (req.session.user == null) {
        // if user is not logged-in redirect back to login page //
        res.redirect('/auth/login');
    } else {
        res.render('index', {
            udata: req.session.user
        });
    }
});

router.get('/currentUser', function (req, res) {
    console.log("Getting user...");
    //console.log(req.session.user);

    if (req.session.user) {

        setUser(req, res)
            .then(function (result) {

                res.status(200).send(result);
            })
            .fail(function (err) {

                res.status(400).send(util.handleErrors(err));
            })

    }
    else {
        res.status(200).send({ result: false });
    }
})

router.get('/updateAccount', function (req, res) {

    res.render('index');
})

router.post('/updateAccount', function (req, res) {

    console.log("auth /auth/updateAccount");
    console.log(req.body);

    var sessionPassword = req.session.user.password;
    var currentPassword = req.body.currentPassword;

    var newPassword = req.body.newPassword;
    var verifyPassword = req.body.passwordVerify;

    console.log("Current password: " + sessionPassword);

    AM.validatePassword(currentPassword, sessionPassword)
        .then(function () {

            return AM.verifyPasswordsMatch(newPassword, verifyPassword)
        })
        .then(function (doMatch) {

            if (doMatch == true) {

                return AM.updatePassword(req.body.email, newPassword)
            }
        })
        .then(function (updatedUser) {

            if (updatedUser != null) {

                req.session.user = updatedUser._doc;
            }

            return AM.updateAccount({
                name: req.body['name'],
                battleTag: req.body['battleTag'],
                email: req.body['email'],
                password: req.session.user.password
            })
        })
        .then(function (user) {

            req.session.user = user;

            return setUser(req, res)
        })
        .then(function (user) {

            return util.saveSession(req, res)
        })
        .then(function (user) {
            res.status(200).send(user);
        })
        .fail(function (err) {

            res.status(400).send(util.handleErrors(err));
        })

});
	
// creating new accounts //
	
router.get('/signup', function (req, res) {
    console.log("auth /signup")
    res.render('index', { title: 'Signup', countries: CT });
});

router.post('/signup', function (req, res) {

    console.log("auth /api/auth/signup")
    console.log(req.body);

    if (req.body.password === req.body.password_verify) {

        var newUser = {
            name: req.body.name,
            password: req.body.password,
            email: req.body.email,
            battleTag: req.body.battleTag
        }

        AM.addNewAccount(newUser)
            .then(function (success) {

            })
            .then(function () {

                return AM.manualLogin(newUser.name, req.body.password)
            })
            .then(function (user) {

                req.session.user = user;

                setUser(req, res)
                    .then(function (result) {

                        res.status(200).send(req.session.user);
                    })
            })
            .fail(function (err) {
                res.status(400).send(util.handleErrors(err));
            })
    }
    else {
        res.status(400).send(util.handleErrors("Passwords don't match."));
    }


});

// password reset //

router.post('/lost-password', function (req, res) {
    // look up the user's account via their email //
    AM.getAccountByEmail(req.body['email'], function (o) {
        
        if (o) {
            
            var newPass = o.password.substring(0,4);
            
            AM.updatePassword(o.email, newPass)
                .then(function(response){
                    
                    o.newPass = newPass;
                    EM.dispatchResetPasswordLink(o, function (e, m) {
                        // this callback takes a moment to return //
                        // TODO add an ajax loader to give user feedback //
                        if (!e) {
                            res.status(200).send('ok');
                        } else {
                            for (k in e) console.log('ERROR : ', k, e[k]);
                            res.status(400).send(util.handleErrors('unable to dispatch password reset'));
                        }
                    });    
            })
            
            
        } else {
            res.status(400).send(util.handleErrors('email-not-found'));
        }
    });
});

router.get('/reset-password', function (req, res) {
    var email = req.query["e"];
    var passH = req.query["p"];
    AM.validateResetLink(email, passH, function (e) {
        if (e != 'ok') {
            res.redirect('/');
        } else {
            // save the user's email in a session instead of sending to the client //
            req.session.reset = { email: email, passHash: passH };
            res.render('index', { title: 'Reset Password' });
        }
    })
});

router.post('/reset-password', function (req, res) {
    var nPass = req.body['pass'];
    // retrieve the user's email from the session to lookup their account and reset password //
    var email = req.session.reset.email;
    // destory the session immediately after retrieving the stored email //
    req.session.destroy();
    AM.updatePassword(email, nPass, function (e, o) {
        if (o) {
            res.status(200).send('ok');
        } else {
            res.status(400).send(util.handleErrors('unable to update password'));
        }
    })
});
	
// view & delete accounts //
	
router.get('/print', function (req, res) {
    AM.getAllRecords(function (e, accounts) {
        res.render('index', { title: 'Account List', accts: accounts });
    })
});

router.post('/delete', function (req, res) {
    AM.deleteAccount(req.body.id, function (e, obj) {
        if (!e) {
            res.clearCookie('user');
            res.clearCookie('pass');
            req.session.destroy(function (e) { res.status(200).send('ok'); });
        } else {
            res.status(400).send(util.handleErrors('record not found'));
        }
    });
});

router.get('/reset', function (req, res) {
    AM.delAllRecords(function () {
        res.redirect('/print');
    });
});

router.get('*', function (req, res) { res.render('404', { title: 'Page Not Found' }); });

function setUser(req, res) {
    var defer = q.defer();

    guildManagement.findUsersGuild(req.session.user.name)
        .then(function (guild) {

            if (guild) {

                req.session.user.guild = guild._doc;
                return util.saveSession(req, res)
            }
            else {
                return util.saveSession(req, res)
            }
        })
        .then(function (user) {

            defer.resolve(user);
        })
        .fail(function (err) {
            defer.reject(err);
        })


    return defer.promise;
}

module.exports = router
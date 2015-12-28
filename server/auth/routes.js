
var CT = require('./modules/country-list');
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');
var express = require('express');
var router = express.Router();


// main login page //
    
    
    router.use(function(req, res, next){
        console.log("We made it this far.");
        next();
    })
    
    router.post('/loggedin', function(req, res){
        
        console.log("Checking user...");
        
        if(req.session.user){
            console.log("We're logged in...");
            
            console.log(req.session.user);
            res.json({loggedIn: true, user: req.session.user});
        }
        else{
            console.log("Not logged in...");
            res.json({loggedIn: false});
        }
    })
    
    router.post('/logout', function(req, res){
        
        console.log("Logging out...");
        req.session.destroy();
        
        res.json({loggedOut: true});;
    })
    
	router.get('/login', function(req, res){
        console.log("get auth /login")
	// check if the user's credentials are saved in a cookie //
        console.log(req.cookies);
        console.log(req.cookies.name);
        console.log(req.cookies.password);
		if (req.cookies.name == undefined || req.cookies.password == undefined){
            console.log("Rendering auth view");
			res.render('index', { title: 'Hello - Please Login To Your Account' });
		}	else{
	// attempt automatic login //
            console.log("auto logging in");
			AM.autoLogin(req.cookies.name, req.cookies.password, function(user){
				if (user != null){
                    console.log("setting user to session");
				    req.session.user = user;
					res.redirect('/');
				}	else{
                    console.log("Log in failed...");
                    console.log(user);
					res.render('index', { title: 'Hello - Please Login To Your Account' });
				}
			});
		}
	});
	
	router.post('/login', function(req, res){
        
        console.log("post auth /api/auth")
        console.log(req.body);
		AM.manualLogin(req.body.name, req.body.password, function(err, user){
            
            console.log(user);
            
			if (!user){
				res.status(400).send(err);
			}	else{
                
				req.session.user = user;
                
				if (req.body.rememberMe == true){
                    console.log("Remember me set...");
					res.cookie('name', user.name, { maxAge: 900000 });
					res.cookie('password', user.password, { maxAge: 900000 });
				}
                else{
                    console.log("REmember me not set");
                }
				res.status(200).send(user);
			}
		});
	});
	
// logged-in user homepage //
	
	router.get('/forum', function(req, res) {
        console.log("auth /forum")
		if (req.session.user == null){
	// if user is not logged-in redirect back to login page //
			res.redirect('/auth/login');
		}	else{
			res.render('index', {							
				udata : req.session.user
			});
		}
	});
	
	router.post('/editUser', function(req, res){
        console.log("auth /api/auth/editUser");
        
		if (req.body['user'] != undefined) {
			AM.updateAccount({
				user 	: req.body['user'],
				name 	: req.body['name'],
				email 	: req.body['email'],
				pass	: req.body['pass'],
				country : req.body['country']
			}, function(e, o){
				if (e){
					res.status(400).send('error-updating-account');
				}	else{
					req.session.user = o;
			// update the user's login cookies if they exists //
					if (req.cookies.user != undefined && req.cookies.pass != undefined){
						res.cookie('user', o.user, { maxAge: 900000 });
						res.cookie('pass', o.pass, { maxAge: 900000 });	
					}
					res.status(200).send('ok');
				}
			});
		}	else if (req.body['logout'] == 'true'){
			res.clearCookie('user');
			res.clearCookie('pass');
			req.session.destroy(function(e){ res.status(200).send('ok'); });
		}
	});
	
// creating new accounts //
	
	router.get('/signup', function(req, res) {
        console.log("auth /signup")
		res.render('index', {  title: 'Signup', countries : CT });
	});
	
	router.post('/signup', function(req, res){
        
        console.log("auth /api/auth/signup")
        console.log(req.body);

        if (req.body.password === req.body.password_verify) {
            
            var newUser = {
                name: req.body.name,
                password: req.body.password
            }
            
            AM.addNewAccount(newUser, function (error) {
                
                if (error) {
                    res.status(400).send(error);
                } else {
                    res.status(200).send(newUser);
                }
            });
        }
        else{
            res.status(400).send("Passwords don't match.");
        }
        
		
	});

// password reset //

	router.post('/lost-password', function(req, res){
	// look up the user's account via their email //
		AM.getAccountByEmail(req.body['email'], function(o){
			if (o){
				EM.dispatchResetPasswordLink(o, function(e, m){
				// this callback takes a moment to return //
				// TODO add an ajax loader to give user feedback //
					if (!e){
						res.status(200).send('ok');
					}	else{
						for (k in e) console.log('ERROR : ', k, e[k]);
						res.status(400).send('unable to dispatch password reset');
					}
				});
			}	else{
				res.status(400).send('email-not-found');
			}
		});
	});

	router.get('/reset-password', function(req, res) {
		var email = req.query["e"];
		var passH = req.query["p"];
		AM.validateResetLink(email, passH, function(e){
			if (e != 'ok'){
				res.redirect('/');
			} else{
	// save the user's email in a session instead of sending to the client //
				req.session.reset = { email:email, passHash:passH };
				res.render('index', { title : 'Reset Password' });
			}
		})
	});
	
	router.post('/reset-password', function(req, res) {
		var nPass = req.body['pass'];
	// retrieve the user's email from the session to lookup their account and reset password //
		var email = req.session.reset.email;
	// destory the session immediately after retrieving the stored email //
		req.session.destroy();
		AM.updatePassword(email, nPass, function(e, o){
			if (o){
				res.status(200).send('ok');
			}	else{
				res.status(400).send('unable to update password');
			}
		})
	});
	
// view & delete accounts //
	
	router.get('/print', function(req, res) {
		AM.getAllRecords( function(e, accounts){
			res.render('index', { title : 'Account List', accts : accounts });
		})
	});
	
	router.post('/delete', function(req, res){
		AM.deleteAccount(req.body.id, function(e, obj){
			if (!e){
				res.clearCookie('user');
				res.clearCookie('pass');
				req.session.destroy(function(e){ res.status(200).send('ok'); });
			}	else{
				res.status(400).send('record not found');
			}
	    });
	});
	
	router.get('/reset', function(req, res) {
		AM.delAllRecords(function(){
			res.redirect('/print');	
		});
	});
	
	router.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });

    module.exports = router
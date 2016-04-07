
var crypto 		= require('crypto');
var moment 		= require('moment');
var q = require('q');
var util = require('utility');

//var mongoose = require('mongoose');
//var mongooseDB  = mongoose.connect("mongodb://localhost/bosscollection");
var UserModel = require('models/user.js');

exports.updateAvatarUrl = function(userName, avatarUrl){
    var defer = q.defer();
    
    UserModel.findOne({name: userName}, function(err, user){
        
        if(err){
            defer.reject(err);
            return;
        }
        
        user.avatarUrl = avatarUrl;
        
        user.save(status => defer.resolve(status));
    })
    
    return defer.promise;
}

exports.getAvatarUrl = function(userName){
    
    var defer = q.defer();
    
    UserModel.findOne({name:userName}, function(err, user){       
       
       if(err){
           defer.reject(util.handleErrors(err));
           return;
       }
       var url = user._doc.avatarUrl;
       defer.resolve({avatarUrl: url});
        
    })
    
    return defer.promise;
}

exports.verifyLoggedIn = function (req, res) {

    if (req.session.user == null) {
        // if user is not logged-in redirect back to login page //
        res.redirect('/auth/login');
    } else {
        res.render('index', {
            udata: req.session.user
        });
    }
}


exports.autoLogin = function(name, password, callback)
{
	UserModel.findOne({name:name}, function(e, o) {
		if (o){
			o.password == password ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}

exports.verifyPasswordsMatch = function(pass1, pass2){
    
    var defer = q.defer();
    
    if (pass1 && pass2) {

        if (pass1.length != 0) {

            if (pass1.length > 1) {

                if (pass1 === pass2) {

                    defer.resolve(true);
                }
                else {

                    defer.reject(util.handleErrors("Passwords dont match"));
                }

            }
            else {

                defer.reject(util.handleErrors("Password must be longer than 1 chacter"));
            }
        }
        else{
            
            defer.resolve(false); //Not updating the password
        }
    }
    else{
        
        defer.resolve(false);
    }
    
    return defer.promise;
    
    
}

exports.manualLogin = function(user, pass, callback)
{
    var defer = q.defer();
    
	UserModel.findOne({name:user}, function(e, userFound) {
        
		if (userFound == null){
            
            UserModel.findOne({email: user}, function(err, userFound){
                
                if(err || userFound == null){
                    
                    defer.reject('Username or Email not found.')
                    return; //We're done here. 
                }
                
                
                validatePassword(pass, userFound.password, function (err, res) {
                    
                    if (res) {
                        
                        defer.resolve(userFound);                        
                    } else {
                        
                        defer.reject(util.handleErrors('invalid password'));
                    }
                });
            })
            
			
		}	else{
            
            console.log(pass);
            console.log(userFound.password);
            
			validatePassword(pass, userFound.password, function(err, res) {
				if (res){
					
                    defer.resolve(userFound);
				}	else{
                    
					defer.reject(util.handleErrors('invalid password: ' + err));
				}
			});
		}
	});
    
    return defer.promise;
}

/* record insertion, update & deletion methods */

exports.addNewAccount = function(newUser, callback)
{
    var defer = q.defer();
    
    if(newUser.name == '' || newUser.name == undefined){
        //callback('User name missing!');
        defer.reject('User name missing!');
        return;
    }
    
    if(newUser.password == undefined || newUser.password.length == 0){
        //callback('Password is empty!');
        defer.reject(util.handleErrors('Password is empty'));
        return;
    }
    
	UserModel.findOne({name:newUser.name}, function(e, user) {
		if (user){
            
			//callback('username-taken');
            defer.reject(util.handleErrors('username taken'));
		}	else{
			UserModel.findOne({email:newUser.email}, function(e, user) {
                
				if (user){
                    
					//callback('email-taken');
                    defer.reject(util.handleErrors('email taken'));
				}	
                else {

                    var newHash = saltAndHash(newUser.password)

                    newUser.password = newHash;
                    // append date stamp when record was created //
                    newUser.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                    console.log("Adding new user: " + newUser);
                    newUser = new UserModel(newUser);
                    
                    newUser.save(function(savedUser){
                        
                        defer.resolve(savedUser);
                    });

                }
            });
		}
	});
    
    return defer.promise;
}

exports.updateAccount = function(userAccount, callback)
{
    var defer = q.defer();
    
    console.log("Saving account: " + JSON.stringify(userAccount));
    //console.log(userModel);

    var query = {"name" : userAccount.name};
    
    UserModel.findOneAndUpdate(query, userAccount)
        .then(function (savedUser) {
            
            //callback(null, userAccount);
            defer.resolve(userAccount);
        },
        function(err){
            defer.reject(util.handleErrors(err));
        })        
    
    return defer.promise;
}

exports.updatePassword = function(email, newPass, callback)
{
    var defer = q.defer();
    
	UserModel.findOne({email:email}, function(err, user){
        
		if (err){
			//callback(e, null);
            defer.reject(util.handleErrors(err));
		}	
        else{
            
            console.log("Creating new passwith with pass: " + newPass);
            
            var newHash = saltAndHash(newPass);
            
            
            
            
            user.password = newHash;
            console.log("New Password: " + user.password);
            
            user.save()
                .then(function (updatedUser) {
                    
                    console.log("User updated with new password: " + updatedUser._doc.password);
                    defer.resolve(updatedUser);
                },
                function(err){
                    
                    defer.reject(util.handleErrors(err));
                })

        }
	});
    
    return defer.promise;
}

/* account lookup methods */

exports.deleteAccount = function(id, callback)
{
	UserModel.remove({_id: getObjectId(id)}, callback);
}

exports.getAccountByEmail = function(email, callback)
{
	UserModel.findOne({email:email}, function(e, o){ callback(o); });
}

exports.validateResetLink = function(email, passHash, callback)
{
	UserModel.find({ $and: [{email:email, password:passHash}] }, function(e, o){
		callback(o ? 'ok' : null);
	});
}

exports.getAllRecords = function(callback)
{
	UserModel.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};

exports.delAllRecords = function(callback)
{
	UserModel.remove({}, callback); // reset UserModel collection for testing //
}

exports.validatePassword = function(plainPass, hashedPass, callback){
    var defer = q.defer();
    
    //console.log(hashedPass);
    
    validatePassword(plainPass, hashedPass, function(err, isValid){
        
        if(isValid == true){
            
            defer.resolve(isValid);
            //callback(null, isValid);
        }
        else{
            defer.reject("Invalid password");
            //callback("Invalid Password", isValid);
        }
    });
    
    return defer.promise;
}

/* private encryption & validation methods */

var generateSalt = function()
{
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(pass, callback)
{ 
    
	var salt = generateSalt();
    
    return (salt + md5(pass + salt))
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
    console.log("Creating hash with password: " + plainPass);
	var validHash = salt + md5(plainPass + salt);
    //console.log(validHash);
	callback(null, hashedPass === validHash);
}

/* auxiliary methods */

var getObjectId = function(id)
{
	return new require('mongodb').ObjectID(id);
}

var findById = function(id, callback)
{
	UserModel.findOne({_id: getObjectId(id)},
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};


var findByMultipleFields = function(a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	UserModel.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}

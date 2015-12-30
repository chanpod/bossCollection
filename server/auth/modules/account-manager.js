
var crypto 		= require('crypto');
//var MongoDB 	= require('mongodb').Db;
//var Server 		= require('mongodb').Server;
var moment 		= require('moment');




var dbPort 		= 27017;
var dbHost 		= 'localhost';
var dbName 		= 'bosscollection';
var collections = ["UserModel"];
//var mongoose    = require('mongoose');
//var mongooseDB  = mongoose.createConnection(dbHost);


var mongoose = require('mongoose');
var mongooseDB  = mongoose.connect("mongodb://localhost/bosscollection");

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    name: String,
    password: String,
    email: String,
    battleTag: String,
    characters: Array
})

var UserModel = mongoose.model('accounts', UserSchema);


//var UserModel   = require('../../models/user');
//var mongoosedb = require("mongojs").connect(dbHost, collections);

/* establish the database connection 

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
	db.open(function(e, d){
	if (e) {
		console.log(e);
	}	else{
		console.log('connected to database :: ' + dbName);
	}
});

var UserModel = db.collection('UserModel');
*/
/* login validation methods */

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

exports.manualLogin = function(user, pass, callback)
{
	UserModel.findOne({name:user}, function(e, userFound) {
        
		if (userFound == null){
            
            UserModel.findOne({email: user}, function(err, userFound){
                
                if(err){
                    
                    callback('Username or Email not found.');
                }

                validatePassword(pass, userFound.password, function (err, res) {
                    if (res) {
                        callback(null, userFound);
                    } else {
                        callback('invalid-password');
                    }
                });
            })
            
			
		}	else{
            
            console.log(pass);
            console.log(o.password);
			validatePassword(pass, o.password, function(err, res) {
				if (res){
					callback(null, o);
				}	else{
					callback('invalid-password');
				}
			});
		}
	});
}

/* record insertion, update & deletion methods */

exports.addNewAccount = function(newUser, callback)
{
    if(newUser.name == '' || newUser.name == undefined){
        callback('User name missing!');
        return;
    }
    
    if(newUser.password == undefined || newUser.password.length == 0){
        callback('Password is empty!');
        return;
    }
    
	UserModel.findOne({name:newUser.name}, function(e, o) {
		if (o){
			callback('username-taken');
		}	else{
			UserModel.findOne({email:newUser.email}, function(e, o) {
				if (o){
					callback('email-taken');
				}	else{
                    
					saltAndHash(newUser.password, function(hash){
						newUser.password = hash;
					// append date stamp when record was created //
						newUser.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                        console.log("Adding new user: " + newUser);
                        var user = new UserModel(newUser);
						user.save(callback);
					});
                    
				}
			});
		}
	});
}

exports.updateAccount = function(userAccount, callback)
{
    
    console.log("Saving account: " + JSON.stringify(userAccount));
    //console.log(userModel);

    var query = {"name" : userAccount.name};
    
    UserModel.findOneAndUpdate(query, userAccount, function(err, savedUser){
        
        if(err){
            console.log(err);
            callback(err);
        }
        
        callback(null, userAccount);
    })
}

exports.updatePassword = function(email, newPass, callback)
{
	UserModel.findOne({email:email}, function(e, o){
        
		if (e){
			callback(e, null);
		}	else{
            
			saltAndHash(newPass, function(hash){
                
		        o.password = hash;
		        UserModel.save(o, {safe: true}, callback);
			});
		}
	});
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
    
    console.log(hashedPass);
    validatePassword(plainPass, hashedPass, function(err, isValid){
        
        if(isValid == true){
            
            callback(null, isValid);
        }
        else{
            callback("Invalid Password", isValid);
        }
    });
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
	callback(salt + md5(pass + salt));
}

var validatePassword = function(plainPass, hashedPass, callback)
{
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
    console.log(validHash);
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

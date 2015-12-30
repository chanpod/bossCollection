
var crypto 		= require('crypto');
var MongoDB 	= require('mongodb').Db;
var Server 		= require('mongodb').Server;
var moment 		= require('moment');




var dbPort 		= 27017;
var dbHost 		= 'localhost';
var dbName 		= 'bosscollection';
var collections = ["accounts"];
var mongoose    = require('mongoose');
var mongooseDB  = mongoose.createConnection(dbHost);
var userModel   = require('../../models/user');
//var mongoosedb = require("mongojs").connect(dbHost, collections);

/* establish the database connection */

var db = new MongoDB(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}), {w: 1});
	db.open(function(e, d){
	if (e) {
		console.log(e);
	}	else{
		console.log('connected to database :: ' + dbName);
	}
});

var accounts = db.collection('accounts');

/* login validation methods */

exports.autoLogin = function(name, password, callback)
{
	accounts.findOne({name:name}, function(e, o) {
		if (o){
			o.password == password ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}

exports.manualLogin = function(user, pass, callback)
{
	accounts.findOne({name:user}, function(e, o) {
        
		if (o == null){
			callback('user-not-found');
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
    
	accounts.findOne({name:newUser.name}, function(e, o) {
		if (o){
			callback('username-taken');
		}	else{
			accounts.findOne({email:newUser.email}, function(e, o) {
				if (o){
					callback('email-taken');
				}	else{
                    
					saltAndHash(newUser.password, function(hash){
						newUser.password = hash;
					// append date stamp when record was created //
						newUser.date = moment().format('MMMM Do YYYY, h:mm:ss a');
                        console.log("Adding new user: " + newUser);
						accounts.insert(newUser, {safe: true}, callback);
					});
                    
				}
			});
		}
	});
}

exports.updateAccount = function(userAccount, callback)
{
    
    console.log("Saving account: " + JSON.stringify(userAccount));
    console.log(userModel);
    var user = new userModel(userAccount);
    
    user.findOne({"name": userAccount.name}, userAccount, function (err, user) {

        if (err) {
            console.log("It broke");
            console.log(err);
            callback(err);
        }
        
        console.log("????")
        console.log(user);
        user.email = userAccount.email
        user.battleTag = userAccount.battleTag
        user.password = userAccount.password
         
        user.save();
        callback(null, user);
    })
    /*
	accounts.findOne({name:newData.name}, function(e, userAccount){
        
		userAccount = newData;
        
        

        if (newData.password == '') {
            
            console.log("Saving account: " + JSON.stringify(userAccount));
            accounts.save(userAccount, { safe: true }, function (err) {

                if (err) callback(err);
                else callback(null, userAccount);
            });
        } else {

            saltAndHash(newData.password, function (hash) {

                userAccount.password = hash;
                accounts.save(userAccount, { safe: true }, function (err) {

                    if (err) callback(err);
                    else callback(null, userAccount);
                });
            });
        }
	});
    */
}

exports.updatePassword = function(email, newPass, callback)
{
	accounts.findOne({email:email}, function(e, o){
        
		if (e){
			callback(e, null);
		}	else{
            
			saltAndHash(newPass, function(hash){
                
		        o.password = hash;
		        accounts.save(o, {safe: true}, callback);
			});
		}
	});
}

/* account lookup methods */

exports.deleteAccount = function(id, callback)
{
	accounts.remove({_id: getObjectId(id)}, callback);
}

exports.getAccountByEmail = function(email, callback)
{
	accounts.findOne({email:email}, function(e, o){ callback(o); });
}

exports.validateResetLink = function(email, passHash, callback)
{
	accounts.find({ $and: [{email:email, password:passHash}] }, function(e, o){
		callback(o ? 'ok' : null);
	});
}

exports.getAllRecords = function(callback)
{
	accounts.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};

exports.delAllRecords = function(callback)
{
	accounts.remove({}, callback); // reset accounts collection for testing //
}

exports.validatePassword = function(plainPass, hashedPass, callback){
    
    console.log(hashedPass);
    validatePassword(plainPass, hashedPass, callback);
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
	accounts.findOne({_id: getObjectId(id)},
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};


var findByMultipleFields = function(a, callback)
{
// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	accounts.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}

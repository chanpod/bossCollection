
var ES = require('./email-settings');
var EM = {};
var q = require('q');

module.exports = EM;

EM.server = require("emailjs/email").server.connect({

	host 	    : ES.host,
	user 	    : ES.user,
	password    : ES.password,
	ssl		    : true

});

EM.dispatchResetPasswordLink = function(account, callback)
{
	EM.server.send({
		from         : ES.sender,
		to           : account.email,
		subject      : 'Password Reset',
		text         : "We're fixing your password. No worries.",
		attachment   : EM.composeEmail(account)
	}, callback );
}

EM.dispatchCustomEmail = function(message, subject, account){
    
    var defer = q.defer();
    
    var emailSettings = {
		from         : ES.sender,
		to           : account.email,
		subject      : subject,
		text         : 'Someone sent you a message',
		attachment   : EM.composeCustomEmail(message, account)
	}
    
    EM.server.send(emailSettings)
        .then(function(response){
            
            defer.resolve(response);
        })
    
    return defer.promise;
}

EM.composeEmail = function(o)
{
	var link = 'http://node-login.braitsch.io/reset-password?e='+o.email+'&p='+o.pass;
	var html = "<html><body>";
		html += "Hi "+o.name+",<br><br>";
		html += "Your username is :: <b>"+o.name+"</b><br><br>";
        html += "Your new temp password is: " + o.newPass + "<br>";
        html += "Please head to your account and update your password.";
		html += "</body></html>";
	return  [{data:html, alternative:true}];
}

EM.composeCustomEmail = function(message, recipient){
    var html = "<html><body>";
		html += "Hi "+recipient.name+",<br><br>";
		html += message;
		html += "</body></html>";
	return  [{data:html, alternative:true}];
}

var ES = require('./email-settings');
var EM = {};
var q = require('q');

var nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true, // true for 465, false for other ports
	auth: {
		user: ES.user, // generated ethereal user
		pass: ES.password  // generated ethereal password
	}
});

let mailOptions = {
	from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
	to: 'chanpod36@gmail.com', // list of receivers
	subject: 'Hello ✔', // Subject line
	text: 'Hello world?', // plain text body
	html: '<b>Hello world?</b>' // html body
};

transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		return console.log(error);
	}
	console.log('Message sent: %s', info.messageId);
	// Preview only available when sending through an Ethereal account
	console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

	// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
	// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});


module.exports = EM;

EM.server = require("emailjs/email").server.connect({

	host 	    : ES.host,
	user 	    : ES.user,
	password    : ES.password,
	ssl		    : true,
	port		: 465
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

var ES = require('./email-settings');
var EM = {};
var q = require('q');

var nodemailer = require('nodemailer');

// var Sendgrid = require('sendgrid')(
// 	'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'
// );




// var request = Sendgrid.emptyRequest({
// 	method: 'POST',
// 	path: '/v3/mail/send',
// 	body: {
// 		personalizations: [{
// 			to: [{ email: 'chanpod36@gmail.com' }],
// 			subject: 'Sendgrid test email from Node.js on Google Cloud Platform'
// 		}],
// 		from: { email: 'mkdir.bosscollection@gmail.com' },
// 		content: [{
// 			type: 'text/plain',
// 			value: 'Hello!\n\nThis a Sendgrid test email from Node.js on Google Cloud Platform.'
// 		}]
// 	}
// });

// Sendgrid.API(request, function (error, response) {
// 	if (error) {
// 		console.log('Mail not sent; see error message below.');
// 	} else {
// 		console.log('Mail sent successfully!');
// 	}
// 	console.log(response);
// 	console.log(response.body.errors);
// });

module.exports = EM;

EM.server = require('sendgrid')(
	'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'
);


// require("emailjs/email").server.connect({

// 		host: ES.host,
// 		user: ES.user,
// 		password: ES.password,
// 		ssl: true,
// 		port: 465
// 	});

EM.dispatchResetPasswordLink = function (account, callback) {
	var request = EM.server.emptyRequest({
		method: 'POST',
		path: '/v3/mail/send',
		body: {
			personalizations: [{
				to: [{ email: account.email }],
				subject: 'Password Reset'
			}],
			from: { email: 'mkdir.bosscollection@gmail.com' },
			content: [{
				type: 'text/plain',
				value: EM.composeEmail(account)
			}]
		}
	});

	EM.server.API(request, function (error, response) {

		if (error) {
			console.log('Mail not sent; see error message below.');
			console.log(response.body.errors);
		} else {
			callback();
		}

		console.log(response);
	});


	// 	{
	// 	from: ES.sender,
	// 	to: account.email,
	// 	subject: 'Password Reset',
	// 	text: "We're fixing your password. No worries.",
	// 	attachment: EM.composeEmail(account)
	// }, callback);
}

EM.dispatchCustomEmail = function (message, subject, account) {

	var defer = q.defer();

	var emailSettings = {
		from: ES.sender,
		to: account.email,
		subject: subject,
		text: 'Someone sent you a message',
		attachment: EM.composeCustomEmail(message, account)
	}

	EM.server.send(emailSettings)
		.then(function (response) {

			defer.resolve(response);
		})

	return defer.promise;
}

EM.composeEmail = function (o) {
	var link = 'http://node-login.braitsch.io/reset-password?e=' + o.email + '&p=' + o.pass;
	var html = "<html><body>";
	html += "Hi " + o.name + ",<br><br>";
	html += "Your username is :: <b>" + o.name + "</b><br><br>";
	html += "Your new temp password is: " + o.newPass + "<br>";
	html += "Please head to your account and update your password.";
	html += "</body></html>";
	// return [{ data: html, alternative: true }];
	return html;
}

EM.composeCustomEmail = function (message, recipient) {
	var html = "<html><body>";
	html += "Hi " + recipient.name + ",<br><br>";
	html += message;
	html += "</body></html>";
	return [{ data: html, alternative: true }];
}
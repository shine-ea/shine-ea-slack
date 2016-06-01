var request = require('request');

var config = require('./config');

module.exports = {
	getSlackCommandResultForJiraTicket: ticket
}

function login() {
	return new Promise(function(resolve, reject) {
		request.post({
			url: config.JIRA_LOGIN,
			form: {
				username: config.JIRA_USERNAME,
				password: config.JIRA_PASSWORD
			}
		}, function(err, resp) {
			if (err) {
				reject(err);
			}
			console.log(resp);
		});
	});

}

function ticket(ticketNubmer) {

	if (/[a-zA-Z]+\-\d+/gi.test(ticketNubmer)) {
		return getTicketDesc(ticketNubmer);
	} else {
		return {
			text: 'ticket number invalid: ' + ticketNubmer
		}
	}

	function getTicketDesc(num) {

	}

}
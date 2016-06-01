var request = require('request');
var _ = require('lodash');

request = request.defaults({jar: true})

var config = require('./config');

module.exports = {
	getJiraTicket: getJiraTicket
}

var __isAuthenticated = false;

function getJiraTicket(ticketNubmer) {

	if (/[a-zA-Z]+\-\d+/gi.test(ticketNubmer)) {
		return getTicketDesc(ticketNubmer);
	} else {
		return Promise.reject({
			text: 'ticket number invalid: ' + ticketNubmer
		});
	}

	function getTicketDesc(num) {
		return getLoginCookie()
			.then(function(){
				console.log('start getting ticket desc', num);
				return new Promise(function(resolve, reject){
					request.get(config.JIRA_ISSUE + num, function(err, resp, body){
						if(err) {
							reject(err);
						}
						if(resp.statusCode != 200) {
							reject(new Error('response not ok', resp.statusCode));
						}

						try {
							body = JSON.parse(body)
						} catch(e) {
							reject(e);
						}
						
						resolve({
							key: body.key,
							name: _.get(body, 'fields.summary', '[name: not-found]'),
							fixVersions: _.get(body, 'fields.fixVersions[0].name', '[fixVersions: not-found]'),
							status: _.get(body, 'fields.status.name', '[status: not-found]'),
							capType: _.get(body, 'fields.customfield_11100.value', '[capType: not-found]'),
							assignee: _.get(body, 'fields.assignee.displayName', '[assignee: not-found]')
						});
					});
				});
			})
	}

}

function getLoginCookie() {
	
	if(__isAuthenticated === true) {
		return Promise.resolve();
	}

	return new Promise(function(resolve, reject) {
		console.log('logging in');
		request.post({
			url: config.JIRA_LOGIN,
			form: {
				username: config.JIRA_USERNAME,
				password: config.JIRA_PASSWORD
			}
		}, function(err) {
			if (err) {
				reject(err);
			}
			__isAuthenticated = true;
			resolve()
		});
	});
}
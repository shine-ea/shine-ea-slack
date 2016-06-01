require('es6-promise').polyfill();

var jira = require('./jira');

jira.getJiraTicket('DS-3558')
	.then(function(data){
		console.info('fetch data', data);
	})
	.catch(function(err){
		console.error('error', err);
	});

require('es6-promise').polyfill();

var jira = require('./jira');
var format = require('./format');

jira.getJiraTicket('DS-3558')
	.then(function(data){
		console.info('fetch data', format.formatJira(data));
	})
	.catch(function(err){
		console.error('error', err);
	});

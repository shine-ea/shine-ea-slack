require('es6-promise').polyfill();

var express = require('express');
var bodyParser = require('body-parser')

var config = require('./config');
var jira = require('./jira');
var format = require('./format');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/jira', function (req, res) {
	console.log('/jira');
	if(isTokenMatch(req.body.token)) {
		console.log('start getting jira ticket', req.body.text);
		jira.getJiraTicket(req.body.text)
			.then(function(data){
				console.log('success', data);
				res.send(format.formatJira(data));
			})
			.catch(function(err){
				console.error(err);
				res.send(fail(err.message));
			})
	} else {
		console.log('fail token not match', req.body.token);
		res.send(fail('token'));
	}
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

function isTokenMatch(t) {
	return t == config.SLACK_TOKEN;
}

function fail(msg) {
	return {
		text: msg
	}
}
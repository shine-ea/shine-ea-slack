require('es6-promise').polyfill();

var express = require('express');
var bodyParser = require('body-parser')

var config = require('./config');
var jira = require('./jira');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/jira', function (req, res) {
	if(isTokenMatch(req.body.token)) {
		res.send(jira.getSlackCommandResultForJiraTicket(req.body.text));
	} else {
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
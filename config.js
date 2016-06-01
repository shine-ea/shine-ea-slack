module.exports = {
	SLACK_TOKEN: process.env.SLACK_TOKEN,
	JIRA_USERNAME: process.env.JIRA_USERNAME || 'Gary.Xue',
	JIRA_PASSWORD: process.env.JIRA_PASSWORD || 'ms@MIT12',
	JIRA_LOGIN: 'https://energyaustralia.atlassian.net/login',
	JIRA_ISSUE: 'https://energyaustralia.atlassian.net/rest/api/latest/issue/'
}
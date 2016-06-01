module.exports = {
	formatJira: formatJira
}

function formatJira(ticket) {
	return {
		response_type: 'in_channel',
		text: ticket.key + ': ' + ticket.name + 
			', fix: ' + ticket.fixVersions + ', status: ' + ticket.status + 
			', capType: ' + ticket.capType + ', assignee: ' + ticket.assignee
	}
}
module.exports = {
	formatJira: formatJira
}

function formatJira(ticket) {
	return {
		response_type: 'in_channel',
		text: ticket.key + ': ' + ticket.name + 
			'\nfix: ' + ticket.fixVersions + ', status: ' + ticket.status + 
			'\ncapType: ' + ticket.capType + ', assignee: ' + ticket.assignee
	}
}
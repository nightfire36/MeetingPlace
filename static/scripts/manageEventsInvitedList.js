import { searchUsersResults } from './searchUsersResults.js';

export function manageEventsInvitedList(eventId) {
    getEventInvitedUsers(eventId);
}

function getEventInvitedUsers(eventId) {

	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            document.getElementById("manage_event_card_content").innerHTML = 
                "<p id = \"search_results\">Loading content...</p>";
            searchUsersResults(JSON.parse(this.responseText));
		}
	});
	req.open("POST", "/api/find_users", true);
    req.setRequestHeader("Content-Type", "application/json");

	req.send(JSON.stringify({ invitationEid: eventId }));
}
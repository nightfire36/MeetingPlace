import { userId } from './login.js';
import { eventsParticipated } from './eventsParticipated.js';

export function invitationsAccepted() {
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
			insertInvitaionsIntoPage(JSON.parse(this.responseText));
		}
	});
	req.open("POST", "/api/find_events", true);
    req.setRequestHeader("Content-Type", "application/json");

    req.send(JSON.stringify({
        invitedUserUid: userId,
        invitedUserStatus: 1
    }));
}

function insertInvitaionsIntoPage(invitationsList) {
	document.getElementById("invitations_card_content").innerHTML = generateHtmlCode(invitationsList);

	var rejectInvitationHandler = function(eventId) {
		return function() {
			rejectInvitation(eventId);
		}
	}

	for(var i = 0; i < invitationsList.length; i++) {
		document.getElementById("reject_invitation_" + invitationsList[i].eid).onclick = 
			rejectInvitationHandler(invitationsList[i].eid);
    }
}

function rejectInvitation(eventId) {
	console.log('rejectInvitation: ' + eventId);
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			eventsParticipated();
		}
	});
	req.open("POST", "/api/reject_invitation", true);
	req.setRequestHeader("Content-Type", "application/json")
	req.send(JSON.stringify({ eid: eventId }));
}

function generateHtmlCode(invitationsList) {
	var columns = '';

    for(var invitationIdx in invitationsList) {
        columns += `
            <tr>
                <th scope="row">${invitationsList[invitationIdx].eid}</th>
                <td>${invitationsList[invitationIdx].name}</td>
                <td>${invitationsList[invitationIdx].description}</td>
				<td>${invitationsList[invitationIdx].date}</td>
                <td>
                    <button type="button" class="btn btn-danger" id="reject_invitation_${invitationsList[invitationIdx].eid}">Reject</button>
				</td>
			</tr>`;
	}
	var htmlCode = `
		<div class="card-body">
			<table class="table table-striped">
				<thead>
					<tr>
						<th scope="col">Event Id</th>
						<th scope="col">Event name</th>
						<th scope="col">Event description</th>
						<th scope="col">Event date</th>
						<th scope="col">Action</th>
					</tr>
				</thead>
				<tbody>
					${columns}
				</tbody>
			</table>
		</div>`;
	
	return htmlCode;
}

import { userId } from './login.js';
import { eventsParticipated } from './eventsParticipated.js';

export function invitationsRejected() {
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
        invitedUserStatus: 2
    }));
}

function insertInvitaionsIntoPage(invitationsList) {
	document.getElementById("invitations_card_content").innerHTML = generateHtmlCode(invitationsList);

	var acceptInvitationHandler = function(eventId) {
		return function() {
			acceptInvitation(eventId);
		}
	}

	for(var i = 0; i < invitationsList.length; i++) {
        document.getElementById("accept_invitation_" + invitationsList[i].eid).onclick = 
            acceptInvitationHandler(invitationsList[i].eid);
    }
}

function acceptInvitation(eventId) {
	console.log('acceptInvitation: ' + eventId);
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			eventsParticipated();
		}
	});
	req.open("POST", "/api/accept_invitation", true);
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
                    <button type="button" class="btn btn-success" id="accept_invitation_${invitationsList[invitationIdx].eid}">Accept</button>
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
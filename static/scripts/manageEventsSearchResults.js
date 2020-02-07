import { inviteEventId } from "./manageEventsInvite.js";

export function manageEventsSearchResults(usersList) {
    document.getElementById("search_results").innerHTML = generateHtmlCode(usersList);

    var sendInvitationHandler = function(userId) {
		return function() {
			sendInvitation(inviteEventId, userId);
		}
	}

	for(var i = 0; i < usersList.length; i++) {
		document.getElementById("invite_user_" + usersList[i].uid).onclick = 
        sendInvitationHandler(usersList[i].uid);
    }
}

function sendInvitation(eventId, userId) {
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
		}
	});
	req.open("POST", "/api/invite", true);
	req.setRequestHeader("Content-Type", "application/json")
	req.send(JSON.stringify({
        uid: userId,
        eid: eventId
    }));
}

function generateHtmlCode(usersList) {
    var columns = '';

    for(var userIdx in usersList) {
        columns += `
            <tr>
                <th scope="row">${usersList[userIdx].uid}</th>
                <td>${usersList[userIdx].firstName}</td>
                <td>${usersList[userIdx].lastName}</td>
                <td>${usersList[userIdx].email}</td>
                <td><button type="button" class="btn btn-primary" id="invite_user_${usersList[userIdx].uid}">Invite</button></td>
            </tr>`;
    }
    var htmlCode = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">User Id</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                ${columns}
            </tbody>
        </table>`;
    
    return htmlCode;
}

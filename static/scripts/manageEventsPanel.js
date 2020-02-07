import { manageEventsInvite } from "./manageEventsInvite.js";
import { manageEventsInvitedList } from "./manageEventsInvitedList.js";
import { manageEventsParticipantsList } from "./manageEventsParticipantsList.js";
import { modifyEvent } from "./modifyEvent.js";

export function setActiveManagePanel(activeId, eventId) {
	var navManageEventsInvite = `<a class="nav-link" id="invite_tab">Invite</a>`;
	var navManageEventsInviteActive = `<a class="nav-link active" id="invite_tab">Invite</a>`;

	var navManageEventsInvited = `<a class="nav-link" id="invited_list_tab">Invited list</a>`;
    var navManageEventsInvitedActive = `<a class="nav-link active" id="invited_list_tab">Invited list</a>`;
    
    var navManageEventsParticipants = `<a class="nav-link" id="participants_list_tab">Participants</a>`;
	var navManageEventsParticipantsActive = `<a class="nav-link active" id="participants_list_tab">Participants</a>`;

	var navManageEventsModify = `<a class="nav-link" id="modify_tab">Modify event</a>`;
	var navManageEventsModifyActive = `<a class="nav-link active" id="modify_tab">Modify event</a>`;

	document.getElementById("nav_invite").innerHTML = navManageEventsInvite;
    document.getElementById("nav_invited_list").innerHTML = navManageEventsInvited;
    document.getElementById("nav_participants_list").innerHTML = navManageEventsParticipants;
	document.getElementById("nav_modify").innerHTML = navManageEventsModify;

	document.getElementById("invite_tab").onclick = function() {
		setActiveManagePanel("nav_invite", eventId);
		manageEventsInvite(eventId);
	};
	document.getElementById("invited_list_tab").onclick = function() {
		setActiveManagePanel("nav_invited_list", eventId);
		manageEventsInvitedList(eventId);
    };
    document.getElementById("participants_list_tab").onclick = function() {
		setActiveManagePanel("nav_participants_list", eventId);
		manageEventsParticipantsList(eventId);
	};
	document.getElementById("modify_tab").onclick = function() {
		setActiveManagePanel("nav_modify", eventId);
		modifyEvent(eventId);
	};
    
	switch(activeId) {
		case "nav_invite":
			document.getElementById("nav_invite").innerHTML = navManageEventsInviteActive;
			break;
		case "nav_invited_list":
			document.getElementById("nav_invited_list").innerHTML = navManageEventsInvitedActive;
            break;
        case "nav_participants_list":
			document.getElementById("nav_participants_list").innerHTML = navManageEventsParticipantsActive;
			break;
		case "nav_modify":
			document.getElementById("nav_modify").innerHTML = navManageEventsModifyActive;
			break;
	}
}

export function manageEventsPanel(eventId) {
    document.getElementById("manage_event").innerHTML = generateHtmlCode();
    
	setActiveManagePanel("nav_invite", eventId);
	manageEventsInvite(eventId);
}

function generateHtmlCode() {

	var htmlCode = `
		<div class="card text-center">
			<div class="card-header">
				<ul class="nav nav-tabs card-header-tabs">
					<li class="nav-item" id="nav_invite"></li>
					<li class="nav-item" id="nav_invited_list"></li>
					<li class="nav-item" id="nav_participants_list"></li>
					<li class="nav-item" id="nav_modify"></li>
				</ul>
			</div>
			<p id="manage_event_card_content">Loading content...</p>
		</div>`;
	
	return htmlCode;
}

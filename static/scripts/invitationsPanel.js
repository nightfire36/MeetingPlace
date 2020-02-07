import { invitationsPending } from "./invitationsPending.js";
import { invitationsAccepted } from "./invitationsAccepted.js";
import { invitationsRejected } from "./invitationsRejected.js";

export function setActiveInvitations(activeId) {
	var navPending = `<a class="nav-link" id="pending_tab">Pending invitations</a>`;
	var navPendingActive = `<a class="nav-link active" id="pending_tab">Pending invitations</a>`;

	var navAccepted = `<a class="nav-link" id="accepted_tab">Accepted invitations</a>`;
	var navAcceptedActive = `<a class="nav-link active" id="accepted_tab">Accepted invitations</a>`;

	var navRejected = `<a class="nav-link" id="rejected_tab">Rejected invitations</a>`;
	var navRejectedActive = `<a class="nav-link active" id="rejected_tab">Rejected invitations</a>`;

	document.getElementById("nav_pending").innerHTML = navPending;
	document.getElementById("nav_accepted").innerHTML = navAccepted;
	document.getElementById("nav_rejected").innerHTML = navRejected;

	document.getElementById("pending_tab").onclick = function() {
		setActiveInvitations("nav_pending");
		invitationsPending();
	};
	document.getElementById("accepted_tab").onclick = function() {
		setActiveInvitations("nav_accepted");
		invitationsAccepted();
	};
	document.getElementById("rejected_tab").onclick = function() {
		setActiveInvitations("nav_rejected");
		invitationsRejected();
	};
    
	switch(activeId) {
		case "nav_pending":
			document.getElementById("nav_pending").innerHTML = navPendingActive;
			break;
		case "nav_accepted":
			document.getElementById("nav_accepted").innerHTML = navAcceptedActive;
			break;
		case "nav_rejected":
			document.getElementById("nav_rejected").innerHTML = navRejectedActive;
			break;
	}
}

export function invitationsPanel() {
    document.getElementById("invitations").innerHTML = generateHtmlCode();
    
	setActiveInvitations("nav_pending");
	invitationsPending();
}

function generateHtmlCode() {
	var htmlCode = `
		<div class="card text-center">
			<div class="card-header">
				<ul class="nav nav-tabs card-header-tabs">
					<li class="nav-item" id="nav_pending"></li>
					<li class="nav-item" id="nav_accepted"></li>
					<li class="nav-item" id="nav_rejected"></li>
				</ul>
			</div>
			<p id="invitations_card_content">Loading content...</p>
		</div>`;

	return htmlCode;
}

import { searchUsers } from "./searchUsers.js";
import { searchEvents } from "./searchEvents.js";

export function setActiveSearch(activeId) {
	var navSearchUsers = `<a class="nav-link" id="search_users_tab">Search users</a>`;
	var navSearchUsersActive = `<a class="nav-link active" id="search_users_tab">Search users</a>`;

	var navSearchEvent = `<a class="nav-link" id="search_events_tab">Search events</a>`;
	var navSearchEventActive = `<a class="nav-link active" id="search_events_tab">Search events</a>`;

	document.getElementById("nav_search_users").innerHTML = navSearchUsers;
	document.getElementById("nav_search_events").innerHTML = navSearchEvent;

	document.getElementById("search_users_tab").onclick = function() {
		setActiveSearch("nav_search_users");
		searchUsers();
	};
	document.getElementById("search_events_tab").onclick = function() {
		setActiveSearch("nav_search_events");
		searchEvents();
	};
    
	switch(activeId) {
		case "nav_search_users":
			document.getElementById("nav_search_users").innerHTML = navSearchUsersActive;
			break;
		case "nav_search_events":
			document.getElementById("nav_search_events").innerHTML = navSearchEventActive;
			break;
	}
}

export function searchPanel() {
    document.getElementById("search_criteria").innerHTML = generateHtmlCode();
    
	setActiveSearch("nav_search_users");
	searchUsers();
}

function generateHtmlCode() {
	var htmlCode = `
		<div class="card text-center">
			<div class="card-header">
				<ul class="nav nav-tabs card-header-tabs">
					<li class="nav-item" id="nav_search_users"></li>
					<li class="nav-item" id="nav_search_events"></li>
				</ul>
			</div>
			<p id="search_card_content">Loading content...</p>
		</div>`;

	return htmlCode;
}
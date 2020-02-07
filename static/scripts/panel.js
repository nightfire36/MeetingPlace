import { logout } from './logout.js';
import { createEventsTab } from './createEventsTab.js';
import { accountTab } from './accountTab.js';
import { manageEventsTab } from './manageEventsTab.js';
import { searchTab } from './searchTab.js';


export function setActive(activeId) {
	var navAccount = `<a class="nav-link" id="account_tab">Account</a>`;
	var navAccountActive = `<a class="nav-link active" id="account_tab">Account</a>`;

	var navCreateEvent = `<a class="nav-link" id="create_events_tab">Create events</a>`;
	var navCreateEventActive = `<a class="nav-link active" id="create_events_tab">Create events</a>`;

	var navManageEvents = `<a class="nav-link" id="manage_events_tab">Manage events</a>`;
	var navManageEventsActive = `<a class="nav-link active" id="manage_events_tab">Manage events</a>`;

	var navSearch = `<a class="nav-link" id="search_tab">Search</a>`;
	var navSearchActive = `<a class="nav-link active" id="search_tab">Search</a>`;

	document.getElementById("nav_account").innerHTML = navAccount;
	document.getElementById("nav_create_event").innerHTML = navCreateEvent;
	document.getElementById("nav_manage_events").innerHTML = navManageEvents;
	document.getElementById("nav_search").innerHTML = navSearch;

	document.getElementById("account_tab").onclick = function() {
		setActive("nav_account");
		accountTab();
	};
	document.getElementById("create_events_tab").onclick = function() {
		setActive("nav_create_event");
		createEventsTab();
	};
	document.getElementById("manage_events_tab").onclick = function() {
		setActive("nav_manage_events");
		manageEventsTab(null);
	};
	document.getElementById("search_tab").onclick = function() {
		setActive("nav_search");
		searchTab();
	};
	
	switch(activeId) {
		case "nav_account":
			document.getElementById("nav_account").innerHTML = navAccountActive;
			break;
		case "nav_create_event":
			document.getElementById("nav_create_event").innerHTML = navCreateEventActive;
			break;
		case "nav_manage_events":
			document.getElementById("nav_manage_events").innerHTML = navManageEventsActive;
			break;
		case "nav_search":
			document.getElementById("nav_search").innerHTML = navSearchActive;
			break;
	}
}

export function panel() {
	document.getElementById("root").innerHTML = generateHtmlCode();
	
	document.getElementById("logout").onclick = logout;

	setActive("nav_account");
	accountTab();
}

function generateHtmlCode() {

	var htmlCode = `
		<div class="card text-center">
			<div class="card-header">
				<ul class="nav nav-tabs card-header-tabs">
					<li class="nav-item" id="nav_account"></li>
					<li class="nav-item" id="nav_create_event"></li>
					<li class="nav-item" id="nav_manage_events"></li>
					<li class="nav-item" id="nav_search"></li>
					<li class="nav-item ml-auto">
						<a class="nav-link" id="logout">Logout</a>
					</li>
				</ul>
			</div>
			<p id="card_content">Loading content...</p>
		</div>`;
	
	return htmlCode;
}

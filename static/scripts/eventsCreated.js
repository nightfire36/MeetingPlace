import { userId } from './login.js';
import { setActive } from './panel.js';
import { manageEventsTab } from './manageEventsTab.js';

export function eventsCreated() {
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
            insertEventsCreatedIntoPage(JSON.parse(this.responseText));
		}
	});
	req.open("POST", "/api/find_events", true);
    req.setRequestHeader("Content-Type", "application/json");

	req.send(JSON.stringify({ uid: userId }));
}

function insertEventsCreatedIntoPage(eventsList) {
    document.getElementById("events_created").innerHTML = generateHtmlCode(eventsList);

    var manageEventHandler = function(eventId) {
		return function() {
            setActive("nav_manage_events");
			manageEventsTab(eventId);
		}
	}

	for(var i = 0; i < eventsList.length; i++) {
        document.getElementById("manage_event_" + eventsList[i].eid).onclick = 
            manageEventHandler(eventsList[i].eid);

    }
}

function generateHtmlCode(eventsList) {

    var columns = '';

    for(var eventIdx in eventsList) {
        columns += `
            <tr>
                <th scope="row">${eventsList[eventIdx].eid}</th>
                <td>${eventsList[eventIdx].name}</td>
                <td>${eventsList[eventIdx].description}</td>
                <td>${eventsList[eventIdx].date}</td>
                <td><button type="button" class="btn btn-primary" id="manage_event_${eventsList[eventIdx].eid}">Manage</button></td>
            </tr>`;

    }

    var htmlCode = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Event Id</th>
                    <th scope="col">Event name</th>
                    <th scope="col">Event description</th>
                    <th scope="col">Event date</th>
                    <th scope="col">Manage event</th>
                </tr>
            </thead>
            <tbody>
                ${columns}
            </tbody>
        </table>`;

    return htmlCode;
}
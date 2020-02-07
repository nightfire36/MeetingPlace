import { eventsCreated } from "./eventsCreated.js";
import { createEventGenerateHtmlCode } from "./createEvent.js";

export function modifyEvent(eventId) {
    if(eventId != null) {
        document.getElementById("manage_event_card_content").innerHTML = createEventGenerateHtmlCode();

        getEventById(eventId);

        document.getElementById("submit_event").onclick = function() {
            submitChanges(eventId);
        };
    }
    else {
        document.getElementById("manage_event_card_content").innerHTML = "Choose event to manage";
    }
}

function getEventById(eventId) {
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);

            var eventInfo = JSON.parse(this.responseText);
            document.getElementById("event_name").value = eventInfo.name;
            document.getElementById("description").value = eventInfo.description;
            document.getElementById("address").value = eventInfo.address;
            document.getElementById("date").value = eventInfo.date;
        }
    });
    
	req.open("POST", "/api/get_event", true);
	req.setRequestHeader("Content-Type", "application/json")
	req.send(JSON.stringify({ eid: eventId }));
}

function submitChanges(eventId) {
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
        if(this.readyState == 4 && this.status == 200) {
            eventsCreated();
        }
	});
	req.open("POST", "/api/update_event", true);
	req.setRequestHeader("Content-Type", "application/json")
	req.send(JSON.stringify({
        eid: eventId,
        name: document.getElementById("event_name").value,
		description: document.getElementById("description").value,
		address: document.getElementById("address").value,
		date: document.getElementById("date").value
	}));
}

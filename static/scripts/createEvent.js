import { eventsCreated } from "./eventsCreated.js";

export function createEvent() {
    document.getElementById("create_event").innerHTML = createEventGenerateHtmlCode();

    document.getElementById("submit_event").onclick = submitEvent;
}

function submitEvent() {
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
        if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            eventsCreated();
        }
	});
	req.open("POST", "/api/add_event", true);
	req.setRequestHeader("Content-Type", "application/json")
	req.send(JSON.stringify({
		name: document.getElementById("event_name").value,
		description: document.getElementById("description").value,
		address: document.getElementById("address").value,
		date: document.getElementById("date").value
	}));
}

export function createEventGenerateHtmlCode() {

    var htmlCode = `
        <div class="form-group">
            <label for="event_name">Event name</label>
            <input type="text" class="form-control" name="event_name" id="event_name" placeholder="Event name">
            <small id="eventNameHelp" class="form-text text-muted">Minimum 3 letters.</small>
        </div>
        <div class="form-group">
            <label for="description">Description</label>
            <input type="text" class="form-control" name="description" id="description" aria-describedby="descriptionHelp" placeholder="Description">
            <small id="descriptionHelp" class="form-text text-muted">Minimum 3 letters.</small>
        </div>
        <div class="form-group">
            <label for="address">Event address</label>
            <input type="text" class="form-control" name="address" id="address" aria-describedby="addressHelp" placeholder="Address">
            <small id="addressHelp" class="form-text text-muted">Address of the event.</small>
        </div>
        <div class="form-group">
            <label for="date">Event date</label>
            <input type="text" class="form-control" name="date" id="date" aria-describedby="dateHelp" placeholder="Date">
            <small id="dateHelp" class="form-text text-muted">Date of event in form MM.DD.YYYY .</small>
        </div>
        <div class="text-center">
            <button type="button" class="btn btn-primary" id="submit_event">Create</button>
        </div>`;

    return htmlCode;
}

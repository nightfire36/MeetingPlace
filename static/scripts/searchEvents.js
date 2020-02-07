import { searchEventsResults } from "./searchEventsResults.js";

export function searchEvents() {
    document.getElementById("search_card_content").innerHTML = generateHtmlCode();

    document.getElementById("submit_find_event").onclick = submitFindEvent;
}

function submitFindEvent() {
    
    var query = {};
    if(document.getElementById("event_name").value.length > 0) {
        query.name = document.getElementById("event_name").value;
    }
    if(document.getElementById("title").value.length > 0) {
        query.title = document.getElementById("title").value;
    }
    if(document.getElementById("event_description").value.length > 0) {
        query.description = document.getElementById("event_description").value;
    }
    if(document.getElementById("user_id").value.length > 0) {
        query.uid = document.getElementById("user_id").value;
    }

	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            
            var searchResult = JSON.parse(this.responseText);
            searchEventsResults(searchResult);
		}
	});
	req.open("POST", "/api/find_events", true);
    req.setRequestHeader("Content-Type", "application/json");

	req.send(JSON.stringify(query));
}

function generateHtmlCode() {
    var htmlCode = `
        <h5 class="card-title">Event search</h5>
        <p class="card-text">
            <div class="form-group">
                <label for="event_name">Event name</label>
                <input type="text" class="form-control" name="event_name" id="event_name" placeholder="Event name">
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" class="form-control" name="title" id="title" placeholder="Title">
            </div>
            <div class="form-group">
                <label for="event_description">Description</label>
                <input type="text" class="form-control" name="event_description" id="event_description" placeholder="Event description">
            </div>
            <div class="form-group">
                <label for="user_id">Find by user ID that created event</label>
                <input type="text" class="form-control" name="user_id" id="user_id" placeholder="User ID">
            </div>
            <div class="form-group">
                <label for="date">Date</label>
                <input type="text" class="form-control" name="date" id="date" placeholder="Date">
            </div>
            <div class="text-center">
                <button type="button" class="btn btn-primary" id="submit_find_event">Find events</button>
            </div>
        </p>`;
    
    return htmlCode;
}

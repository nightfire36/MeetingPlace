import { userId } from './login.js';

export function eventsParticipated() {
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
            document.getElementById("events_participated").innerHTML = 
                generateHtmlCode(JSON.parse(this.responseText));
		}
	});
	req.open("POST", "/api/find_events", true);
    req.setRequestHeader("Content-Type", "application/json");

	req.send(JSON.stringify({ participant: userId }));
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
                </tr>
            </thead>
            <tbody>
                ${columns}
            </tbody>
        </table>`;
    
    return htmlCode;
}
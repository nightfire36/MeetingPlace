import { searchUsersResults } from "./searchUsersResults.js";

export function searchUsers() {
    document.getElementById("search_card_content").innerHTML = generateHtmlCode();

    document.getElementById("submit_find_user").onclick = function() {
        submitFindUser(searchUsersResults);
    }
}

export function submitFindUser(searchResultsFunction) {
    console.log('submitFindUser');
    
    var query = {};
    if(document.getElementById("first_name").value.length > 0) {
        query.firstName = document.getElementById("first_name").value;
    }
    if(document.getElementById("last_name").value.length > 0) {
        query.lastName = document.getElementById("last_name").value;
    }
    if(document.getElementById("email").value.length > 0) {
        query.email = document.getElementById("email").value;
    }

	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            
            var searchResult = JSON.parse(this.responseText);
            searchResultsFunction(searchResult);
		}
	});
	req.open("POST", "/api/find_users", true);
	req.setRequestHeader("Content-Type", "application/json")
	req.send(JSON.stringify(query));
}

function generateHtmlCode() {

    var htmlCode = `
        <h5 class="card-title">User search</h5>
        <p class="card-text">
            <div class="form-group">
                <label for="first_name">First name</label>
                <input type="text" class="form-control" name="first_name" id="first_name" placeholder="First name">
            </div>
            <div class="form-group">
                <label for="last_name">Last name</label>
                <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Last name">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" name="email" id="email" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="event_participated_in">Event ID participated in</label>
                <input type="text" class="form-control" name="password" id="event_participated_in" placeholder="Event ID participated in">
            </div>
            <div class="form-group">
                <label for="event_created">Event ID created by user</label>
                <input type="text" class="form-control" name="event_created" id="event_created" placeholder="Event created">
            </div>
            <div class="text-center">
                <button type="button" class="btn btn-primary" id="submit_find_user">Find users</button>
            </div>
        </p>`;
    
    return htmlCode;
}

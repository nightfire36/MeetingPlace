import { submitFindUser } from './searchUsers.js';
import { manageEventsSearchResults } from './manageEventsSearchResults.js';

export var inviteEventId;

export function manageEventsInvite(eventId) {

    document.getElementById("manage_event_card_content").innerHTML = generateHtmlCode();

    inviteEventId = eventId;

    document.getElementById("invite_find_user").onclick = function() {
        submitFindUser(manageEventsSearchResults);
    }
}

function generateHtmlCode() {

    var htmlCode = `
        <p class="card-text">
            <div class="form-group">
                <label>First name</label>
                <input type="text" class="form-control" name="first_name" id="first_name" placeholder="First name">
            </div>
            <div class="form-group">
                <label for="lastName">Last name</label>
                <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Last name">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" name="email" id="email" placeholder="Enter email">
            </div>
            <div class="text-center">
                <button type="button" class="btn btn-primary" id="invite_find_user">Find users</button>
            </div>
            <br />
            <p id = "search_results">Loading content...</p>
        </p>`;

    return htmlCode;
}

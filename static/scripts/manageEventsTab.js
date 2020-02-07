import { manageEventsPanel } from "./manageEventsPanel.js";
import { eventsCreated } from "./eventsCreated.js";

export function manageEventsTab(eventId) {
    document.getElementById("card_content").innerHTML = generateHtmlCode();

    manageEventsPanel(eventId);
    eventsCreated();
}

function generateHtmlCode() {

    var htmlCode = `
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="card border-primary">
                        <div class="card-header">Manage event</div>
                        <p class="card-text">
                            <p id = "manage_event">Loading content...</p>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="card border-secondary">
                        <div class="card-header">Events created</div>
                        <p class="card-text">
                            <p id = "events_created">Loading content...</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>`;

    return htmlCode;
}

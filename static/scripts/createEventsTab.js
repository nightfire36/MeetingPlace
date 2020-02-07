import { createEvent } from "./createEvent.js";
import { eventsCreated } from "./eventsCreated.js";

export function createEventsTab() {
    document.getElementById("card_content").innerHTML = generateHtmlCode();

    createEvent();
    eventsCreated();
}

function generateHtmlCode() {
    var htmlCode = `
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="card border-primary">
                        <div class="card-header">Create event</div>
                        <p class="card-text">
                            <p id = "create_event">Loading content...</p>
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

import { userInfo } from './userInfo.js';
import { eventsCreated } from './eventsCreated.js';
import { invitationsPanel } from './invitationsPanel.js';
import { eventsParticipated } from './eventsParticipated.js';

export function accountTab() {
    document.getElementById("card_content").innerHTML = generateHtmlCode();
    userInfo();
    eventsCreated();
    invitationsPanel();
    eventsParticipated();
}

function generateHtmlCode() {
    var htmlCode = `
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="card border-primary">
                        <div class="card-header">User information</div>
                        <p class="card-text">
                            <p id = "user_info">Loading content...</p>
                        </p>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="card border-primary">
                        <div class="card-header">Events created</div>
                        <p class="card-text">
                            <p id = "events_created">Loading content...</p>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="card border-secondary">
                        <div class="card-header">Invitations</div>
                        <p class="card-text">
                            <p id = "invitations">Loading content...</p>
                        </p>
                    </div>
                </div>
                <br />
                <div class="row">
                    <div class="card border-secondary">
                        <div class="card-header">Events participated in</div>
                        <p class="card-text">
                            <p id = "events_participated">Loading content...</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>`;
    
    return htmlCode;
}
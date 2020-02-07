import { searchPanel } from "./searchPanel.js";

export function searchTab() {
    document.getElementById("card_content").innerHTML = generateHtmlCode();
    searchPanel();
}

function generateHtmlCode() {
    var htmlCode = `
        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="card border-primary">
                        <div class="card-header">Search criteria</div>
                        <p class="card-text">
                            <p id = "search_criteria">Loading content...</p>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="row">
                    <div class="card border-secondary">
                        <div class="card-header">Results</div>
                        <p class="card-text">
                            <p id="search_results">Loading content...</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>`;
    
    return htmlCode;
}

export function searchEventsResults(eventsList) {
    document.getElementById("search_results").innerHTML = generateHtmlCode(eventsList);
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

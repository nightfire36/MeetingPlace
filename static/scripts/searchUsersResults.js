export function searchUsersResults(usersList) {
    document.getElementById("search_results").innerHTML = generateHtmlCode(usersList);
}

function generateHtmlCode(usersList) {
    var columns = '';

    for(var userIdx in usersList) {
        columns += `
            <tr>
                <th scope="row">${usersList[userIdx].uid}</th>
                <td>${usersList[userIdx].firstName}</td>
                <td>${usersList[userIdx].lastName}</td>
                <td>${usersList[userIdx].email}</td>
            </tr>`;
    }
    
    var htmlCode = `
        <table class="table table-striped">
            <thead>
                <tr>
                    <th scope="col">User Id</th>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">E-mail</th>
                </tr>
            </thead>
            <tbody>
                ${columns}
            </tbody>
        </table>`;
    
    return htmlCode;
}

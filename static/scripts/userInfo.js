export function userInfo() {
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
			document.getElementById("user_info").innerHTML = 
				generateHtmlCode(JSON.parse(this.responseText));
		}
	});
	req.open("POST", "/api/get_user", true);
	req.setRequestHeader("Content-Type", "application/json")
	req.send();
}

function generateHtmlCode(userData) {

	var htmlCode = `
		<table class="table table-striped">
		<tbody>
			<tr>
				<th scope="row">First name</th>
				<td>${userData.firstName}</td>
			</tr>
			<tr>
				<th scope="row">Last name</th>
				<td>${userData.lastName}</td>
			</tr>
			<tr>
				<th scope="row">E-mail</th>
				<td>${userData.email}</td>
			</tr>
			<tr>
				<th scope="row">Date of creation</th>
				<td>${userData.createdAt}</td>
			</tr>
		</tbody>
		</table>`;
	
	return htmlCode;
}

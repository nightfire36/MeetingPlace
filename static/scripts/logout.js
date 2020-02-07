import { login } from "./login.js";

export function logout() {
	console.log('logout');
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			login();
			document.getElementById("message").innerHTML = 
					'<font color=\"green\">Successful logout</font>';
		}
	});
	req.open("POST", "/api/logout", true);
	req.setRequestHeader("Content-Type", "text/plain")
	req.send();
}

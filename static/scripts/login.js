import { register } from './register.js';
import { panel } from './panel.js';

export var userId;

export function login() {
	document.getElementById("root").innerHTML = generateHtmlCode('');

	document.getElementById("redirect_to_register").onclick = register;
	document.getElementById("redirect_to_register2").onclick = register;

	document.getElementById("submit_login").onclick = submit;
}

function submit() {
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
			var parsedResponse = JSON.parse(this.responseText);
			if(parsedResponse.stat == 'Successful login') {
				userId = parsedResponse.userId;
				panel();
			}
			else {
				document.getElementById("message").innerHTML = 
					'<font color=\"red\">Bad credentials</font>';
			}
		}
	});
	req.open("POST", "/api/login", true);
	req.setRequestHeader("Content-Type", "application/json")
	req.send(JSON.stringify({
		email: document.getElementById("username").value,
		password: document.getElementById("password").value
	}));
}

function generateHtmlCode() {
	var htmlCode = `
		<div class="card mx-auto" style="width: 36rem;">
			<h5 class="card-title mx-auto">Welcome on the webpage</h5>
			<div class="card-body">
				This application was designed for organizing events. If you don't have an account 
				you need to <span class="link" id="redirect_to_register2">create one for free</span>. 
			</div>
		</div>
		<br />
		<div class="card mx-auto" style="width: 24rem;">
			<h5 class="card-title mx-auto">Login</h5>
			<div class="card-body">
				<p id="message"></p>
				<div class="form-group">
					<label for="username">Email address</label>
					<input type="email" class="form-control" name="username" id="username" aria-describedby="emailHelp" placeholder="Enter email">
					<small id="emailHelp" class="form-text text-muted">Enter your e-mail address.</small>
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" class="form-control" name="password" id="password" placeholder="Password">
				</div>
				<div class="text-center">
					<button type="button" class="btn btn-primary" id="submit_login">Submit</button>
				</div>
				<div class="text-center">
					Don't have an account? <span class="link" id="redirect_to_register">Create for free.</span>
				</div>
			</div>
		</div>`;

	return htmlCode;
}

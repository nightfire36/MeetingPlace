import { login } from './login.js';

export function register() {
	document.getElementById("root").innerHTML = generateHtmlCode();
	document.getElementById("redirect_to_login").onclick = login;

	document.getElementById("submit_register").onclick = submit;
}

function submit() {
	console.log('submitting');
	var req = new XMLHttpRequest();

	req.addEventListener("load", function(event) {
		if(this.readyState == 4 && this.status == 200) {
			login();
		}
	});
	req.open("POST", "/api/register", true);
	req.setRequestHeader("Content-Type", "application/json")
	req.send(JSON.stringify({
		firstName: document.getElementById("first_name").value,
		lastName: document.getElementById("last_name").value,
		email: document.getElementById("exampleInputEmail1").value,
		password: document.getElementById("exampleInputPassword1").value
	}));
}

function generateHtmlCode() {
	var htmlCode = `
		<div class="card mx-auto" style="width: 24rem;">
			<h5 class="card-title mx-auto">Create new account</h5>
			<div class="card-body">
				<p id="message"></p>
				<div class="form-group">
					<label for="first_name">First name</label>
					<input type="text" class="form-control" name="first_name" id="first_name" placeholder="First name">
					<small id="firstNameHelp" class="form-text text-muted">Minimum 3 letters.</small>
				</div>
				<div class="form-group">
					<label for="lastName">Last name</label>
					<input type="text" class="form-control" name="last_name" id="last_name" aria-describedby="lastNameHelp" placeholder="Last name">
					<small id="lastNameHelp" class="form-text text-muted">Minimum 3 letters.</small>
				</div>
				<div class="form-group">
					<label for="exampleInputEmail1">Email address</label>
					<input type="email" class="form-control" name="email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
					<small id="emailHelp" class="form-text text-muted">Must be valid e-mail address.</small>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Password</label>
					<input type="password" class="form-control" name="password" id="exampleInputPassword1" aria-describedby="passwordHelp" placeholder="Password">
					<small id="passwordHelp" class="form-text text-muted">Must consist of minimum 6 signs.</small>
				</div>
				<div class="text-center">
					<button type="button" class="btn btn-primary" id="submit_register">Submit</button>
				</div>
				<div class="text-center">
					Already have an account? <span class="link" id="redirect_to_login">Sign in</span>
				</div>
			</div>
		</div>`;
	
	return htmlCode;
}

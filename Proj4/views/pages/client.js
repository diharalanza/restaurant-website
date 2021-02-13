var loggedInUser = {};
function auth(){

	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
				loggedInUser = JSON.parse(this.responseText);

				//sets header for logged in user
				console.log(loggedInUser);
				document.getElementById('logInOrOut').innerHTML = "Logout";
				document.getElementById('logInOrOut').setAttribute("href", "http://localhost:3000/logout");

				document.getElementById('registerOrViewMyProfile').innerHTML = "View My Profile &#160 &#160";
				document.getElementById('registerOrViewMyProfile').setAttribute("href", "http://localhost:3000/users/"+loggedInUser._id);

				document.getElementById('orderForm').innerHTML = "Click to Order! &#160 &#160";
				document.getElementById('orderForm').setAttribute("href", "http://localhost:3000/orders");

		}

	}
	req.open("GET", "http://localhost:3000/login/auth");
	req.send();
}

function togglePrivacy(){

	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
			alert("Privacy mode switched " + this.responseText);
			window.location.reload();
		}
	}
	req.open("POST", window.location.href);
	req.send();
}

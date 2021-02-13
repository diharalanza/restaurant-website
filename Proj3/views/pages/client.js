let currentRestaurant = {};
let maxitemid = -1;
let namesArray = [];


//gets names of all restaurants (only reason tbh is to see when adding a new restaurant if its the same name)
function populateNamesArray(){
	let req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			namesArray = JSON.parse(this.responseText);
		}
	}
	req.open("GET", "/addrestaurant");
	req.setRequestHeader('Accept', 'application/json');
	req.send();
}

//function that checks if fields typed in are acceptable
function isValid(){

	//if name taken
	for (restaurant in namesArray) {
		if (document.getElementById("addname").value.toUpperCase().trim() == (namesArray[restaurant]).toUpperCase().trim()){
			alert("Name already taken.")
			return;
		}
	}

	//if fields empty
	if (document.getElementById('addname').value.trim() == "" || document.getElementById('addfee').value.trim() == "" || document.getElementById('addminorder').value.trim() == "") {
		alert('One or more fields are empty.');
		return;
	}

	//if minorder/delfee are not numbers
	if (isNaN(document.getElementById('addfee').value.trim()) || isNaN(document.getElementById('addminorder').value.trim())) {
		alert("You cannot have text in the delivery fee and/or minimum order fields.")
		return;
	}
	else{
		//if it is acccetable..
		alert("Success! New Restaurant submitted.")

		//send to server
		submitRestaurant();
		return;
	}
}


function submitRestaurant(){

	//creates a object with the fields that were typed in
	let restaurant = { name: document.getElementById('addname').value ,
										 delivery_fee: document.getElementById('addfee').value ,
										 min_order: document.getElementById('addminorder').value }

	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){
				console.log('Submitted!');

				//server will respond with this newly created restaurants data with a unique id
				//using the unique id, url for the restaurant is generated
				window.location.href = 'http://localhost:3000/restaurants/' + (JSON.parse(this.responseText)).id;
		}
	}
	req.open("POST", "http://localhost:3000/restaurants");

	//sets header to json cause sending json data
	req.setRequestHeader('Content-type', 'application/json');
	req.send(JSON.stringify(restaurant));
}


//gets data of the clicked restaurant
function getRestaurantData(){
	let req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){

			currentRestaurant = JSON.parse(this.responseText);

			populateDropdown();
		}
	}
	req.open("GET", window.location.href);
	req.setRequestHeader('Accept', 'application/json');
	req.send();
}


function populateDropdown(){
	let mySelect = document.getElementById("mySelect");
	//OFF : mySelect.innerHTML = "";

	let selectOption = document.createElement("option");
	selectOption.setAttribute("label", "Select a category");
	selectOption.setAttribute("value", "Select a category");
	mySelect.appendChild(selectOption);

//creates the options in the drop down menu
	for (let category in currentRestaurant.menu) {

		let anOption = document.createElement("option");
		//sets the label of the created option to the restaurants name
		anOption.setAttribute("label", category);

		//sets the value of the created option to the restaurants name
		anOption.setAttribute("value", category);

		//appends the option to the dropdown menu
		mySelect.appendChild(anOption);
	}
}


function newCategory(){

	//speccat = specified Category; checks if typed category is in use
	for(let category in currentRestaurant.menu){
		if (category.toUpperCase().trim() === document.getElementById("speccat").value.toUpperCase().trim()) {
		alert('Category already in use.')
		return;
		}
	}

	//checks if typed category is empty
	if (document.getElementById("speccat").value.trim() == "") {
		alert("Category cannot be empty")
		return;
	}

	//adds to this restaurants object
	currentRestaurant.menu[document.getElementById("speccat").value] = {};
	console.log(currentRestaurant);

	//adds category to drop down menu
	let newOption = document.createElement("option");
	newOption.setAttribute("label", document.getElementById("speccat").value );
	newOption.setAttribute("value", document.getElementById("speccat").value);
	mySelect.appendChild(newOption);

	//adds to page for client to see
	newcategorydiv = document.createElement("div");
	newcategorydiv.setAttribute("id", document.getElementById("speccat").value);

	newcategoryname = document.createElement("h2");
	newcategoryname.innerHTML = document.getElementById("speccat").value;

	newcategorydiv.appendChild(newcategoryname);
	document.getElementById("menu").appendChild(newcategorydiv);

}


//adds new menu item to this restaurants object
function newMenuItem(){

	//finds the max food item id
	for (let category in currentRestaurant.menu) {
		for (let number in currentRestaurant.menu[category]) {
			if (parseInt(maxitemid) < parseInt(number)) {
				maxitemid = number;
			}
		}
	}

	if (document.getElementById('name').value.trim() == "" || document.getElementById('descrip').value.trim() == "" || document.getElementById('price').value.trim() == "") {
		alert('One or more fields are empty.');
		return;
	}

	if (isNaN(document.getElementById('price').value.trim())) {
		alert("You cannot have text in the price field.")
		return;
	}

	//if a category is selected...
	if (document.getElementById("mySelect").value != "Select a category") {
		//gets unique id
		maxitemid++;

		//object thst stores food item
		let itemobject = {
			name: document.getElementById("name").value,
			description: document.getElementById("descrip").value,
			price: document.getElementById("price").value
		}

		//appends this food item to menu thus appending to this restaurants object
		currentRestaurant.menu[document.getElementById("mySelect").value][maxitemid] = itemobject;
		console.log(currentRestaurant);


		//updating html page for client
		let newitemdiv = document.createElement("div");

		let newitemID = document.createElement("p");
		newitemID.innerHTML = 'ID: ' + (maxitemid).toString();
		newitemdiv.appendChild(newitemID);

		let newitemname = document.createElement("p");
		newitemname.innerHTML = 'Name: ' + document.getElementById("name").value;
		newitemdiv.appendChild(newitemname);

		let newitemdescrip = document.createElement("p");
		newitemdescrip.innerHTML = 'Description: ' + document.getElementById("descrip").value;
		newitemdiv.appendChild(newitemdescrip);

		let newitemprice = document.createElement("p");
		newitemprice.innerHTML = 'Price: $'+document.getElementById("price").value;
		newitemdiv.appendChild(newitemprice);

		let newitemdivide = document.createElement("p");
		newitemdivide.innerHTML = "_________________________________________________________________________________________________";
		newitemdiv.appendChild(newitemdivide);

		document.getElementById(document.getElementById("mySelect").value).appendChild(newitemdiv);

	}

}

//gets new (or same) name, delfee and minorder, updates, then sends to server
function sendUpdated(){

	//basic checks to see if valid
	if (isNaN(document.getElementById('specfee').value.trim()) || isNaN(document.getElementById('specminorder').value.trim())) {
		alert("You cannot have text in the delivery fee and/or minimum order fields.")
		return;
	}

	if (document.getElementById('specname').value.trim() == "" || document.getElementById('specfee').value.trim() == "" || document.getElementById('specminorder').value.trim() == "") {
		alert('One or more fields are empty.');
		return;
	}

	//get inner html of typed in new/notnew name, delivery fee and minorder, updates
	currentRestaurant.name = document.getElementById("specname").value;
	currentRestaurant.delivery_fee = document.getElementById("specfee").value;
	currentRestaurant.min_order = document.getElementById("specminorder").value;
	console.log(currentRestaurant);


	//sends put request with the current restaurant object
	req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(this.readyState==4 && this.status==200){

				console.log(this.responseText);
				//if the function reaches here, everything was good so might as well..
				alert(this.responseText);
		}
	}

	req.open("PUT", window.location.href);

	//sets header to json cause sending json data
	req.setRequestHeader('Content-type', 'application/json');
	req.send(JSON.stringify(currentRestaurant));



}

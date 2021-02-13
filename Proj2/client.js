//names sent from server to populate the dd menu
let restaurantNames = [];

//all data that will be sent from server when a restaurant is selected from dd menu
let selecetedRestaurantData = {};

//object to be sent to server when submitted
let submitData = {name: "",
									orders: [],
								  total: 0};

//----------------------------------------------------------------------------------------------------------------------

//important attributes
let optionSelected = "";
let optionSelectedForClearing = "";
let restaurantsIndex = "";
let total = 0;
let amountNeeded = 0;
let yourOrder = [];
let thisRestaurantsMenu="";

//a function that clears necessary content
function clearAll(){
	document.getElementById("quickmenu").innerHTML = "";
	document.getElementById("mainmenu").innerHTML="";
	document.getElementById("name").innerHTML = "";
	document.getElementById("min").innerHTML = "";
	document.getElementById("fee").innerHTML = "";
	document.getElementById("mainmenu").innerHTML = "";
	document.getElementById("yourtotal").innerHTML = "";
	document.getElementById("submitornotenough").innerHTML = "";
	(document.getElementById('summaryinfo')).className = "summaryinfo1";
	document.getElementById("everythingOrdered").innerHTML = "";
	document.getElementById("anotherlinebreak").innerHTML ="";
	document.getElementById("anotherlinebreak1").innerHTML = "";
	document.getElementById("anotherlinebreak2").innerHTML = "";
	document.getElementById('finaltotal').innerHTML = "";
	document.getElementById('tax').innerHTML = "";
		document.getElementById('delfee').innerHTML="";
	total = 0;
	yourOrder=[];
}

function generateMenuAndQuicklinks(){




	if(optionSelected==="Select a restaurant"){
		clearAll();

	}
	else{


	//creates qucklink header
		let quicklinkheading = document.createElement("h3");
		quicklinkheading.innerHTML = "Categories:";
		document.getElementById("quickmenu").appendChild(quicklinkheading);

		thisRestaurantsMenu = selecetedRestaurantData.menu;
		//goes through the categories of restaurant
		for(let category in thisRestaurantsMenu){

			//creates a div to hold the quicklink
			let thisquicklinksDiv = document.createElement("div");
			//creates the quicklink itself
			let aQuicklink = document.createElement("a");
			//sets the quicklinks address
			aQuicklink.setAttribute("href", "#"+category);
			//sets quicklinks heading
			aQuicklink.innerHTML = category;
			thisquicklinksDiv.appendChild(aQuicklink);
			document.getElementById("quickmenu").appendChild(thisquicklinksDiv);

			//creates a div to store name of category and all the options for it
			let aCategory = document.createElement("div")
			//title of category
			let nameOfCategory = document.createElement("h4");
			//sets the categories div id to itself
			aCategory.setAttribute("id", category);
			nameOfCategory.innerHTML = category + ":";
			//appends the heading of the category to the categories div
			aCategory.appendChild(nameOfCategory);
			//appends the div to the main menu
			document.getElementById("mainmenu").appendChild(aCategory);

			//(goes through the indivial item in the category)
			//adding the contents of each category to the menu
			for(let number in thisRestaurantsMenu[category]){
				let thisFoodItem = document.createElement("div");
				//food items name
				let thisFoodItemsName = document.createElement("p");
				thisFoodItemsName.innerHTML = thisRestaurantsMenu[category][number].name +" &#160";
				thisFoodItem.appendChild(thisFoodItemsName);
				//food items description
				let thisFoodItemsDescription = document.createElement("p");
				thisFoodItemsDescription.innerHTML = "&#160 &#9656 "+thisRestaurantsMenu[category][number].description;
				thisFoodItemsDescription.style.fontStyle = "italic";
				thisFoodItem.appendChild(thisFoodItemsDescription);
				//food items price
				let thisFoodItemsPrice = document.createElement("p");
				thisFoodItemsPrice.innerHTML = "&#160 &#9656 Price: $"+ thisRestaurantsMenu[category][number].price;
				thisFoodItemsPrice.style.fontStyle = "italic";
				thisFoodItem.appendChild(thisFoodItemsPrice);

				//adds the add button next to food items name
				let addButton = document.createElement("img");
				addButton.src = 'round-add-button.png';
				addButton.width = '20';
				addButton.height = '20';
				addButton.alt = thisRestaurantsMenu[category][number].price;



				//addButton.addEventListener("onclick", addToTotal(thisRestaurantsMenu[category][number].price));

				//function that adds to total
				addButton.onclick = function(){



					document.getElementById('delfee').innerHTML = "Delivery charge: $"+selecetedRestaurantData.delivery_fee;


					yourOrder[number] = yourOrder[number]+1;



					if (yourOrder[number] === 1) {

						itemBeingAddedsDiv = document.createElement("div");
						itemBeingAddedsDiv.setAttribute("id", "div "+number)

						itsName = document.createElement("p");
						itsName.innerHTML = thisRestaurantsMenu[category][number].name+ " &#160";
						itemBeingAddedsDiv.appendChild(itsName);


						itsQuantity = document.createElement("p");
						itsQuantity.setAttribute("id", "Q"+number)

						itsQuantity.innerHTML = "Quantity: 1";
						itemBeingAddedsDiv.appendChild(itsQuantity);
						document.getElementById("everythingOrdered").appendChild(itemBeingAddedsDiv);

						totalforcurrentitem = document.createElement("p");
						totalforcurrentitem.innerHTML = "Total price of this item: $"+(thisRestaurantsMenu[category][number].price).toFixed(2);
						totalforcurrentitem.setAttribute("id", "t"+number)
						itemBeingAddedsDiv.appendChild(totalforcurrentitem);


						let linebreak4summary = document.createElement("p");
						linebreak4summary.innerHTML = "______________________________";
						itemBeingAddedsDiv.appendChild(linebreak4summary);



					}
					else{
						(document.getElementById("Q"+number)).innerHTML = "Quantity: " + yourOrder[number];
						(document.getElementById("t"+number)).innerHTML = "Total price of this item: $"+(yourOrder[number]*thisRestaurantsMenu[category][number].price).toFixed(2);


					}

					//adds the add button next to food items name
					let removeButton = document.createElement("img");
					removeButton.src = '7c3767832030ff45691bcfb9da0cc712.png';
					removeButton.width = '20';
					removeButton.height = '20';
					removeButton.setAttribute("id", number);
					removeButton.alt = thisRestaurantsMenu[category][number].price;

					removeButton.addEventListener("click", remove, false);

					if (yourOrder[number]===1) {
						itsName.appendChild(removeButton);
						console.log("remove button appended");
					}




					total = total + thisRestaurantsMenu[category][number].price;
					(document.getElementById('tax')).innerHTML = "Tax rate: $"+(total*0.1).toFixed(2)+" (10%)";

					(document.getElementById('submitornotenough')).innerHTML="";
					(document.getElementById('summaryinfo')).className="summaryinfo2";


					document.getElementById('yourtotal').innerHTML = "Your subtotal is: $"+total.toFixed(2);
					document.getElementById('finaltotal').innerHTML = "Your total is: $"+((total*1.1)+selecetedRestaurantData.delivery_fee).toFixed(2);
					document.getElementById("anotherlinebreak").innerHTML = "______________________________";
					document.getElementById("anotherlinebreak1").innerHTML = "______________________________";
					document.getElementById("anotherlinebreak2").innerHTML = "______________________________";




				//	console.log(amountNeeded);
					if (total<amountNeeded) {
						let notenough = document.createElement("p");
						notenough.setAttribute("id", "NE")

						notenough.innerHTML = "You need $"+(amountNeeded-total).toFixed(2)+" more to complete your purchase.";
						notenough.style.color = 'red';
						document.getElementById('submitornotenough').appendChild(notenough);
					}
					else{
						let submit = document.createElement("input");
						submit.setAttribute("type", "button");
						submit.setAttribute("name", "Submit your order!");
						submit.setAttribute("value", "Submit your order!");
						submit.setAttribute("id", "SB");
						submit.className = "submitornot";
						document.getElementById('submitornotenough').appendChild(submit);
						submit.onclick = function(){

							//append name of restaurant to order
							submitData.name = selecetedRestaurantData.name;

							//append all items to order
							submitData.orders = yourOrder;

							//append total to order
							submitData.total = ((total*1.1)+selecetedRestaurantData.delivery_fee).toFixed(2);

							console.log(JSON.stringify(submitData));

							//send data via POST req to server
							let req = new XMLHttpRequest();
							req.onreadystatechange = function(){
								if(this.readyState == 4 && this.status == 200){
									console.log("All good.");
								}
							}

							req.open("POST", "http://localhost:3000/order/selected/submitted");
							req.send(JSON.stringify(submitData));


							alert("Your order has been successfully submitted!\n\nSubmit another order or click the 'Stats' link to see stats of each restaurant.");
							location.reload();
							return false;

						}

					}


				}
				thisFoodItemsName.appendChild(addButton);

				yourOrder.push(0);


				//a linebreak to seperate individual food items
				let linebreak = document.createElement("p");
				linebreak.innerHTML = "_________________________________________________________  ";
				thisFoodItem.appendChild(linebreak);
				//appends the food item to its specific category
				aCategory.appendChild(thisFoodItem);
			}
		}



		//adds border to the menu
		document.getElementById("mainmenu").className = "mainmenu";
	}
}



function generateInfo(){
	//checks which restaurant is selected and creates the min price and delivery charge
		for (var i = 0; i < restaurantNames.length; i++) {
			//checks which restaurant was selected
			if (optionSelected===restaurantNames[i]) {
				restaurantsIndex = i;

				//requests just the selected restaurants data to populate menu and etc
				let req = new XMLHttpRequest();
				req.onreadystatechange = function(){
					if(this.readyState == 4 && this.status == 200){
						console.log("All good. " + this.responseText);
						console.log("http://localhost:3000/order/selected" + this.responseText);
						let temp = JSON.parse(this.responseText);
						selecetedRestaurantData = temp;

						document.getElementById("name").innerHTML = "Welcome to: " + selecetedRestaurantData.name +"!";
						//creates min price needed for order
						let min = document.getElementById("min");
						min.innerHTML = "Your order must be atleast: $" + selecetedRestaurantData.min_order;
						amountNeeded = selecetedRestaurantData.min_order;
						//creates delivery fee
						let fee = document.getElementById("fee");
						fee.innerHTML = "Our delivery fee is: $" + selecetedRestaurantData.delivery_fee;

						generateMenuAndQuicklinks();
					}
				}

				req.open("POST", "http://localhost:3000/order/selected");
				req.send(JSON.stringify(restaurantsIndex));




			}
		}
}

function createDropDownList(){
	let mySelect = document.getElementById("mySelect");



//creates the options in the drop down menu
	for (let i = 0; i < restaurantNames.length; i++) {
		let anOption = document.createElement("option");
		//sets the label of the created option to the restaurants name
		anOption.setAttribute("label", restaurantNames[i]);

		//sets the value of the created option to the restaurants name
		anOption.setAttribute("value", restaurantNames[i]);

		//appends the option to the dropdown menu
		mySelect.appendChild(anOption);
	}

}

//activates when a option from dropdown menu is clicked
function clickedARestaurant() {




	if (total!=0) {
		var newPage = confirm("Are you sure you want to leave your order?");
	  if (newPage == true) {
			//clears everything when dropdown button is clicked
			clearAll();
			optionSelected = document.getElementById("mySelect").value;
			optionSelectedForClearing = document.getElementById("mySelect").value;

			generateInfo();
			generateMenuAndQuicklinks();
	  }
		else {
			document.getElementById("mySelect").value=optionSelectedForClearing;

	  }

	}

	//if no orders been made, clear page
	else{
		//clears everything when dropdown button is clicked
		clearAll();
		optionSelected = document.getElementById("mySelect").value;
		optionSelectedForClearing = document.getElementById("mySelect").value;

		generateInfo();


}



}


//when body is loaded this function (main) activates
function main(){

		//requests only restaurant names to populate drop down menu
		let req = new XMLHttpRequest();
		req.onreadystatechange = function(){
			if(this.readyState == 4 && this.status == 200){
				//console.log(this.responseText);
				let temp = JSON.parse(this.responseText);
				restaurantNames = temp;

				createDropDownList();

				//console.log(restaurants);
				console.log("All good.");
				console.log("http://localhost:3000/order/data");
			}
		}

		req.open("GET", "http://localhost:3000/order/data");
		req.send();







	//when the dropdown menu button is clicked
	document.getElementById("mySelect").onchange = clickedARestaurant;

}

function remove(event){



	let number = event.currentTarget.id;
	let pricee = event.currentTarget.alt;
	console.log(number);

	total = total - pricee;
	(document.getElementById('tax')).innerHTML = "Tax rate: $"+(total*0.1).toFixed(2)+" (10%)";

	if ((yourOrder[number])<=1) {
		(document.getElementById("div "+number)).remove();
		console.log("removed items id: "+number);
		yourOrder[number]=0;
		console.log("1opt "+yourOrder[number]);
	}

	else{
		(document.getElementById("Q"+number)).innerHTML = "Quantity: " + (yourOrder[number]-1);
		(document.getElementById("t"+number)).innerHTML = "Total price of this item: $"+((((yourOrder[number]))*pricee)-pricee).toFixed(2);
		yourOrder[number]=(yourOrder[number])-1;
		console.log("2opt "+yourOrder[number]);
}




	if (total<amountNeeded) {
		let notenough = document.createElement("p");

		notenough.innerHTML = "You need $"+ (amountNeeded - total).toFixed(2) +" more to complete your purchase.";
		notenough.style.color = 'red';
		document.getElementById("submitornotenough").innerHTML = "";



		document.getElementById('submitornotenough').appendChild(notenough);
	}

	//console.log(amountNeeded);







	//totalforcurrentitem.innerHTML=totalforcurrentitem-thisRestaurantsMenu[category][number].price;

	document.getElementById('yourtotal').innerHTML = "Your subtotal is: $"+total.toFixed(2);
	document.getElementById('finaltotal').innerHTML = "Your total is: $"+((total*1.1)+selecetedRestaurantData.delivery_fee).toFixed(2);

	document.getElementById("anotherlinebreak").innerHTML = "______________________________";
	document.getElementById("anotherlinebreak1").innerHTML = "______________________________";
	document.getElementById("anotherlinebreak2").innerHTML = "______________________________";


	if (total <= 0) {
		document.getElementById("everythingOrdered").innerHTML = "";
		document.getElementById("yourtotal").innerHTML = "";
		document.getElementById("submitornotenough").innerHTML = "";
		(document.getElementById('summaryinfo')).className="summaryinfo1";
		document.getElementById("anotherlinebreak").innerHTML ="";
		document.getElementById("anotherlinebreak1").innerHTML = "";
		document.getElementById("anotherlinebreak2").innerHTML = "";
		document.getElementById('finaltotal').innerHTML = "";


		document.getElementById('delfee').innerHTML="";
		document.getElementById('tax').innerHTML="";

 }
}

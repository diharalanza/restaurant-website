let aragorn = {
	name: "Aragorn's Orc BBQ", //The name of the restaurant
	min_order: 20, //The minimum order amount required to place an order
	delivery_charge: 5, //The delivery charge for this restaurant
	//The menu
	menu: {
		//First category
		"Appetizers": {
			//First item of this category
			0: {
				name: "Orc feet",
				description: "Seasoned and grilled over an open flame.", //
				price: 5.50
			},
			1: {
				name: "Pickled Orc fingers",
				description: "Served with warm bread, 5 per order.",
				price: 4.00
			},
			2: { //Thank you Kiratchii
				name: "Sauron's Lava Soup",
				description: "It's just really spicy water.",
				price: 7.50
			},
			3: {
				name: "Eowyn's (In)Famous Stew",
				description: "Bet you can't eat it all.",
				price: 0.50
			},
			4: {
				name: "The 9 rings of men.",
				description: "The finest of onion rings served with 9 different dipping sauces.",
				price: 14.50
			}
		},
		"Combos": {
			5: {
				name: "Buying the Farm",
				description: "An arm and a leg, a side of cheek meat, and a buttered biscuit.",
				price: 15.99
			},
			6: {
				name: "The Black Gate BooptionSelected",
				description: "Lots of unidentified pieces. Serves 50.",
				price: 65.00
			},
			7: {//Thanks to M_Sabeyon
				name: "Mount Doom Roast Special with Side of Precious Onion Rings.",
				description: "Smeagol's favorite.",
				price: 15.75
			},
			8: { //Thanks Shar[TA]
				name: "Morgoth's Scorched Burgers with Chips",
				description: "Blackened beyond recognition.",
				price: 13.33

			},
			9: {
				name: "Slab of Lurtz Meat with Greens.",
				description: "Get it while supplies last.",
				price: 17.50
			},
			10: {
				name: "Rangers Field Feast.",
				description: "Is it chicken? Is it rabbit? Or...",
				price: 5.99
			}
		},
		"Drinks": {
			11: {
				name: "Orc's Blood Mead",
				description: "It's actually raspberries - Orc's blood would be gross.",
				price: 5.99
			},
			12: {
				name: "Gondorian Grenache",
				description: "A fine rose wine.",
				price: 7.99
			},
			13: {
				name: "Mordor Mourvedre",
				description: "A less-fine rose wine.",
				price: 5.99
			}
		}
	}
};

let legolas = {
	name: "Lembas by Legolas",
	min_order: 15,
	delivery_charge: 3.99,
	menu: {
		"Lembas": {
			0: {
				name: "Single",
				description: "One piece of lembas.",
				price: 3
			},
			1: {
				name: "Double",
				description: "Two pieces of lembas.",
				price: 5.50
			},
			2: {
				name: "Triple",
				description: "Three pieces, which should be more than enough.",
				price: 8.00
			}
		},
		"Combos": {
			3: {
				name: "Second Breakfast",
				description: "Two pieces of lembas with honey.",
				price: 7.50
			},
			4: {
				name: "There and Back Again",
				description: "All you need for a long journey - 6 pieces of lembas, salted pork, and a flagon of wine.",
				price: 25.99
			},
			5: {
				name: "Best Friends Forever",
				description: "Lembas and a heavy stout.",
				price: 6.60
			}
		}
	}
};

let frodo = {
	name: "Frodo's Flapjacks",
	min_order: 35,
	delivery_charge: 6,
	menu: {
		"Breakfast": {
			0: {
				name: "Hobbit Hash",
				description: "Five flapjacks, potatoes, leeks, garlic, cheese.",
				price: 9.00
			},
			1: {
				name: "The Full Flapjack Breakfast",
				description: "Eight flapjacks, two sausages, 3 eggs, 4 slices of bacon, beans, and a coffee.",
				price: 14.00
			},
			2: {
				name: "Southfarthing Slammer",
				description: "15 flapjacks and 2 pints of syrup.",
				price: 12.00
			}

		},
		"Second Breakfast": {
			3: {
				name: "Beorning Breakfast",
				description: "6 flapjacks smothers in honey.",
				price: 7.50
			},
			4: {
				name: "Shire Strawberry Special",
				description: "6 flapjacks and a hearty serving of strawberry jam.",
				price: 8
			},
			5: {
				name: "Buckland Blackberry Breakfast",
				description: "6 flapjacks covered in fresh blackberries. Served with a large side of sausage.",
				price: 14.99
			}
		},
		"Elevenses": {
			6: {
				name: "Lembas",
				description: "Three pieces of traditional Elvish Waybread",
				price: 7.70
			},
			7: {
				name: "Muffins of the Marish",
				description: "A variety of 8 different types of muffins, served with tea.",
				price: 9.00
			},
			8: {
				name: "Hasty Hobbit Hash",
				description: "Potatoes with onions and cheese. Served with coffee.",
				price: 5.00
			}
		},
		"Luncheon": {
			9: {
				name: "Shepherd's Pie",
				description: "A classic. Includes 3 pies.",
				price: 15.99
			},
			10: {
				name: "Roast Pork",
				description: "An entire pig slow-roasted over a fire.",
				price: 27.99
			},
			11: {
				name: "Fish and Chips",
				description: "Fish - fried. Chips - nice and crispy.",
				price: 5.99
			}
		},
		"Afternoon Tea": {
			12: {
				name: "Tea",
				description: "Served with sugar and cream.",
				price: 3
			},
			13: {
				name: "Coffee",
				description: "Served with sugar and cream.",
				price: 3.50
			},
			14: {
				name: "Cookies and Cream",
				description: "A dozen cookies served with a vat of cream.",
				price: 15.99
			},
			15: {
				name: "MioptionSelecteded Berry Pie",
				description: "Fresh baked daily.",
				price: 7.00
			}
		},
		"Dinner": {
			16: {
				name: "Po-ta-to Platter",
				description: "Boiled. Mashed. Stuck in a stew.",
				price: 6
			},
			17: {
				name: "Bree and Apple",
				description: "One wheel of brie with slices of apple.",
				price: 7.99
			},
			18: {
				name: "Maggot's Mushroom Mashup",
				description: "It sounds disgusting, but its pretty good",
				price: 6.50
			},
			19: {
				name: "Fresh Baked Bread",
				description: "A whole loaf of the finest bread the Shire has to offer.",
				price: 6
			},
			20: {
				name: "Pint of Ale",
				description: "Yes, it comes in pints.",
				price: 5
			}
		},
		"Supper": {
			21: {
				name: "Sausage Sandwich",
				description: "SioptionSelected whole sausages served on a loaf of bread. Covered in onions, mushrooms and gravy.",
				price: 15.99
			},
			22: {
				name: "Shire Supper",
				description: "End the day as you started it, with a dozen flapjacks, 5 eggs, 3 sausages, 7 pieces of bacon, and a pint of ale.",
				price: 37.99
			}
		}
	}
};

let restaurants = [aragorn, legolas, frodo];

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
		createRandomImage();
		clearAll();

	}
	else{
		destroyImage();

	//creates qucklink header
		let quicklinkheading = document.createElement("h3");
		quicklinkheading.innerHTML = "Categories:";
		document.getElementById("quickmenu").appendChild(quicklinkheading);

		thisRestaurantsMenu = restaurants[restaurantsIndex].menu;
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



					document.getElementById('delfee').innerHTML = "Delivery charge: $"+restaurants[restaurantsIndex].delivery_charge;


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
					document.getElementById('finaltotal').innerHTML = "Your total is: $"+((total*1.1)+restaurants[restaurantsIndex].delivery_charge).toFixed(2);
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
							alert("Your order has been successfully submitted!");
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
		for (var i = 0; i < restaurants.length; i++) {
			//checks which restaurant was selected
			if (optionSelected===restaurants[i].name) {
				restaurantsIndex = i;
				document.getElementById("name").innerHTML = "Welcome to: " + restaurants[i].name +"!";
				//creates min price needed for order
				let min = document.getElementById("min");
				min.innerHTML = "Your order must be atleast: $" + restaurants[i].min_order;
				amountNeeded = restaurants[i].min_order;
				//creates delivery fee
				let fee = document.getElementById("fee");
				fee.innerHTML = "Our delivery fee is: $" + restaurants[i].delivery_charge;

			}
		}
}

function createDropDownList(){
	let mySelect = document.getElementById("mySelect");


//creates the options in the drop down menu
	for (let i = 0; i < restaurants.length; i++) {
		let anOption = document.createElement("option");
		//sets the label of the created option to the restaurants name
		anOption.setAttribute("label", restaurants[i].name);

		//sets the value of the created option to the restaurants name
		anOption.setAttribute("value", restaurants[i].name);

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
		generateMenuAndQuicklinks();
	}



}


//when body is loaded this function (main) activates
function main(){
	createDropDownList();
	createRandomImage();


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
	document.getElementById('finaltotal').innerHTML = "Your total is: $"+((total*1.1)+restaurants[restaurantsIndex].delivery_charge).toFixed(2);

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

let arrayForImages = ["food1.jpeg", "food2.jpg", "food3.jpg", "food4.jpg", "food5.png",
 "food6.jpg", "food7.jpg", "food8.png", "food9.jpg", "food10.jpg", "food11.jpg", "food12.jpg", "food13.jpg", "food14.jpg"];
function createRandomImage(){


	let meme = document.createElement("img");
	meme.setAttribute("id", "randomMeme");
	meme.className = "memestyle";
	var size = arrayForImages.length;
	var x = Math.floor(size*Math.random());
	meme.src=arrayForImages[x];
	document.getElementById('mainpage').appendChild(meme);



}

function destroyImage(){
	if(document.getElementById("randomMeme")!=null)
	{
	    // do something, it exists
		document.getElementById("randomMeme").remove();

	}
}

//config file
const config = require("./config.json");

const express = require('express');
const path = require('path');
const fs = require("fs");
let router = express.Router();

//when all restaurants page is requested
router.get("/", respondRestaurants);

//when a specific restaurant is requested
router.get("/:restID", getRestaurant, sendSingleRestaurant);

//when a restaurant is created and submitted by client (from add restaurants page)
router.post("/", receiveNewRestaurant);

//when the save button is clicked on a restaurants page
router.put("/:restID", saveUpdatedRestaurant);


//--------------------------------------------------------------------------------------


//Sends an array of restaurants or ids in response to a request
//Sends either JSON or HTML
function respondRestaurants(req, res, next){

	//sends this if requesting json data
	let idObject = {restaurants: []};
	//sends this if requesting html data
	let idAndNameArray = [];

	for (let i = 0; i < config.restaurants.length; i++) {

		//creates an object with only name and id of restaurant
		let clickedrest = {}
		clickedrest.id = config.restaurants[i].id;
		clickedrest.name = config.restaurants[i].name;
		//appends this object to idAndNameArray
		idAndNameArray.push(clickedrest);

		//appends id to idArray
		idObject.restaurants.push(config.restaurants[i].id);
	}
	res.format({
		"application/json": () => {res.status(200).json(idObject)},
		"text/html": () => {res.render("pages/restaurants", {restaurants: idAndNameArray})}
	});
	next();
}

//Retrieves requested restaurant..
function getRestaurant(req, res, next){

	//uses the url to get the id of thr restaurant
	let id = req.params.restID;
	let found = false;
	for (let restaurant in config.restaurants) {
		if (config.restaurants[restaurant].id == id) {
			res.restaurant = config.restaurants[restaurant];
			found = true;
			next();
		}
	}
	if (found == false) {
		res.status(404).send("Could not find restaurant.");
	}
}

//Create and send representation of a requested restaurant
//Sends either JSON or HTML
function sendSingleRestaurant(req, res, next){
	res.format({
		"application/json": () => { res.status(200).json(res.restaurant); },
		"text/html": () => { res.render("pages/restaurant", {restaurant: res.restaurant}); }
	});
	next();
}

//receives submitted restaurant, gives it a unique id, empty menu object and appends it
function receiveNewRestaurant(req, res, next){

	req.body.id = config.maxID;
	config.maxID++
	req.body.menu = {};

	config.restaurants.push(req.body);
	console.log(config.restaurants);

	//sends back JSON representation of created restaurant to client
	res.status(200).send(req.body);
	res.end();
}


//gets updated restaurants data and saves to RAM (config file)
function saveUpdatedRestaurant(req, res, next){
	let id = req.body.id;

	let found = false;
	for (let restaurant in config.restaurants) {
		if (config.restaurants[restaurant].id === id) {
			found = true;
			config.restaurants[restaurant] = req.body;
		}
	}
	if (found === false){
		res.status(400).send("Could not find restaurant.");
	}
	else {
		res.status(200).send("Update was successful!")
	}
}


//Export router so it can be mounted in the main server
module.exports = router;

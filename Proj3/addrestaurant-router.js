//config file
const config = require("./config.json");

const express = require('express');
const path = require('path');
const fs = require("fs");
let router = express.Router();

//when the add restaurants page is requested
router.get("/", loadAddPage);

function loadAddPage(req, res, next){

  let namesObject = [];

  for (let restaurant in config.restaurants) {
    namesObject.push(config.restaurants[restaurant].name)
  }

	res.format({
		"application/json": () => { res.status(200).json(namesObject); },
		"text/html": () => { res.render("pages/addrestaurant"); }
	});
	next();
}
//--------------------------------------------------------------------------------------

//Export router so it can be mounted in the main server
module.exports = router;

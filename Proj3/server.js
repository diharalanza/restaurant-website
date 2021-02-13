const express = require('express');
const fs = require('fs');
var bodyParser = require('body-parser')
const app = express();

//config file
const config = require("./config.json");

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.set("view engine", "ejs");


//load data from restaurants directory and adds it to config file on server load
const folder = './restaurants/';
fs.readdirSync(folder).forEach(file => {
	let fileContent = require(folder+file);
	config.restaurants.push(fileContent);
});
console.log(config.restaurants);


//sends client.js when requested
function serveScript(req, res, next){
res.writeHead(200, { 'content-type': 'application/javascript' });
fs.createReadStream("./views/pages/client.js").pipe(res);
}
app.use('/client.js', serveScript);
app.use('/restaurants/client.js', serveScript);


//requiring routers...
let restaurantsRouter = require("./restaurants-router");
app.use("/restaurants", restaurantsRouter);

let addrestaurantRouter = require("./addrestaurant-router");
app.use("/addrestaurant", addrestaurantRouter);


//Respond with home page data if requested
app.get("/", (req, res, next)=> { res.render("pages/home"); });


app.listen(3000);
console.log("Server listening at http://localhost:3000");

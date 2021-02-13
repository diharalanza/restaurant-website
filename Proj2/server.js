const http = require('http');
const fs = require("fs");
const path = require("path")
const pug = require("pug")

//all data from restaurants directory
let allRestaurants = [];

//names of all restaurants
let restaurantNames = [];

//all orders submitted in an array
let allOrders = [];

//all stats of the restaurants
let stats = [];

//will be printing to console all restaurant data
console.log("\nLoading all restaurant data... \n");


const testFolder = './restaurants/';




  //go into restaurants directory
  fs.readdirSync(testFolder).forEach(file => {

    //reads each files data
      let content = require(testFolder+file);

      //creates an object for for each restaurant to hold its stats
      let thisRestaurantsStats = {};

      thisRestaurantsStats.name = content.name;
      thisRestaurantsStats.quantity = 0;
      thisRestaurantsStats.average = 0;
      thisRestaurantsStats.orders = [];
      thisRestaurantsStats.popular = "";
      thisRestaurantsStats.total = 0;

      //adds IDs corresponding to arrays index
      for (let category in content.menu){
        for (let number in content.menu[category]) {
          (thisRestaurantsStats.orders).push(0);
        }
      }

      //appends this object to stats array
      stats.push(thisRestaurantsStats);

      //appends the entire restaurant data to allRestaurants array
      allRestaurants.push(content);
      console.log(JSON.stringify(content) + "\n");

      //appends name of this restaurant to the folder
      restaurantNames.push(content.name);


  });



//renders the pages
const renderHome = pug.compileFile('views/pages/home.pug');
const renderOrder = pug.compileFile('./order.html');
const renderStats = pug.compileFile('views/pages/stats.pug');



//Helper function to send a 404 error
function send404(response){
	response.statusCode = 404;
	response.write("Unknown resource.");
	response.end();
}

//Helper function to send a 500 error
function send500(response){
	response.statusCode = 500;
	response.write("Server error.");
 	response.end();
}



  const server = http.createServer(function (request, response){
    if(request.method === "GET"){
      //home page
      if(request.url === "/"){
        let homepage = renderHome({});
  			response.statusCode = 200;
  			response.end(homepage);
  			return;
      }
      //order page
      else if(request.url === "/order"){
        let orderpage = renderOrder({});
  			response.statusCode = 200;
  			response.end(orderpage);
  			return;
      }
      //sending namesofrestaurants to client to populate dd menu
      else if(request.url === "/order/data"){
  			response.statusCode = 200;
        let toSend = JSON.stringify(restaurantNames);
        response.end(toSend);
  			return;
      }
      //providing client file
      else if(request.url === "/client.js"){
  			fs.readFile("./client.js", function(err, data){
  				if(err){
  					send500(response);
  					return;
  				}
  				response.statusCode = 200;
  				response.end(data);
  				return;
  			});
  		}
      //providing css file
      else if(request.url === "/style.css"){
  			fs.readFile("./style.css", function(err, data){
  				if(err){
  					send500(response);
  					return;
  				}
  				response.statusCode = 200;
  				response.end(data);
  				return;
  			});
  		}
      //providing bg image
      else if(request.url === "/imageedit_1_5392000824.jpg"){
  			fs.readFile("./imageedit_1_5392000824.jpg", function(err, data){
  				if(err){
  					send500(response);
  					return;
  				}
  				response.statusCode = 200;
  				response.end(data);
  				return;
  			});
  		}
      //providing remove button
      else if(request.url === "/7c3767832030ff45691bcfb9da0cc712.png"){
  			fs.readFile("./7c3767832030ff45691bcfb9da0cc712.png", function(err, data){
  				if(err){
  					send500(response);
  					return;
  				}
  				response.statusCode = 200;
  				response.end(data);
  				return;
  			});
  		}
      //providing add button
      else if(request.url === "/round-add-button.png"){
  			fs.readFile("./round-add-button.png", function(err, data){
  				if(err){
  					send500(response);
  					return;
  				}
  				response.statusCode = 200;
  				response.end(data);
  				return;
  			});
  		}
      //stats page
      else if(request.url === "/stats"){
        let statspage = renderStats({stats});
  			response.statusCode = 200;
  			response.end(statspage);
  			return;
      }
      else{
  			send404(response);
  		}
    }
    else if(request.method === "POST"){

    //when submit button is clicked
    if(request.url === "/order/selected/submitted"){


      let body = ""
        request.on('data', (chunk) => {
          body += chunk;
        })
        request.on('end', () => {
          //receives the order in an array
          let theOrder = JSON.parse(body);

          //prints to console the order just received
          console.log("new order! :" + JSON.stringify(theOrder) + "\n");

          //adds this order to all the orders
          allOrders.push(theOrder);

        //updates the stats for each restaurant with this new submitted order included


        for (let i = 0; i < stats.length; i++) {
          if(theOrder.name === stats[i].name){

            stats[i].quantity = stats[i].quantity + 1;
            stats[i].total = (parseFloat(stats[i].total) + parseFloat(theOrder.total)).toFixed(2);
            stats[i].average = (parseFloat(stats[i].total/stats[i].quantity)).toFixed(2);

            //updates the number of total orders for each food item
            for (let j = 0; j < (stats[i].orders).length; j++) {
              stats[i].orders[j] = stats[i].orders[j] + theOrder.orders[j];
            }

            //gets food ID of most popular food item
            let popularID = (stats[i].orders).reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);


            //this is to get the name of that food ID (which is popular)
            for (let category in allRestaurants[i].menu){
              for(let number in allRestaurants[i].menu[category]){
                if (parseInt(number) === parseInt(popularID)) {
                  stats[i].popular = allRestaurants[i].menu[category][number].name;
                }
              }
            }

          }

        }

          //prints to console all orders once updated with new submitted order
          console.log("stats as of now: \n"+JSON.stringify(stats)+"\n");
            console.log("-----------------------------------------------------------------------------------------\n");

          response.end();
          return;

      })

  }
  //when a restaurant is clicked from dd menu
  else if(request.url === "/order/selected"){

    let body = ""
      request.on('data', (chunk) => {
        body += chunk;
      })
      request.on('end', () => {
        //receives selected restaurants index
        let index = JSON.parse(body);

        //sends the restaurants data at the index which was sent from client
        let toSend = allRestaurants[index];
        toSend = JSON.stringify(toSend);


        response.end(toSend);
        return;

    })

}


    else{
      send404(response);
    }
  }
});


  server.listen(3000);
  console.log('server running at http://127.0.0.1:3000/ \n');
  console.log("-----------------------------------------------------------------------------------------\n");

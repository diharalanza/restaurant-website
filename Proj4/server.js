//INIT-SERVER:------------------------------------------------------------------

const express = require('express');
const app = express();
const fs = require('fs');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const mongoose = require("mongoose");
const ObjectId= require('mongoose').Types.ObjectId
const User = require("./UserModel");
const Purchase = require("./PurchaseModel");
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/tokens',
  collection: 'sessions'
});
app.use(session({ secret: 'some secret here', store: store }))
app.set("view engine", "ejs");

function serveScript(req, res, next){
res.writeHead(200, { 'content-type': 'application/javascript' });
fs.createReadStream("./views/pages/client.js").pipe(res);
}
app.use('/client.js', serveScript);
app.use('/pages/client.js', serveScript);
app.use('/users/client.js', serveScript);


function serveOrderform(req, res, next){
res.writeHead(200, { 'content-type': 'application/javascript' });
fs.createReadStream("./views/pages/orderform.js").pipe(res);
}
app.use('/orderform.js', serveOrderform);
app.use('/pages/orderform.js', serveOrderform);

function serveAddButton(req, res, next){
fs.createReadStream("./views/pages/add.jpg").pipe(res);
}
app.use('/add.jpg', serveAddButton);

function serveRemoveButton(req, res, next){
fs.createReadStream("./views/pages/remove.jpg").pipe(res);
}
app.use('/remove.jpg', serveRemoveButton);


//HOMEPAGE:---------------------------------------------------------------------
app.get("/", (req, res, next)=> { res.render("pages/home"); });

//LOGIN/LOGOUT/REGISTER:--------------------------------------------------------

//login page
let loginError = 0; //no errors
app.get("/login", (req, res, next)=> {
  res.render("pages/login", {loginError: loginError});
  loginError = 0;
});

//once login button is clicked
app.post("/login", function(req, res, next){
	let username = req.body.username;
	let password = req.body.password;
	User.findOne().where("username").equals(username).exec(function(err,result){
		if(err)throw err;
    if(result){
      if(req.session.loggedin){
        loginError = 1; //already logged in
        res.status(200);
        res.redirect("/login");
    		return;
    	}
			if(result.password === password){
				req.session.loggedin = true;
				req.session.username = username;
        res.status(200);
        res.redirect("/users/"+result._id);
			}else{
          loginError = 2; //wrong password
					res.status(401);
          res.redirect("/login");
			}
		}else{
      loginError = 3; //no user found
			res.status(404);
      res.redirect("/login");
		}
	});
});

//updates page with this user info
app.get("/login/auth", function(req, res, next){
  if(req.session.loggedin) {
    User.findOne().where("username").equals(req.session.username).exec(function(err,result){
      if(err) throw err;
      res.status(200).json(result);
    });
  }
  else{
    res.status(401).send();
  }
});

//resets page to original state
app.get("/logout", function(req, res, next){
	req.session.loggedin = false;
  res.status(401);
	res.redirect("/");
})
let regError;
app.get("/register", (req, res, next)=> {
  res.render("pages/register", {regError: regError} );
  regError = false;
 });
app.post("/register", function(req, res, next){
  let u = new User();
  u.username = req.body.username;
	u.password = req.body.password;
	u.privacy = false;
  u.save(function(err, result){
		if(err){
      regError = true;
      res.redirect("/register");
      return;
		}
    if(result){
      req.session.loggedin = true;
      req.session.username = req.body.username;
      res.status(200).send();
      res.redirect("/users/" + u._id);
    }
	})
})

//USER-ROUTER:------------------------------------------------------------------

app.get("/users", queryParser, loadUsers, respondUsers);

//Parse the query parameters
//limit: integer specifying maximum number of results to send back
//page: the page of results to send back (start is (page-1)*limit)
//name: string to find in user names to be considered a match
function queryParser(req, res, next){
	const MAX_USERS = 50;

	//build a query string to use for pagination later
	let params = [];
	for(prop in req.query){
		if(prop == "page"){
			continue;
		}
		params.push(prop + "=" + req.query[prop]);
	}
	req.qstring = params.join("&");

	if(!req.query.name){
		req.query.name = "?";
	}

	next();
}

//Loads the correct set of users based on the query parameters
//Adds a users property to the response object
//This property is used later to send the response
function loadUsers(req, res, next){

	User.find()
	.where("username").regex(new RegExp(".*" + req.query.name + ".*", "i"))
	.exec(function(err, results){
		if(err){
			res.status(500).send("Error reading users.");
			console.log(err);
			return;
		}
		res.users = results;
		next();
	});
}

//Users the res.users property to send a response
//Sends either HTML or JSON, depending on Accepts header
function respondUsers(req, res, next){
	res.format({
		"text/html": () => {res.render("pages/users", {users: res.users} )},
		"application/json": () => {res.status(200).json(res.users)}
	});
	next();
}

app.get("/users/:uid", sendSingleUser);

//Load a user based on uid parameter
app.param("uid", function(req, res, next, value){
	let oid;
	console.log("Finding user by ID: " + value);
	try{
		oid = new ObjectId(value);
	}catch(err){
		res.status(404).send("User ID " + value + " does not exist.");
		return;
	}

	User.findById(value, function(err, result){
		if(err){
			console.log(err);
			res.status(500).send("Error reading user.");
			return;
		}

		if(!result){
			res.status(404).send("User ID " + value + " does not exist.");
			return;
		}

		req.user = result;


    Purchase.find()
    .where("buyer").equals(ObjectId(result._id))
    .exec(function(err, results){
      if(err){
        res.status(500).send("Error reading purchases.");
        console.log(err);
        return;
      }

      req.user.purchases = results;
      next();
		})

		if(req.session.loggedin && req.session.username === req.user.username){
			req.user.ownprofile = true;
		}
    else{	req.user.ownprofile = false;
    }
	});
});

//Send the representation of a single user that is a property of the request object
//Sends either JSON or HTML, depending on Accepts header
function sendSingleUser(req, res, next){
  if (req.user.ownprofile == false && req.user.privacy == true){
    res.status(404).send();
    return;
  }
	res.format({
		"application/json": function(){
			res.status(200).json(req.user);
		},
		"text/html": () => { res.render("pages/user", {user: req.user}); }
	});

	next();
}

app.post("/users/:uid", function(req, res, next){
  if (req.user.ownprofile == false){
    res.status(404).send();
    return;
  }
  console.log(req.session);
  User.findOne().where("username").equals(req.user.username).exec(function(err,result){
		if(err)throw err;
    if(result){
      if (result.privacy == false) {
        result.privacy = true;
        res.status(200);
        res.send("on");
      }
      else{
        result.privacy = false;
        res.status(200);
        res.send("off");
      }
      result.save();
    }
  });

});


//ORDER-FORM ROUTER:------------------------------------------------------------
app.get("/orders", (req, res, next)=> {
  if(req.session.loggedin){
    res.render("pages/orderform");
  }
  else{
    loginError = 4;
    res.redirect("/login");
  }
});

app.post("/orders", (req, res, next)=> {
  let p = new Purchase();
  p.info = req.body;
  User.findOne().where("username").equals(req.session.username).exec(function(err,result){
    if(err) throw err;
    if (result) {
      console.log(result._id);
      p.buyer = ObjectId(result._id);
      p.save(function(err, result){
    		if(err){throw err}
    		res.status(200).send();
    	})
    }
  });
});

app.get("/orders/:oid", sendSingleOrder);

//Load a user based on uid parameter
app.param("oid", function(req, res, next, value){
	let oid;
	console.log("Finding user by ID: " + value);
	try{
		oid = new ObjectId(value);
	}catch(err){
		res.status(404).send("Purchase ID " + value + " does not exist.");
		return;
	}

	Purchase.findById(value, function(err, result){
		if(err){
			console.log(err);
			res.status(500).send("Error reading purchase.");
			return;
		}

		if(!result){
			res.status(404).send("Purchase ID " + value + " does not exist.");
			return;
		}
		req.purchase = result;

    User.findById(result.buyer, function(err, result1){
      if(err){
  			console.log(err);
  			res.status(500).send("Error reading user.");
  			return;
  		}
  		if(!result1){
  			res.status(404).send("User ID " + result.buyer + " does not exist.");
  			return;
  		}
      setTimeout(function(){
        console.log("This Order was bought by: " + result1);
      }, 2000);
      req.purchase.user = result1;
      next();
		})
	});
});

//Send the representation of a single user that is a property of the request object
//Sends either JSON or HTML, depending on Accepts header

//Send the representation of a single user that is a property of the request object
//Sends either JSON or HTML, depending on Accepts header
function sendSingleOrder(req, res, next){

  console.log(req.session.username);
  console.log(req.purchase.user.username);
  if(req.purchase.user.privacy == true){
    if(!(req.session.loggedin && req.session.username === req.purchase.user.username)){
      res.status(404).send();
      return;
    }
  }
	res.format({
		"application/json": function(){
			res.status(200).json(req.purchase);
		},
		"text/html": () => { res.render("pages/purchase", {purchase: req.purchase}); }
	});

	next();
}

//INIT-DATABASE:----------------------------------------------------------------

mongoose.connect('mongodb://localhost/a4', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	app.listen(3000);
	console.log("Server listening on port 3000");

});

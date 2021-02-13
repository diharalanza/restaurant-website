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
const Card = require("./CardModel");
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


//HOMEPAGE(login/register):---------------------------------------------------------------------

let error = 0; //no login/register errors
app.get("/", (req, res, next)=> {
  res.render("pages/home", {error: error});
  error = 0;
});

app.post("/login", function(req, res, next){
  let username = req.body.username;
  let password = req.body.password;
  User.findOne().where("username").equals(username).exec(function(err,result){
  if(err)throw err;
  if(result){
    if(req.session.loggedin){
      error = 1; //already logged in
      res.status(200);
      res.redirect("/");
      return;
    }
    if(result.password === password){
      req.session.loggedin = true;
      req.session.username = username;
      res.status(200);
      res.redirect("/users/"+result._id);
    }else{
        error = 2; //wrong password
        res.status(401);
        res.redirect("/");
    }
  }else{
    error = 3; //no user found
    res.status(404);
    res.redirect("/");
  }
});
});

app.post("/register", function(req, res, next){
  let u = new User();
  u.username = req.body.username;
	u.password = req.body.password;
  u.friends = [];
  u.cards = [];

  Card.count().exec(function (err, count) {

  for (let i = 0; i<10; i++){
    var random = Math.floor(Math.random() * count)

    Card.findOne().skip(random).exec(
      function (err, result) {
        u.cards.push(ObjectId(result._id));
      })
    }

  })
 setTimeout(function () {
  u.save(function(err, result){
		if(err){
      error = 4; //username already taken
      res.redirect("/");
      return;
		}
    if(result){
      req.session.loggedin = true;
      req.session.username = req.body.username;
      res.status(200).send();
      res.redirect("/users/" + u._id);
    }
	})
}, 100);
})

//logs user out
app.get("/logout", function(req, res, next){
	req.session.loggedin = false;
  res.status(401);
	res.redirect("/");
})

//USER-ROUTER:----------------------------------------------------------------

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
    req.user.cardNames = []
    //console.log(result);


    req.user.cards.forEach(card =>{
      Card.findById(ObjectId(card), function(err, result){
        if (err)throw err;
        req.user.cardNames.push(result);
      })
    });
    next();



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
  setTimeout(function () {

  console.log("final sent: "+req.user);

	res.format({
		"application/json": function(){
			res.status(200).json(req.user);
		},
		"text/html": () => { res.render("pages/user", {user: req.user}); }
	});

	next();
}, 100);
}


app.post("/search", function(req, res, next){

  let toSearch = req.body.search;
  let toSend;

  User.findOne().where("username").equals(toSearch).exec(function(err,result){
    if(err)throw err;
    else if(!result){
      toSend = "user does not exist";
    }
    else if(result.friends.indexOf(req.session.username) != -1){
      toSend = "dont worry, you guys are already friends";
    }
    else if(result.username == req.session.username){
      toSend = "you are searching for yourself, though very deep and thought provoking, you can't send yourself a friend request";
    }
    else{
      console.log(result.username);
      toSend = result.username;
    }
  })
  res.status(200);
  setTimeout(function () {
    res.send(toSend);
  }, 50);


})

app.post("/sendrequest", function(req, res, next){
  console.log(req.body.sendReqTo);
  User.findOne().where("username").equals(req.body.sendReqTo).exec(function(err,result){
    if(err)throw err;
    if(result){
      if(result.friendRequests.indexOf(req.session.username) == -1 && result.friends.indexOf(req.session.username) == -1){
        result.friendRequests.push(req.session.username);
        result.save(function(err, result){
      		if(err){throw err}
          console.log(result);
      	})
      }
    }
    res.status(200).send("okay");

  })

})

app.get("/refresh", function(req, res, next){
  let toSend = {friendRequests : "", friends : ""};

  User.findOne().where("username").equals(req.session.username).exec(function(err,result){
    if(err)throw err;
    if(result){
      toSend.friendRequests = result.friendRequests;
      toSend.friends = result.friends;
      console.log(toSend);
    }
  })

setTimeout(function () {
  res.status(200);
  res.send(toSend);
}, 50);

})

app.post("/accepted", function(req, res, next){

  let acceptedUser = req.body.accepted;

  User.findOne().where("username").equals(req.session.username).exec(function(err,result){
    if(err)throw err;
    if(result){
      result.friends.push(acceptedUser);
      for (let friend in result.friendRequests){
        if (result.friendRequests[friend] == acceptedUser) {
          result.friendRequests.splice(friend, 1);
        }
      }
      result.save(function(err, result){
    		if(err){throw err}
    	})
    }
  })

  User.findOne().where("username").equals(acceptedUser).exec(function(err,result){
    if(err)throw err;
    if(result){
      console.log("the other guy: "+result);
      result.friends.push(req.session.username);
      result.save(function(err, result){
    		if(err){throw err}
    		res.status(200).send("saved");
    	})
    }
  })
})


app.post("/rejected", function(req, res, next){

  let rejectedUser = req.body.rejected;

  User.findOne().where("username").equals(req.session.username).exec(function(err,result){
    if(err)throw err;
    if(result){
      for (let friend in result.friendRequests){
        if (result.friendRequests[friend] == rejectedUser) {
          result.friendRequests.splice(friend, 1);
        }
      }
      result.save(function(err, result){
    		if(err){throw err}
    		res.status(200).send("saved");
    	})
    }
  })


})


//INIT-DATABASE:----------------------------------------------------------------

mongoose.connect('mongodb://localhost/a5', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	app.listen(3000);
	console.log("Server listening on port 3000");

});

let foundUser;
let acceptUser;
let rejectUser;

function search(){

  document.getElementById("result").innerHTML = "";

  let toSend = {search : ""};
  toSend.search = document.getElementById("searchUser").value;


  req = new XMLHttpRequest();
  	req.onreadystatechange = function() {

  		if(this.readyState==4 && this.status==200){

        let resultName = document.createElement("p");

  			if (this.responseText == "user does not exist") {
          resultName.innerHTML = this.responseText;
          document.getElementById('result').appendChild(resultName);

        }
        else if (this.responseText == "dont worry, you guys are already friends") {
          resultName.innerHTML = this.responseText;
          document.getElementById('result').appendChild(resultName);
        }
        else if (this.responseText == "you are searching for yourself, though very deep and thought provoking, you can't send yourself a friend request") {
          resultName.innerHTML = this.responseText;
          document.getElementById('result').appendChild(resultName);
        }
        else{
          resultName.innerHTML = this.responseText;
          foundUser = this.responseText;
          document.getElementById('result').appendChild(resultName);


          let addFriendButton = document.createElement("button");
          addFriendButton.innerHTML = "send Friend Request";
          addFriendButton.setAttribute("id", "addFriendButton");
          addFriendButton.onclick = sendFriendRequest;
          document.getElementById('result').appendChild(addFriendButton);

        }

  		}

  	}

  	req.open("POST", "http://localhost:3000/search");
    req.setRequestHeader("content-type", 'application/json');
  	req.send(JSON.stringify(toSend));
}


function sendFriendRequest(){


  let toSend = {sendReqTo: foundUser};

  req = new XMLHttpRequest();
  	req.onreadystatechange = function() {

  		if(this.readyState==4 && this.status==200){

        console.log(this.responseText);

  		}

  	}

  	req.open("POST", "http://localhost:3000/sendrequest");
    req.setRequestHeader("content-type", 'application/json');
  	req.send(JSON.stringify(toSend));
}

//every 5 seconds
setInterval(function() {
  console.log("hmmm refreshing...");

  function refresh(){
    document.getElementById("friendsdiv").innerHTML = "";
    document.getElementById("friendrequestsdiv").innerHTML = "";

    req = new XMLHttpRequest();
      req.onreadystatechange = function() {

        if(this.readyState==4 && this.status==200){
          let data = JSON.parse(this.responseText);

          console.log(data.friendRequests[0]);


          for(let request in data.friendRequests){
            let aRequest = document.createElement("p");
            aRequest.innerHTML = data.friendRequests[request];
            document.getElementById('friendrequestsdiv').appendChild(aRequest);

            let acceptRequest = document.createElement("button");
            acceptRequest.innerHTML = "accept";
            acceptRequest.onclick = function(){
              acceptUser = data.friendRequests[request];
              acceptFriendRequest()
            };
            document.getElementById('friendrequestsdiv').appendChild(acceptRequest);

            let rejectRequest = document.createElement("button");
            rejectRequest.innerHTML = "reject";
            rejectRequest.onclick = function(){
              rejectUser = data.friendRequests[request];
              rejectFriendRequest()
            };
            document.getElementById('friendrequestsdiv').appendChild(rejectRequest);

          }

            for(let friend in data.friends){
              let aFriend = document.createElement("p");
              aFriend.innerHTML = data.friends[friend];
              document.getElementById('friendsdiv').appendChild(aFriend);
            }

        }

      }

      req.open("GET", "http://localhost:3000/refresh");
      req.setRequestHeader("accept", 'application/json');
      req.send();
  }
  refresh();

}, 3000);


function acceptFriendRequest(){

  let toSend = {accepted: acceptUser};

  req = new XMLHttpRequest();
  	req.onreadystatechange = function() {

  		if(this.readyState==4 && this.status==200){

        console.log(this.responseText);

  		}

  	}

  	req.open("POST", "http://localhost:3000/accepted");
    req.setRequestHeader("content-type", 'application/json');
  	req.send(JSON.stringify(toSend));
}


function rejectFriendRequest(){

  let toSend = {rejected: rejectUser};

  req = new XMLHttpRequest();
  	req.onreadystatechange = function() {

  		if(this.readyState==4 && this.status==200){

        console.log(this.responseText);

  		}

  	}

  	req.open("POST", "http://localhost:3000/rejected");
    req.setRequestHeader("content-type", 'application/json');
  	req.send(JSON.stringify(toSend));
}

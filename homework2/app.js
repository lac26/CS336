/* Name: Lydia Cupery
* Date: October 29, 2016
* Assignment: Homework 2
*/

const express = require("express");
const app = express();
const http_status = require("http-status-codes");
const bodyParser = require("body-parser");

app.use(express.static("public2"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




/*Define the person object */
function Person(id, firstName, lastName, startDate){
	this.id = id;
	this.firstName = firstName;
	this.lastName = lastName;
	this.startDate = startDate;
}

/*Create three instances of people */
var person1 = new Person(1, "Mehmet", "Yassin", "1995/03/01");
var person2 = new Person (2, "Ahmet", "Ozturk", "2000/03/01");
var person3 = new Person (3, "Ayse", "Candemir", "2005/03/01");

/*Add the people to an array*/
var peopleArray = [person1, person2, person3];

/*Function to find a person by their id*/
function findById(id) {
  for (var i = 0; i < peopleArray.length; i++) {
    if (peopleArray[i].id == id) {
      return peopleArray[i];
    }
  }
  return null;
}

/* function to find index of a person */
function findIndexById(id) {
  for (var i = 0; i < peopleArray.length; i++) {
    if (peopleArray[i].id == id) {
      return id;
    }
  }
  return null;
}

/* function to calculate the seniority depending on the date person has started */
function getSen(dateString){
 var today = new Date();
 var startDate = new Date(dateString);
 var age = today.getFullYear() - startDate.getFullYear();
 var m = today.getMonth() - startDate.getMonth();
 if (m < 0 || (m === 0 && today.getDate() < startDate.getDate())) {
  age--;
}
return age;
}


app.use(express.static('public'));

/* gets a list of all people objects */
app.get('/people', function(req, res){
  res.json({peopleArray});
});

app.post('/people', function(req,res){
 peopleArray.push(new Person(req.body.id, req.body.fName, req.body.lName, req.body.start));
});


/*gets the full record for the person with the given ID */
app.get('/person/:id', function (req, res){
 res.json(findById(req.params.id));
});

/*delete method, tested with curl */
app.delete('/person/:id', function(req,res){
  myMessage = "";
  if(findById(req.params.id)==null){
    myMessage = "There is no such ID :(";
  }
  for(i=0; i<peopleArray.length; i++){
    if(peopleArray[i]!=null && req.params!=null){
      if (peopleArray[i].id == req.params.id){
        delete peopleArray[i];
        myMessage = "Deleted person with id " + req.params.id;
      }
    }
  }
  res.send(myMessage);
});


/*put method, tested with curl*/
app.put('/person/:id', function (req, res){
  myMessage = "";
  if(findById(req.params.id)==null){
    myMessage = "There is no such ID :(";
  }
  for(i=0; i<peopleArray.length; i++){
    if (peopleArray[i].id == req.params.id){
      peopleArray[i].firstName = req.body.fName;
      peopleArray[i].lastName = req.body.lName;
      peopleArray[i].startDate = req.body.startDate;
      console.log(peopleArray[i]);
      myMessage = "Updated person with id " + req.params.id;
    }
  }
  res.send(myMessage);
});

/* gets the full name (i.e., first & last) for the person with the given ID
*/
app.get('/person/:id/name', function(req,res){
  res.json(findById(req.params.id).firstName + " " + findById(req.params.id).lastName)
});	

/* gets the seniority (i.e., number of years with the organization) of the person with the given ID  */
app.get('/person/:id/years', function(req,res){
  res.json(getSen(findById(req.params.id).startDate));
});

app.get('/', function (req, res) {
  res.send('Enter people to see the whole array or person followed by the id (or by name or years) to get information about the people at my company!');
});	



app.post('/fetch', function (req, res) {
    // var myResponse = "";
    console.log("accessed get" + req.body.id);
    var myPerson = findById(req.body.id);
    var toReturn = "";
    if (myPerson){
      toReturn = '<br> first name: ' + myPerson.firstName
      + '<br> last name: ' + myPerson.lastName
      + '<br> id: ' + myPerson.id 
      + '<br> start date: ' + myPerson.startDate;
    }
    else{
      console.log("problem :(");
      toReturn = "The person is not in the database.  Are you sure they exist?";
    }
    //will only send response if person is in the database because findById throws an exception
    res.send({ 'content' : toReturn});

  }); 






/* listening on port 2000 */
app.listen(2000, function () {
  console.log('Example app listening on port 2000!');
});


//app.use(express.static('public'));
//app.use(express.static('index.html'))




//app.use('/static', express.static('files'));

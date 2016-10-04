/* Name: Lydia Cupery
* Date: October 4, 2016
* Assignment: Homework 4
*/

var express = require('express');
var app = express();

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
  throw "Could not find id " + id;
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


/*gets the full record for the person with the given ID */
app.get('/person/:id', function (req, res){
   res.json(findById(req.params.id));
});

/* gets the full name (i.e., first & last) for the person with the given ID
 */
app.get('/person/:id/name', function(req,res){
  res.json(findById(req.params.id).firstName + " " + findById(req.params.id).lastName)
});	

/* gets the seniority (i.e., number of years with the organization) of the person with the given ID  */
app.get('/person/:id/years', function(req,res){
  var start = findById(req.params.id).startDate;
  res.json(getSen(start));
});

app.get('/', function (req, res) {
  res.send('Enter people to see the whole array or person followed by the id (or by name or years) to get information about the people at my company!');
});	

/* listening on port 2000 */
app.listen(2000, function () {
  console.log('Example app listening on port 2000!');
});


//app.use(express.static('public'));
//app.use(express.static('index.html'))




//app.use('/static', express.static('files'));

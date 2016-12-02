/* Name: Lydia Cupery
* Date: November 12, 2016
* Assignment: Homework 3
*/

const express = require("express");
const app = express();
const http_status = require("http-status-codes");
const bodyParser = require("body-parser");
const MongoClient = require('mongodb').MongoClient

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var db;


MongoClient.connect('mongodb://cs336:bjarne@ds037597.mlab.com:37597/cs336', function (err, dbConnection) {
  if (err) throw err
    db = dbConnection;
})


app.use(express.static('public'));


/*gets the full record for the person with the given ID */
app.get('/person/:id', function (req, res){
  db.collection("people").find({id: req.params.id}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

/* gets a list of all people objects, updated to use the database */
app.get('/people', function(req, res){
      db.collection("people").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});

/*put method, tested with curl*/
app.put('/person/:id', function (req, res){
  myMessage = "";
  //find person with id req.params.id and update the person

  db.collection("people").update(
    {id : req.params.id}, 
    { $set: {firstName: req.body.fName, lastName: req.body.lName, "startDate" : req.body.startDate }}, 
    {multi:true}, 
    function (err, updated) {
      if (err) throw err;
      if (updated < 1) {
        myMessage = "no such person"
      }
  });
  res.send(myMessage);
});


/*updated delete method, tested with curl */
app.delete('/person/:id', function(req,res){
  myMessage = "";
  db.collections("people").remove({id: req.params.id}, function(err, numOfRemoves, status) {
        if (err) throw err;
        if (numOfRemoves < 1){
          myMessage = "no such record";
        }
        else {
          myMessage = "deleted id " + req.params.id ;
        }
    });
  res.send(myMessage);
});

/* updated to post the person to the mongoDB database */
app.post('/people', function(req,res){
  var newPerson = {
    id: req.body.id,
    firstName: req.body.fName,
    lastName: req.body.lName,
    startDate: req.body.start,
  }
  db.collection("people").insertOne(newPerson, function(err, result) {
        if (err) throw err;
        db.collection("people").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
 
});

/* updated fetch method to turn data in database into array and return */
app.post('/fetch', function (req, res) {
    //console.log("accessed get" + req.body.id);

    db.collection("people").find({id: req.body.id}).toArray(function(err, docs) {
        toReturn = '<br>first name: ' + docs[0].firstName
         + '<br> last name: ' + docs[0].lastName
      + '<br> id: ' + docs[0].id
      + '<br> start date: ' + docs[0].startDate;
       res.send({ 'content' : toReturn}); 

    });
  }); 


/* listening on port 2000 */
app.listen(2000, function () {
  console.log('Example app listening on port 2000!');
});

/* updated - gets the full name (i.e., first & last) for the person with the given ID 
*/
app.get('/person/:id/name', function(req,res){
  db.collection("people").find({id: req.params.id}, {firstName: 1, lastName: 1}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
}); 

/* updated gets the seniority (i.e., date joined) of the person with the given ID  */
app.get('/person/:id/years', function(req,res){
  db.collection("people").find({id: req.params.id}, {startDate: 1}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});


//app.use(express.static('public'));
//app.use(express.static('index.html'))




//app.use('/static', express.static('files'));

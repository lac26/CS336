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

/* gets a list of all people objects, updated to use the database */
app.get('/people', function(req, res){
      db.collection("people").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
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


/* listening on port 2000 */
app.listen(2000, function () {
  console.log('Example app listening on port 2000!');
});


//app.use(express.static('public'));
//app.use(express.static('index.html'))




//app.use('/static', express.static('files'));

/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const MongoClient = require('mongodb').MongoClient

var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 8080));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var db;


MongoClient.connect('mongodb://cs336:bjarne@ds037597.mlab.com:37597/cs336', function (err, dbConnection) {
  if (err) throw err
    db = dbConnection;
})


// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

/**
app.get('/api/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});
**/


/* gets a list of all people objects, updated to use the database */

app.get('/api/comments', function(req, res){
      db.collection("people").find({}).toArray(function(err, docs) {
        if (err) throw err;
        res.json(docs);
    });
});


/* updated to post the person to the mongoDB database */
app.post('/api/comments', function(req,res){
  var newPerson = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    startDate: req.body.startDate,
  }
  db.collection("people").insertOne(newPerson, function(err, result) {
        if (err) throw err;
        db.collection("people").find({}).toArray(function(err, docs) {
            if (err) throw err;
            res.json(docs);
        });
    });
 
});

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



app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

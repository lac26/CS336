/* Name: Lydia Cupery
* Date: October 12, 2016
* Lab6
*/

var express = require('express');
var HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');


var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//get request
app.get('/', function (req, res) {
  res
  .status(HttpStatus.ACCEPTED)
  .send('Hello world\n');
});


//get request
app.get('/request', function (req, res) {
  res
  .status(HttpStatus.ACCEPTED)
  .send('Getting the content for the page\n');
});

//header request
app.head('/request', function (req, res) {
  res
  .status(HttpStatus.ACCEPTED)
  .send('Getting the  header\n');
});

//put request
app.put('/request', function (req, res) {
  res
  .status(HttpStatus.ACCEPTED)
  .send('Creating or updating a resource\n');
});



app.post('/request', function (req, res) {
  res
  .status(HttpStatus.ACCEPTED)
  .send('Requesting to create\n');
  
});


//post form response
app.post('/forms', function (req, res) {
  res
  .status(HttpStatus.ACCEPTED)
  .send('Requesting to create......' 
    + "       ... The user name is " + req.body.user_name +
     "        ... The email address is " + req.body.user_mail +
    "         ... The user message is " + req.body.user_message
  );
  
});


app.all('*', function(req, res){
  res
  .status(HttpStatus.BAD_REQUEST)
  .send({
        error: HttpStatus.getStatusText(HttpStatus.BAD_REQUEST)
    });
});








app.listen(2000, function () {
  console.log('Example app listening on port 2000!');
});




//app.use(express.static('public'));
//app.use(express.static('index.html'))




//app.use('/static', express.static('files'));

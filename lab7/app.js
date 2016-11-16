var express = require('express');
var app = express();

//to see the first part of the lab, change public2 to public1
app.use(express.static('public2'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


//app.use(express.static('public'));
//app.use(express.static('index.html'))




//app.use('/static', express.static('files'));

// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// The request API endpoint
app.get("/api/timestamp/:date_string?", (req,res)=>{
  let dateString =req.params.date_string;
  let input ='';
  let unix ='';
  let handle ='';
  //handler if the date is empty
  if(req.params.date_string === undefined ){
     input = new Date();
    res.json({unix: input.getTime(), utc: input.toUTCString() });
  }
  else{
     input = new Date(dateString);
    if (/\d{5,}/.test(dateString)) 
    {
      var dateInt = parseInt(dateString);
      unix = new Date(dateInt); 
      let utcString = unix.toUTCString(); 
      res.json({unix: unix.getTime(),utc: utcString})
    }
  }
    if(input.toUTCString() === "Invalid Date"){
      res.json({error:input.toUTCString()});
    }
    else{
    res.json({ unix : input.getTime(),
              utc: input.toUTCString()  })
    }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
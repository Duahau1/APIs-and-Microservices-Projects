'use strict';

var express = require('express');
var cors = require('cors');
const bodyParser = require ('body-parser');
const multer = require('multer'); 
var app = express();
var upload = multer({dest:'./upload/'});

app.use(cors());
app.use(bodyParser.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
   console.log(req.file, req.body);
  if(req.file == undefined){
      res.json({size:0});
  }
  res.json({size: req.file.size});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});

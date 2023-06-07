//arashk yadegar
import dotenv from 'dotenv';
var http=require('http');
var express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");
import csrfProtection from '@authentication/csrf-protection';
//import  {router} from './app/routes';
//require('./app/config/db')();

dotenv.config();
const port = process.env.PORT;

var app = express();
//app.use(csrfProtection());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//allow to call from local angular
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});




app.use(express.json());
app.use(fileUpload());

require('./app/routes/index')(app);

//error catching middleware
app.use((err, req, res, next) => {
  res.status(500).send(`error : ${err.message}`);
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


//module.exports = server;
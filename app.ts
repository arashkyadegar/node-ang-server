//arashk yadegar
import dotenv from 'dotenv';
var http=require('http');
var express = require('express');
const fileUpload = require('express-fileupload');
//import  {router} from './app/routes';
//require('./app/config/db')();



dotenv.config();
const port = process.env.PORT;

var app = express();
//allow to call from local angular
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.use(express.json());
app.use(fileUpload());
require('./app/routes/index')(app);

const server =http.createServer(app).listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


module.exports = server;
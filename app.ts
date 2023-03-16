//arashk yadegar
import dotenv from 'dotenv';
var http=require('http');
var express = require('express');
//import  {router} from './app/routes';

dotenv.config();
const port = process.env.PORT;

var app = express();

require('./app/routes/index')(app);

const server =http.createServer(app).listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});



module.exports = server;
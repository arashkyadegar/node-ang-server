//arashk yadegar
import dotenv from 'dotenv';
var http=require('http');
var express = require('express');
//import  {router} from './app/routes';
require('./app/config/db')();
dotenv.config();
const port = process.env.PORT;

var app = express();
app.use(express.json());
require('./app/routes/index')(app);

const server =http.createServer(app).listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});


module.exports = server;
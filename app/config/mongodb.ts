import { MongoClient } from "mongodb";
import { tap, Observable, pipe, Subscription } from "rxjs";
export class MongoDb {
     MongoClient = require('mongodb').MongoClient;
     client :MongoClient | undefined;
     async dbconnect():Promise<any> {
    //  console.log("This will print.");
     this.client = await MongoClient.connect(
         'mongodb://127.0.0.1:27017');
          console.log('client opend')
          const rslt =  this.client.db('blogdb');
          return rslt;
        // const first = await x.findOne();
         //console.log(first);
         //res.send(first);
         //client.close(); //call this when you are done.
     };
     async dbclose():Promise<any> {
        this.client?.close();
        console.log('client closed')
     }
}
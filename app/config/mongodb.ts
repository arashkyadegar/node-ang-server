import { MongoClient } from "mongodb";
import { tap, Observable, pipe, Subscription } from "rxjs";
export class MongoDb {
     MongoClient = require('mongodb').MongoClient;
     client :MongoClient | undefined;
     async dbconnect(collectionName:string):Promise<any> {
    //  console.log("This will print.");
     this.client = await MongoClient.connect('mongodb://127.0.0.1:27017/');
          // console.log('client opend')
          // this.client.db("blogdb");
          // const rslt =await  this.client.db('blogdb').collection('blogs').find({}).toArray();
          const rslt =this.client.db('blogdb').collection(collectionName);
          // console.log(rslt);
          // .then(value =>{
          //   console.log(value);
          // });
        
          //this.client.close(); //call this when you are done.
     return rslt;
     }
     async dbclose():Promise<any> {
        this.client?.close();
        console.log('client closed')
     }
}
import { MongoClient } from "mongodb";
import { Collection } from "mongoose";
import { tap, Observable, pipe, Subscription } from "rxjs";
export class MongoDb {
     static client :MongoClient | undefined;
     private constructor(){}
     static async dbconnect(collectionName:string):Promise<any> {
          if(this.client == undefined){
                      console.log("This will undefinde. create new one");
                         this.client = await MongoClient.connect('mongodb://127.0.0.1:27017/');
                    }
                      console.log('use old one')
          // this.client.db("blogdb");
          // const rslt =await  this.client.db('blogdb').collection('blogs').find({}).toArray();
          return this.client.db('blogdb').collection(collectionName);
          // console.log(rslt);
          // .then(value =>{
          //   console.log(value);
          // });
        
          //this.client.close(); //call this when you are done.
     //return rslt;
     }
     
}
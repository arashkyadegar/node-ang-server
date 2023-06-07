import { MongoClient } from "mongodb";
import { Collection } from "mongoose";
import { tap, Observable, pipe, Subscription } from "rxjs";
export class MongoDb {
     static client :MongoClient | undefined;
     private constructor(){}
     static async dbconnect(collectionName:string):Promise<any> {

               if(this.client == undefined){
               this.client = await MongoClient.connect('mongodb://127.0.0.1:27017/')
               }
               return this.client.db('blogdb').collection(collectionName);

     }
     
}
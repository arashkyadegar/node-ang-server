import mongoose from "mongoose";
import { CommentEntity } from "./commentEntity";
import { MongoDb } from "../config/mongodb";
import validator from "validator";

export interface CommentDal {
  insertOne(id: string,b: CommentEntity): Promise<boolean>; // returns true if insert is succefull otherwise false.
  updateOne(id: string,b: CommentEntity): Promise<boolean>;  //returns true if update is succefull otherwise false.
  deleteOne(id: string): Promise<boolean> ; //returns true if delete is successful othewise false.
}

export class CommentDalConc implements CommentDal {
 async insertOne(id: string, commentEntity: CommentEntity): Promise<boolean> {
    let rslt;
    let blogObjectId =new mongoose.Types.ObjectId(id);
    let userObjectId2 =new mongoose.Types.ObjectId(commentEntity.user);
    const collection = MongoDb.dbconnect('posts');
    await collection.then(col =>{
      rslt= col.updateOne({"_id":blogObjectId} ,
        {$push: {"comments":{
                  'id':'2',
                  'user':userObjectId2 ,
                  'text': commentEntity.text,
                  'rate': commentEntity.rate,
                  'isVisible':commentEntity.isVisible ,
                  'date':new Date()
                  }}})
                       }
    )
    return rslt;
}
  updateOne(id: string, b: CommentEntity): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
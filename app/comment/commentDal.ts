import mongoose from "mongoose";
import { CommentEntity } from "./commentEntity";
import { MongoDb } from "../config/mongodb";
import validator from "validator";

export interface CommentDal {
  insertOne(id: string,commentEntity: CommentEntity): Promise<boolean>; // returns true if insert is succefull otherwise false.
  updateOne(id: string,commentEntity: CommentEntity): Promise<boolean>;  //returns true if update is succefull otherwise false.
  deleteOne(id: string): Promise<boolean> ; //returns true if delete is successful othewise false.
  updateCommentIsVisible(postId: string,commentId: string ,isVisible: boolean ): Promise<boolean>;
  findOne(commentId: string): Promise<CommentEntity>;
  findAllByPostId(postId: string): Promise<CommentEntity[]>;
}

export class CommentDalConc implements CommentDal {
  async findOne(commentId: string): Promise<CommentEntity> {
    let rslt;
    let commentObjectId =new mongoose.Types.ObjectId(commentId);
    const collection = MongoDb.dbconnect('posts');
    await collection.then(col =>{
      rslt = col.findOne({"comments.id": commentObjectId}).toArray();
    });
    return rslt.comments;
  }
async  findAllByPostId(postId: string): Promise<CommentEntity[]> {
    let rslt;
    let postObjectId =new mongoose.Types.ObjectId(postId);
    const collection = MongoDb.dbconnect('posts');
    await collection.then(col =>{
      rslt = col.find({"_id": postObjectId},{"comments":1})
      .sort({"date": -1}).toArray();
    });
    return rslt.comments;
  }

  async updateCommentIsVisible(postId: string,commentId: string ,isVisible: boolean ): Promise<boolean> {
    let rslt;
    let postObjectId =new mongoose.Types.ObjectId(postId);
    let commentObjectId =new mongoose.Types.ObjectId(commentId);
    const collection = MongoDb.dbconnect('posts');
    await collection.then(col =>{
      rslt= col.updateOne({"comments.id": {$eq: commentObjectId}},
      {
       $set: {"comments.$[el].isVisible": isVisible}}, {arrayFilters: [{"el.id": {$eq:commentObjectId}}]})
      }
    )

return true;
  }
 async insertOne(id: string, commentEntity: CommentEntity): Promise<boolean> {
    let rslt;
    var objectId = new mongoose.Types.ObjectId();
    let postObjectId =new mongoose.Types.ObjectId(id);
    let userObjectId2 =new mongoose.Types.ObjectId(commentEntity.user);


    const collection = MongoDb.dbconnect('posts');
    await collection.then(col =>{
      rslt= col.updateOne({"_id": postObjectId} ,
        {$push: {"comments": {
                  '_id': objectId,
                  'user': userObjectId2 ,
                  'text': commentEntity.text,
                  'rate': commentEntity.rate,
                  'isVisible': commentEntity.isVisible ,
                  'date': new Date()
                  }}})
                       }
    )
    return rslt;
}
updateOne(id: string,commentEntity: CommentEntity): Promise<boolean>  {


    throw new Error("Method not implemented.");
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }
}
import {IPost,PostEntity} from './postEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { BlogEntity } from '../blog/blogEntity';

export interface PostDal {
    insertOne(b:PostEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find():Promise<PostEntity[]>; // returns Array of objects.
    findOne(id:string):Promise<PostEntity>; //returns found object.
    updateOne(id:number,b:PostEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:string):void ; //returns true if delete is successful othewise false.
}
export class PostDalConc implements PostDal {
     async insertOne(p: PostEntity): Promise<boolean> {
        const schema = require('../post/postSchema');
        const blog= schema(p);
        //b.author.setId=new mongoose.Types.ObjectId();
        const rslt=await schema.save();
        return rslt;
    }
  async  find(): Promise<PostEntity[]>{
        const schema = require('../post/postSchema');
        let rslt= await schema.find();
        return rslt;
    }
  async  findOne(id: string):  Promise<PostEntity> {
        const schema = require('../post/postSchema');
        var ObjectId =new mongoose.Types.ObjectId(id);
        let rslt= await schema.find(    {
          "_id" : ObjectId
      })
        return rslt;
    }
  async  updateOne(id: number, b: PostEntity): Promise<boolean> {
      const schema = require('../blog/blogSchema');
      var ObjectId =new mongoose.Types.ObjectId("643ef7920fc0c3100bf324b7");

    let product = await schema.replaceOne({_id:ObjectId}, {title : "Amazon"});
      return product;
    }

    deleteOne(_id: string):void  {
      const schema = require('../blog/blogSchema');
     const posts= schema.findById("644239572e7ab230716572b0");
      console.log(posts.comments);
    }

}
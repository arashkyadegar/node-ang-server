import {IPost,PostEntity} from './postEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import mongoose from 'mongoose';
export interface PostDal {
    insertOne(b:PostEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find():Promise<PostEntity[]>; // returns Array of objects.
    findOne(id:string):Promise<PostEntity>; //returns found object.
    updateOne(id:number,b:PostEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:string):Promise<PostEntity> ; //returns true if delete is successful othewise false.
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
    updateOne(id: number, b: PostEntity): Promise<boolean> {
        throw new Error('Method not implemented.');
    }


    
  async  deleteOne(id: string): Promise<PostEntity>  {

    const schema = require('../post/postSchema');
    var ObjectId =new mongoose.Types.ObjectId(id);
    let rslt= await schema.findOneAndRemove({'_id':ObjectId});
    return rslt;
    }

}
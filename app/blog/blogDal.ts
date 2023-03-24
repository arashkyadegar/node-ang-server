import {IBlog,BlogEntity} from './blogEntity';
import {PostEntity} from '../post/postEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import mongoose from 'mongoose';
import { UserEntity } from '../user/userEntity';
export interface BlogDal {
    insertOne(b:BlogEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find():Promise<BlogEntity[]>; // returns Array of objects.
    findOne(id:string):Promise<BlogEntity>; //returns found object.
    updateOne(id:number,b:BlogEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:string):Promise<BlogEntity> ; //returns true if delete is successful othewise false.
}

    export class BlogDalConc implements BlogDal {
     async insertOne(b: BlogEntity): Promise<boolean> {
        const schema = require('../blog/blogSchema');
        const blog= schema(b);
        //b.author.setId=new mongoose.Types.ObjectId();
        const rslt=await blog.save();
        return rslt;
    }

    async findOneAndUpdatePost(bid: string,posts:Array<PostEntity>):Promise<boolean> {
      const Character = require('../blog/blogSchema');
      var ObjectId =new mongoose.Types.ObjectId(bid);
      const filter = {'_id':bid}
      let doc = await Character.updateOne(filter,{'posts': posts} );
      return doc;
    }

    async findOneAndUpdateAuthor(bid: string,u:UserEntity):Promise<boolean> {
      const Character = require('../blog/blogSchema');
      var ObjectId =new mongoose.Types.ObjectId(bid);
      const filter = {'_id':bid}
      let doc = await Character.updateOne(filter,{'author': u } );
      return doc;
    }

    async  find(): Promise<BlogEntity[]>{
          const schema = require('../blog/blogSchema');
          let rslt= await schema.find();
          return rslt;
    }

    async  findOne(id: string):  Promise<BlogEntity> {
          const schema = require('../blog/blogSchema');
          var ObjectId =new mongoose.Types.ObjectId(id);
          let rslt= await schema.find({'_id':ObjectId});
          return rslt;
    }

    updateOne(id: number, b: BlogEntity): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    async  deleteOne(id: string): Promise<BlogEntity>  {
      const schema = require('../blog/blogSchema');
      var ObjectId =new mongoose.Types.ObjectId(id);
      let rslt= await schema.findOneAndRemove({'_id':ObjectId});
      return rslt;
    }

}
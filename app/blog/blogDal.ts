import {IBlog,BlogEntity} from './blogEntity';
import {PostEntity} from '../post/postEntity';
import {mongUtility} from '../utility/mongooseUtility';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import mongoose from 'mongoose';
import { UserEntity } from '../user/userEntity';
import { MongoDb } from '../config/mongodb';
import { MongoClient } from 'mongodb';

export interface BlogDal {
    findPostsById(bid: string,pid:string):Promise<PostEntity>;
    insertOne(b:BlogEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find():Promise<BlogEntity[]>; // returns Array of objects.
    findOne(id:string):Promise<BlogEntity>; //returns found object.
    updateOne(id:string,b:BlogEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:string):Promise<BlogEntity> ; //returns true if delete is successful othewise false.
    findOneAndAddNewPosts(bid: string,posts:Array<PostEntity>):Promise<boolean>;
    findOneAndUpdateAuthor(bid: string,u:UserEntity):Promise<boolean>;
}

    export class BlogDalConc implements BlogDal {
    async  find(): Promise<BlogEntity[]> {
            console.log('yes');
            let rslt;
            const collection = MongoDb.dbconnect('blogs');
            await collection.then(col =>{
                rslt= col.find({}).toArray();
            });
            return rslt;
          
      }
     async insertOne(b: BlogEntity): Promise<boolean> {
      throw new Error('Method not implemented.');
          //   const mongoDb =new MongoDb();
          //   const collection=await mongoDb.dbconnect('blogs');
          //   const rslt=await collection.insertOne(b);
          // return rslt;
    }

    async findPostsById(tmp_bid,tmp_pid):Promise<PostEntity>{
      throw new Error('Method not implemented.');
      
    }

    async findOneAndAddNewPosts(bid: string,posts:Array<PostEntity>):Promise<boolean> {
      throw new Error('Method not implemented.');
      // const Character = require('../blog/blogSchema');
      // var ObjectId =new mongoose.Types.ObjectId(bid);
      // const filter = {'_id':bid}
      // let doc = await Character.updateOne(filter,{'posts': posts} );
      // return doc;
    }

    async findOneAndUpdateAuthor(bid: string,u:UserEntity):Promise<boolean> {
      throw new Error('Method not implemented.');
      // const Character = require('../blog/blogSchema');
      // var ObjectId =new mongoose.Types.ObjectId(bid);
      // const filter = {'_id':bid}
      // let doc = await Character.updateOne(filter,{'author': u } );
      // return doc;
    }
    async  findOne(id: string):  Promise<BlogEntity> {

        //    let ObjectId =mongUtility.getObjectId(id);
        //    const mongoDb =new MongoDb();
        //    const collection = await mongoDb.dbconnect('blogs');    
        //    const rslt = collection.findOne({'_id':ObjectId});
        //  return rslt;
        let ObjectId =mongUtility.getObjectId(id);
        let rslt;
        const collection = MongoDb.dbconnect('blogs');
        await collection.then(col =>{
            rslt= col.findOne({'_id':ObjectId});
        });
        return rslt;
    }

    async updateOne(id :string ,b: BlogEntity): Promise<boolean> {
      let ObjectId =mongUtility.getObjectId(id);
        let rslt;
        const collection = MongoDb.dbconnect('blogs');
        await collection.then(col =>{
              rslt= col.updateOne({'_id':ObjectId}, { $set: { 
                              'title':b.title ,
                              'author': b.author,
                              'date': b.date,
                              'body': b.body,
                              'rate': b.rate,
                              'posts': b.posts }} ,{ upsert: true });
              });
        return rslt;
    }

    async  deleteOne(id: string): Promise<BlogEntity>  {
      let ObjectId =mongUtility.getObjectId(id);
      let rslt;
      const collection = MongoDb.dbconnect('blogs');
      await collection.then(col =>{
            rslt= col.deleteOne({'_id':ObjectId});
      });
      return rslt;
    }

}
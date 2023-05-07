import {IBlog,BlogEntity} from './blogEntity';
import {PostEntity} from '../post/postEntity';
import {mongUtility} from '../utility/mongooseUtility';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import mongoose from 'mongoose';
import { UserEntity } from '../user/userEntity';
import { MongoDb } from '../config/mongodb';
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
     async insertOne(b: BlogEntity): Promise<boolean> {
      const mongoDb =new MongoDb();
      let rslt:any;
            const client=mongoDb.dbconnect();
                await client.then(async (db:any) => {
                  rslt=await db.collection('blogs').insertOne(b);
                })
          mongoDb.dbclose();
          return rslt;
    }

    async findPostsById(tmp_bid,tmp_pid):Promise<PostEntity>{
      throw new Error('Method not implemented.');
      
    }

    async findOneAndAddNewPosts(bid: string,posts:Array<PostEntity>):Promise<boolean> {
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
      const mongoDb =new MongoDb();
      let rslt:any;
            const client=mongoDb.dbconnect();
                await client.then(async (db:any) => {
                  rslt=await db.collection('blogs').findOne();
                })
          mongoDb.dbclose();
          return rslt;

    }

    async  findOne(id: string):  Promise<BlogEntity> {
           let ObjectId =mongUtility.getObjectId(id);
          // const schema = require('../blog/blogSchema');
          // let rslt= await schema.find({'_id':ObjectId});
          // return rslt;

          const mongoDb =new MongoDb();
          let rslt:any;
                const client=mongoDb.dbconnect();
                    await client.then(async (db:any) => {
                      rslt=await db.collection('blogs').findOne({'_id':ObjectId});
                    })
              mongoDb.dbclose();
              return rslt;
    
    }

    async updateOne(id :string ,b: BlogEntity): Promise<boolean> {
      // const schema = require('../blog/blogSchema');
      // const blogDocument= schema(b);
      // const rslt=await blogDocument.save();
      // return rslt;
      var ObjectId =mongUtility.getObjectId(id);
      const mongoDb =new MongoDb();
      let rslt:any;
            const client=mongoDb.dbconnect();
                await client.then(async (db:any) => {
                  rslt=await db.collection('blogs').replaceOne({'_id':ObjectId}, { $set: { b }} );
                })
          mongoDb.dbclose();
          return rslt;
     // db.posts.updateOne( { title: "Post Title 1" }, { $set: { likes: 2 } } ) 
    }

    async  deleteOne(id: string): Promise<BlogEntity>  {
      var ObjectId =mongUtility.getObjectId(id);
      const mongoDb =new MongoDb();
      let rslt:any;
            const client=mongoDb.dbconnect();
                await client.then(async (db:any) => {
                  rslt=await db.collection('blogs').deleteOne({'_id':ObjectId});
                })
          mongoDb.dbclose();
          return rslt;
    }

}
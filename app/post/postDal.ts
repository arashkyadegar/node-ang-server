import {IPost,PostEntity} from './postEntity';
import mongoose from 'mongoose';
import { MongoServerSelectionError } from 'mongodb';
import { mongUtility } from '../utility/mongooseUtility';
import { MongoDb } from '../config/mongodb';
import validator from 'validator';
import { postQueryGenerator } from '../utility/queryMaker';
import  { ObjectId }  from 'mongodb';

  export interface PostDal {
    search(title: string,page: number): Promise<PostEntity[]>;
    insertOne(b: PostEntity): Promise<boolean>; 
    find(page: number): Promise<PostEntity[]>; 
    findOne(id: string): Promise<PostEntity>; 
    updateOne(id: string,b: PostEntity): Promise<boolean>;  
    deleteOne(id: string): Promise<boolean> ; 
    advanceSearch(title: string , isVisible:boolean,rate :number): Promise<PostEntity[]> ;
  }


  export class PostDalConc implements PostDal {
    async advanceSearch(title: string , isVisible: boolean ,rate: number): Promise<PostEntity[]> {
      let result;
      const collection = MongoDb.dbconnect('posts');
      await collection.then(posts => {
        const queryGenerator = new postQueryGenerator('',title,'',rate,new Date(),isVisible,[],[]);
        const query =queryGenerator.generate();
        result = posts.find(query).toArray();
      })
      return result;
    }


    async search(title: string,page: number): Promise<PostEntity[]> {
      let result;
      const collection = MongoDb.dbconnect('posts');
      let skipNumber = page* 5;
      await collection.then(posts => {
        // const queryGenerator = new postQueryGenerator('',title,'',4,new Date(),false,[],[]);
        // const query =queryGenerator.generate();
        result = posts.find({"title" :{$regex:validator.escape(title)}})
         .skip(skipNumber).limit(5).sort({"title": 1, "date": -1}).toArray();
      });
      console.log(`result = ${result}`);
      return result;
    }


    async  find(page: number): Promise<PostEntity[]> {
      let result;
      const collection = MongoDb.dbconnect('posts');
      let skipNumber = page* 5;

      await collection.then(posts =>{
        result = posts.find({})
        .skip(skipNumber).limit(5).sort({"title": 1, "date": -1}).toArray();
      });
      return result;
    }


    async insertOne(postEntity: PostEntity): Promise<boolean> {
    let result;
    let authorObjectId =new mongoose.Types.ObjectId(postEntity.author._id);
    const collection = MongoDb.dbconnect('posts');
    await collection.then(posts =>{
      result = posts.insertOne({
        author: authorObjectId,
        title: validator.escape(postEntity.title),
        body: validator.escape(postEntity.body),
        rate: postEntity.rate,
        img: validator.escape(postEntity.img),
        date: new Date(postEntity.date),
        isVisible: postEntity.isVisible ,
        documents: postEntity.documents,
        tags: postEntity.tags,
        links: postEntity.links,
        comments: postEntity.comments
      });
      });
    return result;
  }


  async  findOne(id: string):  Promise<PostEntity> {
    let postObjectId = mongUtility.getObjectId(validator.escape(id));
    let result;
    const collection = MongoDb.dbconnect('posts');
    await collection.then(posts =>{
      result = posts.findOne({'_id': postObjectId});
    });
    return result;
  }


  async  updateOne(id: string, postEntity: PostEntity): Promise<boolean> {
    let result;
    let postObjectId = mongUtility.getObjectId(validator.escape(id));
    const collection = MongoDb.dbconnect('posts');
    await collection.then(posts =>{
      result = posts.updateOne({
        "_id": postObjectId
        },{$set: {
        author: postEntity.author._id,
        title: validator.escape(postEntity.title),
        body: validator.escape(postEntity.body),
        rate: postEntity.rate,
        img: validator.escape(postEntity.img),
        date: new Date(postEntity.date),
        isVisible: postEntity.isVisible ,
        documents: postEntity.documents,
        tags:postEntity.tags,
        links:postEntity.links
        }
      });
    });
    return result;
    }


async  deleteOne(id: string): Promise<boolean>  {
  let result;
  let postObjectId = mongUtility.getObjectId(id);
  const collection = MongoDb.dbconnect('posts');
  await collection.then(posts =>{
    result = posts.deleteOne({'_id': postObjectId});
  });
  return result;
}

}
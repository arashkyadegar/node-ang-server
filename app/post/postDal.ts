import {IPost,PostEntity} from './postEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import mongoose from 'mongoose';
import { MongoServerSelectionError } from 'mongodb';
import { mongUtility } from '../utility/mongooseUtility';
import { MongoDb } from '../config/mongodb';
import { UserEntity } from '../user/userEntity';
import validator from 'validator';

import { MongoClient } from 'mongodb';
import { json } from 'body-parser';
import { promises } from 'dns';
const {ObjectId} = require('mongodb');
  export interface PostDal {
    search(title: string,page: number): Promise<PostEntity[]>;
    insertOne(b: PostEntity): Promise<boolean>; // returns true if insert is succefull otherwise false.
    find(page: number): Promise<PostEntity[]>; // returns Array of objects.
    findOne(id: string): Promise<PostEntity>; //returns found object.
    updateOne(id: string,b: PostEntity): Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id: string): Promise<boolean> ; //returns true if delete is successful othewise false.
  }

  export class PostDalConc implements PostDal {
    async search(title: string,page: number): Promise<PostEntity[]> {
      let rslt;
      const collection = MongoDb.dbconnect('posts');
      let x = page* 5;
      await collection.then(col =>{
        rslt = col.find({"title" :{$regex:validator.escape(title)}})
        .skip(x).limit(5).sort({"title": 1, "date": -1}).toArray();
      });
      console.log(rslt);
      return rslt;
    }

    async  find(page: number): Promise<PostEntity[]> {
      let rslt;
      const collection = MongoDb.dbconnect('posts');
      let x = page* 5;
      console.log(x);
      await collection.then(col =>{
        rslt = col.find({})
        .skip(x).limit(5).sort({"title": 1, "date": -1}).toArray();
      });
      return rslt;
    }


    async insertOne(postEntity: PostEntity): Promise<boolean> {
    let rslt;
    let ObjectId =new mongoose.Types.ObjectId(postEntity.author._id);
    const collection = MongoDb.dbconnect('posts');
    await collection.then(col =>{
      rslt= col.insertOne({
        author: ObjectId,
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
    return rslt;
  }



  async  findOne(id: string):  Promise<PostEntity> {
    let ObjectId = mongUtility.getObjectId(validator.escape(id));
    let rslt;
    const collection = MongoDb.dbconnect('posts');
    await collection.then(col =>{
      rslt= col.findOne({'_id': ObjectId});
    });

    return rslt;
}

  async  updateOne(id: string, postEntity: PostEntity): Promise<boolean> {
    let rslt;
    let ObjectId_tmp = mongUtility.getObjectId(validator.escape(id));
    const collection = MongoDb.dbconnect('posts');
    await collection.then(col =>{
      rslt= col.updateOne({
        "_id": ObjectId_tmp
        },{$set: {
        author: new ObjectId(postEntity.author._id),
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
    return rslt;
    }

async  deleteOne(id: string): Promise<boolean>  {
  let ObjectId = mongUtility.getObjectId(id);
  let rslt;
  const collection = MongoDb.dbconnect('posts');
  await collection.then(col =>{
    rslt = col.deleteOne({'_id': ObjectId});
  });
  return rslt;
}

}
import {IUser,UserEntity} from './userEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';

import { MongoDb } from '../config/mongodb';
import { mongUtility } from '../utility/mongooseUtility';
import validator from 'validator';
import mongoose from 'mongoose';

export interface UserDal {
    findByName(name:string):Promise<UserEntity>;
    insertOne(b:UserEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find():Promise<UserEntity[]>; // returns Array of objects.
    findOne(id:string):Promise<UserEntity>; //returns found object.
    updateOne(id: string, userEntity: UserEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:string):Promise<UserEntity>; //returns true if delete is successful othewise false.
}

export class UserDalConc implements UserDal {
     async insertOne(userEntity: UserEntity): Promise<boolean> {
      let rslt;
      const collection = MongoDb.dbconnect('users');
      await collection.then(col =>{
          rslt= col.insertOne({
           name: validator.escape(userEntity.name),
           password: userEntity.password,
           tags: userEntity.tags,
           likes: userEntity.likes
          });
      });
      return rslt;
    }
    async insertOneTag(id: string,tagName: string): Promise<boolean> {
      let rslt;
      let userObjectId = new mongoose.Types.ObjectId(id);
      const collection = MongoDb.dbconnect('users');
      await collection.then(col =>{
        rslt = col.updateOne({"_id": userObjectId} ,
          {$push: {"tags": validator.escape(tagName)}
        })
      }
      )
      return rslt;
    }

    async insertOneLike(id: string,likeName: string): Promise<boolean> {
      let rslt;
      let userObjectId = new mongoose.Types.ObjectId(id);
      const collection = MongoDb.dbconnect('users');
      await collection.then(col =>{
        rslt = col.updateOne({"_id": userObjectId} ,
          {$push: {"likes": validator.escape(likeName)}
        })
      }
      )
      return rslt;
    }


    async removeOneTag(id: string,tagName: string) {

    }
async findByName(name:string): Promise<UserEntity>{
  let rslt;
  const collection = MongoDb.dbconnect('users');
  await collection.then(col =>{
      rslt= col.findOne({'name':validator.escape(name)});
  });
  return rslt;
}
  async  find(): Promise<UserEntity[]>{
    let rslt;
            const collection = MongoDb.dbconnect('users');
            await collection.then(col =>{
              rslt= col.find()
              .sort({"name":1}).toArray();
            });
            return rslt;
    }

  async  findOne(id: string):  Promise<UserEntity> {
    let ObjectId =mongUtility.getObjectId(validator.escape(id));
    let rslt;
    const collection = MongoDb.dbconnect('users');
    await collection.then(col =>{
        rslt= col.findOne({'_id':ObjectId});
    });
    return rslt;
    }

    async updateOne(id: string, userEntity: UserEntity): Promise<boolean> {
      let ObjectId =mongUtility.getObjectId(validator.escape(id));
      let rslt;
      const collection = MongoDb.dbconnect('users');
      await collection.then(col =>{
          rslt= col.updateOne({'_id':ObjectId},
          {$set:{'name':validator.escape(userEntity.name)}});
      });
      return rslt;
    }

  async  deleteOne(id: string): Promise<UserEntity>  {
    let ObjectId =mongUtility.getObjectId(validator.escape(id));
    let rslt;
    const collection = MongoDb.dbconnect('users');
    await collection.then(col =>{
          rslt= col.deleteOne({'_id':ObjectId});
    });
    return rslt;
    }
}
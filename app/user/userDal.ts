import {IUser,UserEntity} from './userEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import mongoose from 'mongoose';

export interface BlogDal {
    insertOne(b:UserEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find():Promise<UserEntity[]>; // returns Array of objects.
    findOne(id:string):Promise<UserEntity>; //returns found object.
    updateOne(id:number,b:UserEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:string):Promise<UserEntity>; //returns true if delete is successful othewise false.
}

export class PostDalConc implements BlogDal {
     async insertOne(p: UserEntity): Promise<boolean> {
        const schema = require('../user/userSchema');
        const blog= schema(p);
        //b.author.setId=new mongoose.Types.ObjectId();
        const rslt=await schema.save();
        return rslt;
    }

  async  find(): Promise<UserEntity[]>{
    const schema = require('../user/userSchema');
        let rslt= await schema.find();
        return rslt;
    }

  async  findOne(id: string):  Promise<UserEntity> {
    const schema = require('../user/userSchema');
        var ObjectId =new mongoose.Types.ObjectId(id);
        let rslt= await schema.find({'_id':ObjectId});
        return rslt;
    }

    updateOne(id: number, b: UserEntity): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

  async  deleteOne(id: string): Promise<UserEntity>  {
    const schema = require('../user/userSchema');
    var ObjectId =new mongoose.Types.ObjectId(id);
    let rslt= await schema.findOneAndRemove({'_id':ObjectId});
    return rslt;
    }
}
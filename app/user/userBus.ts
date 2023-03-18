import {IUser,UserEntity} from './userEntity';

import {validate} from 'class-validator';
import { rejects } from 'assert';
export interface UserBus {
    insertOne(blog:UserEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find():Array<UserEntity>; // returns Array of objects.
    findOne(id:number):UserEntity; //returns found object.
    updateOne(id:number,b:UserEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:number):boolean; //returns true if delete is successful othewise false.
}


export class UserBusConc implements UserBus {
    async insertOne( blog: UserEntity): Promise<boolean> {
                     const p=await validate(blog);
                     if(p.length >0 )
                         return false;
                         return true;
                         
     }
 
     find(): UserEntity[] {
         let x=new Array<UserEntity>();
             x.push(new UserEntity());
             x.push(new UserEntity());
             x.push(new UserEntity());
         return x;
     }
 
     findOne(id: number): UserEntity {

         throw new Error('Method not implemented.');
     }
 
     async updateOne(id: number, blog: UserEntity): Promise<boolean> {
         let validation_rslt=false;
         // check class validation
             const p=await validate(blog);
             if(p.length >0 )
                 return false;
                 return true;
     }
     deleteOne(id: number): boolean {
         throw new Error('Method not implemented.');
     }
 }
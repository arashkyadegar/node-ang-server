import {IUser,UserEntity} from './userEntity';

import {validate} from 'class-validator';
import { rejects } from 'assert';
import { UserDal } from './userDal';
import { HashPassword } from '../utility/hashUtility';
export interface UserBus {
    findByName(name:string):Promise<UserEntity>;
    insertOne(blog:UserEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find():Promise<UserEntity[]>; // returns Array of objects.
    findOne(id:string): Promise<UserEntity> //returns found object.
    updateOne(id:string,b:UserEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:string): Promise<boolean> ; //returns true if delete is successful othewise false.
}


export class UserBusConc implements UserBus {
    private db:UserDal;
    constructor(db:UserDal){
      this.db=db;
    }
   async findByName(name:string):Promise<UserEntity>{
      const p=await this.db.findByName(name);     
      return p;
    }
    async insertOne( user: UserEntity): Promise<boolean> {
      let hashPassword=new HashPassword();
       let hashedPassword=await hashPassword.createHash(user.password);
         user.password=hashedPassword;
                     const p=await this.db.insertOne(user);     
                     return p;
     }
 
     async   find(): Promise<UserEntity[]> {
        const p=await this.db.find();     
        return p;
     }
 
     async   findOne(id: string): Promise<UserEntity> {
        const p=await this.db.findOne(id);     
        return p;
     }
 
     async  updateOne(id: string, userEntity: UserEntity): Promise<boolean> {
            let rslt;
            rslt=await this.db.updateOne(id,userEntity);  
            return rslt;
     }
   async  deleteOne(id: string):  Promise<boolean>  {
        let rslt;
        rslt=await this.db.deleteOne(id);  
        return rslt;
     }
 }
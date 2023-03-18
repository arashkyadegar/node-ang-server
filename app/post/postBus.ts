import {IPost,PostEntity} from './postEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
export interface PostBus {
    insertOne(blog:PostEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find():Array<PostEntity>; // returns Array of objects.
    findOne(id:number):PostEntity; //returns found object.
    updateOne(id:number,b:PostEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:number):boolean; //returns true if delete is successful othewise false.
}


export class PostBusConc implements PostBus {
    async insertOne( blog: PostEntity): Promise<boolean> {
                     const p=await validate(blog);
                     if(p.length >0 )
                         return false;
                         return true;
                         
     }
 
     find(): PostEntity[] {
         let x=new Array<PostEntity>();
             x.push(new PostEntity());
             x.push(new PostEntity());
             x.push(new PostEntity());
         return x;
     }
 
     findOne(id: number): PostEntity {
         throw new Error('Method not implemented.');
     }
 
     async updateOne(id: number, blog: PostEntity): Promise<boolean> {
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
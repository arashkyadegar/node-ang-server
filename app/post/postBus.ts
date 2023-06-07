import {IPost,PostEntity} from './postEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import { PostDal, PostDalConc } from '../post/postDal';
export interface PostBus {
    insertOne(blog:PostEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find(page:number,title:string):Promise<PostEntity[]>; // returns Array of objects.
    findOne(id:string):Promise<PostEntity>; //returns found object.
    updateOne(id:string,b:PostEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:string):Promise<boolean>; //returns true if delete is successful othewise false.
}


export class PostBusConc implements PostBus {

    private db:PostDal;
    constructor(db:PostDal){
      this.db=db;
    }
    async insertOne( post: PostEntity): Promise<boolean> {
        const p=await this.db.insertOne(post);     
        return p;        
     }
 
    async find(page:number,title:string): Promise<PostEntity[]>  {
        let rslt;
             rslt = await this.db.find(page,title);
            return rslt;
     }
 
    async findOne(id: string): Promise<PostEntity> {
        const db=new PostDalConc();
        const rslt=await db.findOne(id);
        return rslt;
     }
 
     async updateOne(id: string, post: PostEntity): Promise<boolean> {
        const p=await this.db.updateOne(id,post);     
        return p;
     }
     deleteOne(id: string): Promise<boolean> {
         throw new Error('Method not implemented.');
     }
 }
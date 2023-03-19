import {IBlog,BlogEntity} from './blogEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import { PostBusConc } from '../post/postBus';
import { BlogDalConc } from './blogDal';
export interface BlogBus {
     insertOne(blog:BlogEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find():Promise<BlogEntity[]>; // returns Array of objects.
    findOne(id:string):Promise<BlogEntity>; //returns found object.
    updateOne(id:number,b:BlogEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:number):boolean; //returns true if delete is successful othewise false.
}

export class BlogBusConc implements BlogBus {
   async insertOne( blog: BlogEntity): Promise<boolean> {
                    const db=new BlogDalConc();
                    //const p=await validate(blog);
                    const rslt=await db.insertOne(blog);
                    return rslt;
              /*      if(p.length >0 ){
                        return false;
                    }else{
                
                        return true;
                    }*/
    }

  async  find(): Promise<BlogEntity[]> {
        const db=new BlogDalConc();
        const rslt=await db.find();
        return rslt;
    }

  async   findOne(id: string): Promise<BlogEntity> {
        const db=new BlogDalConc();
        //const p=await validate(blog);
        const rslt=await db.findOne(id);
        return rslt;
    }

    async updateOne(id: number, blog: BlogEntity): Promise<boolean> {
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
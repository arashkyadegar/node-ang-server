import {IBlog,BlogEntity} from './blogEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
export interface BlogBus {
     insertOne(blog:BlogEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find():Array<BlogEntity>; // returns Array of objects.
    findOne(id:number):BlogEntity; //returns found object.
    updateOne(id:number,b:BlogEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:number):boolean; //returns true if delete is successful othewise false.
}

export class BlogBusConc implements BlogBus {
   async insertOne( blog: BlogEntity): Promise<boolean> {
                    const p=await validate(blog);
                    if(p.length >0 )
                        return false;
                        return true;
                        
    }

    find(): BlogEntity[] {
        let x=new Array<BlogEntity>();
            x.push(new BlogEntity());
            x.push(new BlogEntity());
            x.push(new BlogEntity());
        return x;
    }

    findOne(id: number): BlogEntity {
        throw new Error('Method not implemented.');
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
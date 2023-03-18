import {IDocument,DocumentEntity} from './documentEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
export interface DocumentBus {
    insertOne(blog:DocumentEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find():Array<DocumentEntity>; // returns Array of objects.
    findOne(id:number):DocumentEntity; //returns found object.
    updateOne(id:number,b:DocumentEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:number):boolean; //returns true if delete is successful othewise false.
}


export class DocumentBusConc implements DocumentBus {
    async insertOne( blog: DocumentEntity): Promise<boolean> {
                     const p=await validate(blog);
                     if(p.length >0 )
                         return false;
                         return true;
                         
     }
 
     find(): DocumentEntity[] {
         let x=new Array<DocumentEntity>();
             x.push(new DocumentEntity());
             x.push(new DocumentEntity());
             x.push(new DocumentEntity());
         return x;
     }
 
     findOne(id: number): DocumentEntity {
         throw new Error('Method not implemented.');
     }
 
     async updateOne(id: number, blog: DocumentEntity): Promise<boolean> {
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
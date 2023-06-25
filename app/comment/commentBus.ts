import {CommentEntity} from './commentEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import { CommentDal,CommentDalConc } from '../comment/commentDal';
export interface CommentBus {
  insertOne(bid: string,commentEntity: CommentEntity): Promise<boolean>; // returns true if insert is succefull otherwise false.
  updateOne(id: string,b: CommentEntity): Promise<boolean>;  //returns true if update is succefull otherwise false.
  deleteOne(id: string): Promise<boolean> ;  //returns true if delete is successful othewise false.
}

export class CommentBusConc implements CommentBus {
  private db: CommentDal;
  constructor(db: CommentDal){
    this.db = db; 
}
  insertOne(bid: string,commentEntity: CommentEntity): Promise<boolean> {
   const rslt = this.db.insertOne(bid,commentEntity);
   return rslt;
  }
  updateOne(id: string, b: CommentEntity): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

}
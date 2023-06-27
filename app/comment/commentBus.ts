import {CommentEntity} from './commentEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import { CommentDal,CommentDalConc } from '../comment/commentDal';
export interface CommentBus {
  insertOne(pid: string,commentEntity: CommentEntity): Promise<boolean>; // returns true if insert is succefull otherwise false.
  updateOne(id: string,b: CommentEntity): Promise<boolean>;  //returns true if update is succefull otherwise false.
  deleteOne(id: string): Promise<boolean> ;  //returns true if delete is successful othewise false.
  updateCommentIsVisible(postId: string,commentId: string ,isVisible: boolean ): Promise<boolean>;
}

export class CommentBusConc implements CommentBus {
  private db: CommentDal;
  constructor(db: CommentDal){
    this.db = db; 
}
async updateCommentIsVisible(postId: string,commentId: string ,isVisible: boolean ): Promise<boolean> {
  const rslt = this.db.updateCommentIsVisible(postId,commentId,isVisible);
  return rslt;
}
insertOne(pid: string,commentEntity: CommentEntity): Promise<boolean> {
  const rslt = this.db.insertOne(pid,commentEntity);
  return rslt;
}
updateOne(id: string, b: CommentEntity): Promise<boolean> {
  throw new Error('Method not implemented.');
}
deleteOne(id: string): Promise<boolean> {
  throw new Error('Method not implemented.');
}

}
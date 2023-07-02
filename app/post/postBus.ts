import {IPost,PostEntity} from './postEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import { PostDal, PostDalConc } from '../post/postDal';
export interface PostBus {
  insertOne(blog: PostEntity): Promise<boolean>; // returns true if insert is succefull otherwise false.
  find(page: number): Promise<PostEntity[]>; // returns Array of objects.
  findOne(id: string): Promise<PostEntity>; //returns found object.
  updateOne(id: string,b: PostEntity): Promise<boolean>;  //returns true if update is succefull otherwise false.
  deleteOne(id: string): Promise<boolean>; //returns true if delete is successful othewise false.
  search(title: string,page: number): Promise<PostEntity[]>; 
}

export class PostBusConc implements PostBus {
  private db: PostDal;
  constructor(db: PostDal){
    this.db = db; 
}
async advanceSearch(title: string , isVisible:boolean): Promise<PostEntity[]> {
  const p = await this.db.advanceSearch(title,isVisible);     
  return p;   
}


async insertOne(post: PostEntity): Promise<boolean> {
  const p = await this.db.insertOne(post);     
  return p;        
}
async search(title: string, page: number): Promise<PostEntity[]> {
  let rslt;
  rslt = await this.db.search(title,page)
  return rslt;
}
async find(page: number): Promise<PostEntity[]> {
  let rslt;
    rslt = await this.db.find(page);
  return rslt;
}

async findOne(id: string): Promise<PostEntity> {
  const db = new PostDalConc();
  const rslt = await db.findOne(id);
  return rslt;
}

async updateOne(id: string, post: PostEntity): Promise<boolean> {
  const p = await this.db.updateOne(id,post);     
  return p;
}

async deleteOne(id: string): Promise<boolean> {
  const p = await this.db.deleteOne(id);     
  return p;
}

}
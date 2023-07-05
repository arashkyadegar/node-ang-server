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


async advanceSearch(title: string , isVisible: boolean , rate: number): Promise<PostEntity[]> {
  const result = await this.db.advanceSearch(title,isVisible,rate);     
  return result;   
}


async insertOne(post: PostEntity): Promise<boolean> {
  const result = await this.db.insertOne(post);     
  return result;        
}


async search(title: string, page: number): Promise<PostEntity[]> {
  const result  = await this.db.search(title,page)
  return result;
}


async find(page: number): Promise<PostEntity[]> {
  const result = await this.db.find(page);
  return result;
}


async findOne(id: string): Promise<PostEntity> {
  const result = await this.db.findOne(id);
  return result;
}


async updateOne(id: string, post: PostEntity): Promise<boolean> {
  const result = await this.db.updateOne(id,post);     
  return result;
}


async deleteOne(id: string): Promise<boolean> {
  const result = await this.db.deleteOne(id);     
  return result;
}

}
import {IBlog,BlogEntity} from './blogEntity';
import {validate} from 'class-validator';
import { rejects } from 'assert';
import { BlogDalConc,BlogDal } from './blogDal';
import {UserEntity} from '../user/userEntity';
import { PostEntity } from '../post/postEntity';
import mongoose from 'mongoose';
export interface BlogBus {
    insertOne(blog:BlogEntity):Promise<boolean>; // returns true if insert is succefull otherwise false.
    find(): Promise<BlogEntity[]>; // returns Array of objects.
    findOne(id:string):Promise<BlogEntity>; //returns found object.
    updateOne(id:string,b:BlogEntity):Promise<boolean>;  //returns true if update is succefull otherwise false.
    deleteOne(id:string):Promise<BlogEntity>; //returns true if delete is successful othewise false.
}

export class BlogBusConc implements BlogBus {
  private db:BlogDal;
  constructor(db:BlogDal){
    this.db=db;
  }

// async test(bid:string,pid:string,p:PostEntity):Promise<boolean>{
//   var _= require('lodash');
//   let blog=await this.findOne(bid);

//   var ObjectId =new mongoose.Types.ObjectId(pid);
//   var index = _.findIndex(blog.posts, {"_id": ObjectId});
//   blog.posts.splice(index, 1,p);
//   const rslt=this.db.updateOne(blog);
//   return rslt;

// }
  async findOneAndAddNewPosts(tmp_bid:string, posts:Array<PostEntity>):Promise<boolean> {
    const rslt=await this.db.findOneAndAddNewPosts(tmp_bid,posts);
    return rslt;
  }
  // async findPostsById(tmp_bid,tmp_pid):Promise<PostEntity>{
  //   var ObjectId =new mongoose.Types.ObjectId(tmp_pid);
  //   var _= require('lodash');
  //   const  posts=await this.findPosts(tmp_bid);
  //   const rslt=_.find(posts,{'_id':ObjectId})
  // return rslt;
  // }
    async findPosts(tmp_bid:string):Promise<PostEntity[]>{
      const blogs=await this.findOne(tmp_bid);
      return blogs.posts;
    }
 async findOneAndUpdateAuthor(tmp_bid: string,u:UserEntity): Promise<boolean> {
    const rslt=await this.db.findOneAndUpdateAuthor(tmp_bid,u);
    return rslt;
  }
   async insertOne( blog: BlogEntity): Promise<boolean> {
                    const rslt=await this.db.insertOne(blog);
                    return rslt;
    }

   async find(): Promise<BlogEntity[]>{
        const rslt = await this.db.find();
        return rslt;
    }

  async  findOne(id: string): Promise<BlogEntity> {
       // var _array = require('lodash/array');
        const rslt=await this.db.findOne(id);
        return  rslt;
    }

    async updateOne(id: string, blog: BlogEntity): Promise<boolean> {
        let validation_rslt=false;
        const db=new BlogDalConc();
        // check class validation
            const p=await validate(blog);
            console.log(p);
            if(p.length >0 ){
              return false;
            }else{
              const rslt=await db.updateOne(id,blog);
              return true;
            }
       
         
    }
   async deleteOne(id: string): Promise<BlogEntity> {
        const db=new BlogDalConc();
        //const p=await validate(blog);
        const rslt=await db.deleteOne(id);
        return rslt;
    }
}
import {
    validate,
    validateOrReject,
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
    min,
    MAX,
  } from 'class-validator';
  import mongoose from 'mongoose';
import { IPost, PostEntity } from '../post/postEntity';
import { IUser, UserEntity } from '../user/userEntity';

  export interface IBlog {
         _id:mongoose.Types.ObjectId;
        title:string;
        author:IUser;
        // body:string;
        // rate:number;
        // posts:Array<IPost>;
  }

export class BlogEntity implements IBlog {
    _id!: mongoose.Types.ObjectId;
    title: string="";
    // body: string="";
    // rate: number=0;
    author=new UserEntity();
    // posts:Array<PostEntity>=[];

    // constructor(){
    // this.author=new UserEntity();
    // }
    public get getId():mongoose.Types.ObjectId{
        return this._id;
    }
    public set setId(value) {
        this._id=value;
    }

    // public get getPosts():Array<IPost>{
    //     return this.posts;
    // }
    // public set setPosts(value) {
    //     this.posts.push(value);
    // }

    public get getTitle():string{
        return this.title;
    }
    public set setTitle(value) {
        this.title=value;
    }

    // public get getBody():string{
    //     return this.body;
    // }
    // public set setBody(value) {
    //     this.body=value;
    // }

    // public get getRate():number{
    //     return this.rate;
    // }
    // public set setRate(value) {
    //     this.rate=value;
    // }

    public get getAuthor():IUser{
        return this.author;
    }
    public set setAuthor(value) {
        this.author=value;
    }
    // addToPost(p:PostEntity):void {
    //     this.posts.push(p);
    // }
}


module.exports={
    BlogEntity
}
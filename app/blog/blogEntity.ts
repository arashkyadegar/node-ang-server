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
import { IPost } from '../post/postEntity';

  export interface IBlog {
        id:number;
        blogTitle:string;
        blogText:string;
        rate:number;
        user:number;
        posts:Array<IPost>;
  }

export class BlogEntity implements IBlog {
    id: number=0;;
    @Length(3,10)
    blogTitle: string="";
    blogText: string="";
    rate: number=0;
    user: number=0;
    posts:Array<IPost>=[];
    public get getId():number{
        return this.id;
    }
    public set setId(value) {
        this.id=value;
    }

    public get getPosts():Array<IPost>{
        return this.posts;
    }
    public set setPosts(value) {
        this.posts=value;
    }

    public get getBlogTitle():string{
        return this.blogTitle;
    }
    public set setBlogTitle(value) {
        this.blogTitle=value;
    }

    public get getBlogText():string{
        return this.blogText;
    }
    public set setBlogText(value) {
        this.blogText=value;
    }

    public get getRate():number{
        return this.rate;
    }
    public set setRate(value) {
        this.rate=value;
    }

    public get getUser():number{
        return this.user;
    }
    public set setUser(value) {
        this.user=value;
    }
}


module.exports={
    BlogEntity
}
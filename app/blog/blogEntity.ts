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
import { CommentEntity, IComment } from '../comment/commentEntity';

  export abstract class IBlog {
         _id!: mongoose.Types.ObjectId;
        title!: string;
        author!: IUser;
        date!: Date;
        body!: string;
        rate!: number;
        posts!: Array<IPost>;
  }
export class BlogEntitySrchResponse {
    items = new Array<BlogEntity>();
    itemsCount=0;
}
export class BlogEntity extends IBlog {
}

module.exports={
    BlogEntity,
    BlogEntitySrchResponse
}
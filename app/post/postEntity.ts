
import { UserEntitySchema } from "../user/userEntity";
import { DocumentEntity, IDocument } from "../document/documentEntity";
import { IUser } from "../user/userEntity";
import mongoose from "mongoose";
import { CommentEntity } from "../comment/commentEntity";


var Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);


export abstract class IPost {
  _id!: mongoose.Types.ObjectId;
  author!:IUser;
  title!: string;
  body!:string;
  rate!:number;
  img!:string;
  date!: Date;
  isVisible!: boolean;
  documents!: Array<DocumentEntity>;
  tags = [];
  links = [];
  comments!: Array<CommentEntity>;
}


export const PostEntitySchema = Joi.object({
  _id:Joi.required(false),
  author:{
    _id :Joi.required(false),
    name:Joi.required(false),
  },
  title:Joi.string().min(3).max(20),
  body:Joi.string().min(3).max(100),
  rate:Joi.number().min(0).max(5),
  img:Joi.string(),
  date:Joi.date(),
  tags:Joi.required(false),
  links:Joi.required(false),
  comments:Joi.required(false
  ),
  documents:Joi.array().items(
    {
      id:Joi.string(),
      title:Joi.string(),
      url:Joi.string(),
      category:Joi.number()
    }
  ),
  isVisible:Joi.boolean()
  });


export class PostEntity extends IPost {
}



module.exports={
  PostEntity,
  PostEntitySchema
}
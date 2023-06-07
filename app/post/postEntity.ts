
import { UserEntitySchema } from "../user/userEntity";
import { DocumentEntity, IDocument } from "../document/documentEntity";
import { IUser } from "../user/userEntity";

var Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

export abstract class IPost {
    id!:string;
    author!:IUser;
    title!: string;
    body!:string;
    rate!:number;
    img!:string;
    date!: Date;
    isVisible!: boolean;
    documents!: Array<DocumentEntity>;
    // comments!: Array<CommentEntity>;
}
export const PostEntitySchema = Joi.object({
    author:{
        _id :Joi.string(),
        name:Joi.required(false),
    },
    title:Joi.string().min(3).max(20),
    body:Joi.string().min(3).max(100),
    rate:Joi.number().min(1).max(5),
    img:Joi.string(),
    date:Joi.date(),
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
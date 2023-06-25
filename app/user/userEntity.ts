import Joi from 'joi';
import mongoose from 'mongoose';

export interface  IUser {
    _id:mongoose.Types.ObjectId;
    name:string;
    password:string;
    token:string;
    remember:boolean;
}

export class UserEntity implements IUser {
    _id:any;
    name:string="";
    password:string="";
    token:string="";
    remember:boolean=false;
}

export const UserEntitySchema = Joi.object({
    name:Joi.string().min(3).max(10),
    password:Joi.string().min(5),
});

module.exports={
    UserEntity,
    UserEntitySchema
}
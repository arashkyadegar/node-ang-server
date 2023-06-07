import Joi from 'joi';
import mongoose from 'mongoose';

export interface  IUser {
    _id:string;
    name:string;
}

export class UserEntity implements IUser {
    _id: string="";
    name:string="";
}

export const UserEntitySchema = Joi.object({
    name:Joi.string().min(3).max(10)
});

module.exports={
    UserEntity,
    UserEntitySchema
}
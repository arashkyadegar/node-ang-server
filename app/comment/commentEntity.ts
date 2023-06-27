
var Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
export interface IComment {
    _id: string;
    user: string;
    text: string;
    rate: number;
    isVisible: boolean;
    date: string;
}

export class CommentEntity implements IComment{
    _id: string = "";
    user: string = "";
    text: string = "";
    rate: number = 0;
    isVisible: boolean = false;
    date: string = "";
}

export const CommentEntitySchema = Joi.object({
    _id: Joi.string(),
    user: Joi.string(),
    text: Joi.string().min(3).max(100),
    rate: Joi.number().min(0).max(5),
    isVisible: Joi.boolean(),
    date: Joi.date()
    });
module.exports = {
    CommentEntity,
    CommentEntitySchema
}
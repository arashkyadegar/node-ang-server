import mongoose from 'mongoose';
const { Schema } = mongoose;
import {postSchema} from '../post/postSchema';
import { ObjectId } from 'mongodb';

export const blogSchema = new Schema({
    title: String ,
      author : {
        _id:ObjectId,
        name:String
      },
     body: String,
     rate:Number,
     date:Date,
     posts:[postSchema]
});

module.exports = mongoose.model('blogs', blogSchema);
//module.exports.blogs = mongoose.model('blogs', blogSchema);
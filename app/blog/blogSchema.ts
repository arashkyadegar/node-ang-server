import mongoose from 'mongoose';
const { Schema } = mongoose;
import {postSchema} from '../post/postSchema';
import { ObjectId } from 'mongodb';
import { commentSchema } from '../comment/commentSchema';

export const blogSchema = new Schema({
  _id:ObjectId,
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

//module.exports.Blogs = mongoose.model('blogs');
module.exports = mongoose.model('blogs', blogSchema);
//module.exports.blogs = mongoose.model('blogs', blogSchema);
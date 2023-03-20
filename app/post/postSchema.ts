import mongoose from 'mongoose';
const { Schema } = mongoose;

import { commentSchema } from '../comment/commentSchema';
import { documentSchema } from '../document/documentSchema';
export const postSchema = new Schema({
    title: String,
    text: String,
  /*  rate: Number,
    user: Number,
    img: String,
    date:String,
    isVisible: Boolean,
    comments: [commentSchema],
    documents: [documentSchema]*/
});

module.exports.posts = mongoose.model('posts', postSchema);
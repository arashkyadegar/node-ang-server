import mongoose from 'mongoose';
const { Schema } = mongoose;

import { commentSchema } from '../comment/commentSchema';
import { documentSchema } from '../document/documentSchema';
export const postSchema = new Schema({
    title: String,
    text: String,
    rate: Number,
    img: String,
    date:Date,
    isVisible: Boolean
  // documents: [documentSchema],
  // comments: [commentSchema]
     /* user: Number,
,*/
});
//module.exports = mongoose.model('posts', postSchema);
module.exports.posts = mongoose.model('posts', postSchema);
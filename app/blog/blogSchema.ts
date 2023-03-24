import mongoose from 'mongoose';
const { Schema } = mongoose;
import {userSchema} from '../user/userSchema';
import {postSchema} from '../post/postSchema';
export const blogSchema = new Schema({
    title: String, // String is shorthand for {type: String}
    author:[userSchema],
    body: String,
    posts:[postSchema],
    rate:Number
});

module.exports = mongoose.model('blogs', blogSchema);
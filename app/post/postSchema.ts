import mongoose from 'mongoose';
const { Schema } = mongoose;


import { commentSchema } from '../comment/commentSchema';
import { documentSchema } from '../document/documentSchema';
export const postSchema = new Schema({
    title: String,
    body: String,
    rate: Number,
    img: String,
    date:Date,
    isVisible: Boolean,
    documents: [documentSchema],
    comments: [commentSchema]
});


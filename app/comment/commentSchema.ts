import mongoose from 'mongoose';
const { Schema } = mongoose;

export const commentSchema = new Schema({
    user:Number,
    text:String,
    rate:Number,
    isVisible:Boolean,
    date:String
});

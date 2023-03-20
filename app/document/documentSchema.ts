import mongoose from 'mongoose';
const { Schema } = mongoose;

export const documentSchema = new Schema({
    title:String,
    url:String,
    category:Number,
});

module.exports.documents = mongoose.model('documents', documentSchema);
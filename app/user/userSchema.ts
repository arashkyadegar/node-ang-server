import mongoose from 'mongoose';
const { Schema } = mongoose;


export const userSchema = new Schema({
        name:String
});

module.exports.users = mongoose.model('users', userSchema);
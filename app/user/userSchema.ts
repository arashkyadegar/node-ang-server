import mongoose from 'mongoose';
const { Schema } = mongoose;


export const userSchema = new Schema({
        name:String
});
//module.exports = mongoose.model('users', userSchema);
module.exports.users = mongoose.model('users', userSchema);
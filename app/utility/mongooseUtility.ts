import mongoose from 'mongoose';
export  class  mongUtility {
    static getObjectId(id:string):mongoose.Types.ObjectId {
        var ObjectId =new mongoose.Types.ObjectId(id);
        return ObjectId;
    }
}
import mongoose from "mongoose";

export interface IUser {
     _id:mongoose.Types.ObjectId;
    name:string;
}
export class UserEntity implements IUser {
    _id!:mongoose.Types.ObjectId;
    name: string="";


    public get getId():mongoose.Types.ObjectId{
        return this._id;
    }
    public set setId(value) {
        this._id=value;
    }

    public get getName():string{
        return this.name;
    }
    public set setName(value) {
        this.name=value;
    }
}


module.exports={
    UserEntity
}
import { ObjectId } from "mongodb";
import { IPost, PostEntity } from "../post/postEntity";

export interface IDocument {
    _id:string;
    title:string;
    url:string;
    category:number;

}
export class DocumentEntity implements IDocument {
    constructor(){
            this._id=(Math.random() * (1 - 100) +1).toString();
    }
_id:string;
    title: string="";
    url: string="";
    category: number=0;
}

module.exports={
    DocumentEntity
}
import { ObjectId } from "mongodb";
import { IPost, PostEntity } from "../post/postEntity";

export interface IDocument {

    title:string;
    url:string;
    category:number;

}
export class DocumentEntity implements IDocument {
    title: string="";
    url: string="";
    category: number=0;
}

module.exports={
    DocumentEntity
}
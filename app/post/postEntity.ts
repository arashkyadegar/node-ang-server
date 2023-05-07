import { CommentEntity, IComment } from "../comment/commentEntity";
import { DocumentEntity, IDocument } from "../document/documentEntity";

export abstract class IPost {
    id!:number;
    title!:string;
    body!:string;
    rate!:number;
    img!:string;
    date!: string;
    isVisible!: boolean;
     documents!: Array<DocumentEntity> ;
     comments!: Array<CommentEntity>;
    /*user:number;*/
}

export class PostEntity extends IPost {
}

module.exports={
    PostEntity
}
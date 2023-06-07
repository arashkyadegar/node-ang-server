export interface IComment {
    id:number;
    user:number;
    text:string;
    rate:number;
    isVisible:boolean;
    date:string;
}

export class CommentEntity implements IComment{
    id: number=0;
    user: number=0;
    text: string="";
    rate: number=0;
    isVisible: boolean=false;
    date:string="";
}

module.exports={
    CommentEntity
}
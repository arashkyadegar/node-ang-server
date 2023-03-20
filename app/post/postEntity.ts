import { CommentEntity, IComment } from "../comment/commentEntity";
import { DocumentEntity, IDocument } from "../document/documentEntity";

export interface IPost {
    id:number;
    title:string;
    text:string;
    /*rate:number;
    user:number;
    img:string;
    date:string;
    isVisible:boolean;
    comments:Array<CommentEntity>;
    documents:Array<DocumentEntity>;*/
}

export class PostEntity implements IPost {
    id: number=0;
    title: string;
    text: string;
   /* rate: number=0;
    user: number=0;
    img: string="";
    date:string="";
    isVisible: boolean=false;
    comments:new CommentEntity[]=[];
    documents: IDocument[]=[];*/
constructor(ti:string,te:string){
    this.text=te;
    this.title=ti;
}
    public get getId():number{
        return this.id;
    }
    public set setId(value) {
        this.id=value;
    }
    public get getTitle():string{
        return this.title;
    }
    public set setTitle(value) {
        this.title=value;
    }

    public get getText():string{
        return this.text;
    }
    public set setText(value) {
        this.text=value;
    }

  /*  public get getRate():number{
        return this.rate;
    }
    public set setRate(value) {
        this.rate=value;
    }


    public get getUser():number{
        return this.user;
    }
    public set setUser(value) {
        this.user=value;
    }

    public get getImg():string{
        return this.img;
    }
    public set setImg(value) {
        this.img=value;
    }

    public get getDate():string{
        return this.date;
    }
    public set setDate(value) {
        this.date=value;
    }

    public get getIsVisible():boolean{
        return this.isVisible;
    }
    public set setIsVisible(value) {
        this.isVisible=value;
    }

    public get getComments():Array<IComment>{
        return this.comments;
    }
    public set setComments(value) {
        this.comments=value;
    }

    public get getDocuments():Array<IDocument>{
        return this.documents;
    }
    public set setDocuments(value) {
        this.documents=value;
    }*/
}

module.exports={
    PostEntity
}
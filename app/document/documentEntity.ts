import { IPost, PostEntity } from "../post/postEntity";

export interface IDocument {
    id:number;
    title:string;
    url:string;
    category:number;
    post:IPost;
}
export class DocumentEntity implements IDocument {
    id: number=0;
    title: string="";
    url: string="";
    category: number=0;
    post:IPost=new PostEntity();

    public get getId():number{
        return this.id;
    }
    public set setId(value) {
        this.id=value;
    }

    public get getPost():IPost{
        return this.post;
    }
    public set setPost(value) {
        this.post=value;
    }


    public get getTitle():string{
        return this.title;
    }
    public set setTitle(value) {
        this.title=value;
    }

    public get getUrl():string{
        return this.url;
    }
    public set setUrl(value) {
        this.url=value;
    }

    public get getCategory():number{
        return this.category;
    }
    public set setCategory(value) {
        this.category=value;
    }
}

module.exports={
    DocumentEntity
}
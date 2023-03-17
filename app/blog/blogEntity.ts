export abstract class AbsBlog {
   private id:number;
   private blogTitle:string;
   private blogText:string;
   private rate:number;
   private user:number;
        constructor(id:number,blogTitle:string,blogtext:string,rate:number,user:number){
            this.id=id;
            this.blogTitle=blogTitle;
            this.blogText=blogtext;
            this.rate=rate;
            this.user=user;
        } 
    public get getId():number{
        return this.id;
    }
    public set setId(value) {
        this.id=value;
    }

    public get getBlogTitle():string{
        return this.blogTitle;
    }
    public set setBlogTitle(value) {
        this.blogTitle=value;
    }

    public get setBlogText():string{
        return this.blogText;
    }
    public set getBlogText(value) {
        this.blogText=value;
    }

    public get getRate():number{
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
}

export class BlogEntityNull extends AbsBlog {
    constructor(){
        super(0,"empty","empty",0,0);
    }
}

export class BlogEntity extends AbsBlog {
    constructor(id:number,blogTitle:string,blogtext:string,rate:number,user:number){
        super(id,blogTitle,blogtext,rate,user);
    }
}
module.exports={
    AbsBlog,
    BlogEntityNull,
    BlogEntity
}
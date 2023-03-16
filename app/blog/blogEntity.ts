abstract class AbBlog {
   private _id:number;
   private _blogTitle:string;
   private _blogText:string;
   private  _rate:number;
   private  _user:number;
        constructor(id:number,blogTitle:string,blogtext:string,rate:number,user:number){
            this._id=id;
            this._blogTitle=blogTitle;
            this._blogText=blogtext;
            this._rate=rate;
            this._user=user;
        }
            
    public get id():number{
        return this.id;
    }
    public set id(value) {
        this.id=value;
    }

    public get blogTitle():string{
        return this._blogTitle;
    }
    public set blogTitle(value) {
        this._blogTitle=value;
    }

    public get blogText():string{
        return this._blogText;
    }
    public set blogText(value) {
        this._blogText=value;
    }

    public get rate():number{
        return this._rate;
    }
    public set rate(value) {
        this._rate=value;
    }

    public get user():number{
        return this._user;
    }
    public set user(value) {
        this._user=value;
    }
}

class BlogEntityNull extends AbBlog {
    constructor(){
        super(0,"empty","empty",0,0);
    }

}

class BlogEntity extends AbBlog {
    constructor(id:number,blogTitle:string,blogtext:string,rate:number,user:number){
        super(id,blogTitle,blogtext,rate,user);
    }

}

module.exports={
    AbBlog,
    BlogEntityNull,
    BlogEntity
}
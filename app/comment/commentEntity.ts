export interface IComment {
    id:number;
    user:number;
    text:string;
    rate:number;
    isVisible:boolean;
    date:Date;
}

export class CommentEntity implements IComment{
    id: number=0;
    user: number=0;
    text: string="";
    rate: number=0;
    isVisible: boolean=false;
    date= new Date();


    public get getText():string{
        return this.text;
    }
    public set setText(value) {
        this.text=value;
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
    
    public get getDate():Date{
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
}


module.exports={
    CommentEntity
}
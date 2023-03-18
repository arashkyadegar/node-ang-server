export interface IUser {
    id:number;
    name:string;
}
export class UserEntity implements IUser {
    id: number=0;
    name: string="";


    public get getId():number{
        return this.id;
    }
    public set setId(value) {
        this.id=value;
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
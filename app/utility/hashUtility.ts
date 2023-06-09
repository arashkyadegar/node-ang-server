import bcrypt from "bcrypt";

export class HashPassword {
   async createHash(str:string):Promise<string> {
        let rslt;
        const saltRounds = 10
        rslt= await bcrypt.hash(str,saltRounds);
        return rslt;
    }
   async  validateUser(password:string,hash:string):Promise<string> {
        let rslt;
        rslt = await  bcrypt.compare(password, hash);
        return rslt;      
    }
}

module.exports={
    HashPassword
}
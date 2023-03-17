import {AbsBlog,BlogEntity} from './blogEntity'
export interface BlogBus {
    insertOne(b:BlogEntity):BlogEntity; // returns created object.
    find():Array<BlogEntity>; // returns Array of objects.
    findOne(id:number):BlogEntity; //returns found object.
    updateOne(id:number,b:BlogEntity):boolean; //returns updated object.
    deleteOne(id:number):boolean; //returns true if operation was successful othewise false.
}

export class BlogBusConc implements BlogBus {
    insertOne(b: BlogEntity): BlogEntity {
        throw new Error('Method not implemented.');
    }
    find(): BlogEntity[] {
        throw new Error('Method not implemented.');
    }
    findOne(id: number): BlogEntity {
        throw new Error('Method not implemented.');
    }
    updateOne(id: number, b: BlogEntity): boolean {
        throw new Error('Method not implemented.');
    }
    deleteOne(id: number): boolean {
        throw new Error('Method not implemented.');
    }
}
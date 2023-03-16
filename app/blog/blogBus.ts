import {AbsBlog,BlogEntity} from './blogEntity'
export interface BlogBus {
    insertOne(b:BlogEntity):BlogEntity; // returns created object.
    find():Array<BlogEntity>; // returns Array of objects.
    findOne(id:number):BlogEntity; //returns found object.
    updateOne(id:number,b:BlogEntity):boolean; //returns updated object.
    deleteOne(id:number):void;
}
import express from 'express';
import { PostDalConc } from './postDal';
import {MongoDb} from '../config/mongodb'
import { PostEntity } from './postEntity';
import assert from 'assert';
const { MongoClient } = require('mongodb');
import { takeWhile, Observable, of, map, fromEvent, take, first } from 'rxjs';
export const PostRouter=express.Router();

            PostRouter.get("/:pid",async function(req,res){
                //should add validation for params._id throw new BSONError
                const bus=new PostDalConc();
                let tmp_id=req.params.pid;
                const rslt =await bus.findOne(tmp_id);
                res.statusCode=200;
                res.send(rslt);
            });

            PostRouter.post("/",async function(req,res){
            //     const MongoClient = require('mongodb').MongoClient;
            //    await dbconnect();
            //     async function dbconnect() {
            //     console.log("This will print.");
            //     const client = await MongoClient.connect(
            //         'mongodb://127.0.0.1:27017');
            //         const x =client.db('blogdb').collection('blogs');
            //         const first = await x.findOne();
            //         //console.log(first);
            //         res.send(first);
            //         client.close(); //call this when you are done.
         
            //     };
            const client =new MongoDb();
            //   await client.then(async (db:any) => {
            //         const first =await db.collection('blogs').findOne();
            //         res.send(first);
            //     })
            });

            PostRouter.put("/", function(req,res){
                res.send('vvvv');

            });

            PostRouter.delete("/:pid",async function(req,res){
                const bus=new PostDalConc();
                let tmp_id=req.params.pid;
                bus.deleteOne(tmp_id);
                res.statusCode=200;
                res.send('ok');

            });
    
                    
        module.exports=PostRouter;

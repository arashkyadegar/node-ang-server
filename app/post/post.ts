import express from 'express';
import { PostDalConc } from './postDal';
import { PostEntity } from './postEntity';

export const PostRouter=express.Router();

            PostRouter.get("/:pid",async function(req,res){
                //should add validation for params._id throw new BSONError
                const bus=new PostDalConc();
                let tmp_id=req.params.pid;
                const rslt =await bus.findOne(tmp_id);
                res.statusCode=200;
                res.send(rslt);
            });

            PostRouter.post("/", function(req,res){
                res.send('cccc');

            });

            PostRouter.put("/", function(req,res){
                res.send('vvvv');

            });

            PostRouter.delete("/:pid", function(req,res){
                res.send('ddddd');

            });
    
                    
        module.exports=PostRouter;

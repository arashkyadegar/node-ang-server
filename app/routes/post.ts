import express from 'express';

export const PostRouter=express.Router();
        PostRouter.get("/",async function(req,res){

            res.send({name:'post'});
    });
                    
        module.exports=PostRouter;

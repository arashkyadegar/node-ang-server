import express from 'express';

export const BlogRouter=express.Router();
        BlogRouter.get("/",async function(req,res){

            res.send({name:'blog'});
    });
            
module.exports=BlogRouter;

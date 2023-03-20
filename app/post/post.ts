import express from 'express';

export const PostRouter=express.Router();


            PostRouter.get("/:pid", function(req,res){
      

                res.send(req.params);
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

import express from 'express';

export const PostRouter=express.Router();
            PostRouter.get("/",async function(req,res){
                res.send({name:'posts get  getList'});

            });

            PostRouter.post("/",async function(req,res){
                res.send({name:'posts post create a blog'});

            });

            PostRouter.put("/",async function(req,res){
                res.send({name:'posts put update a blog'});

            });

            PostRouter.delete("/",async function(req,res){
                res.send({name:'posts delete delete a blog'});

            });
    
                    
        module.exports=PostRouter;

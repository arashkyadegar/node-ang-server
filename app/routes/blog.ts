import express from 'express';

export const BlogRouter=express.Router();
        BlogRouter.get("/",async function(req,res){
            res.send({name:'blog get  getList'});

        });

        BlogRouter.post("/",async function(req,res){
            res.send({name:'blog post create a blog'});

        });

        BlogRouter.put("/",async function(req,res){
            res.send({name:'blog put update a blog'});

        });

        BlogRouter.delete("/",async function(req,res){
            res.send({name:'blog delete delete a blog'});

        });
            
module.exports=BlogRouter;
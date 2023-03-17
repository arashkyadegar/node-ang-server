import {
    validate
  } from 'class-validator';
import express from 'express';
import {BlogEntityNull} from './blogEntity'
export const BlogRouter=express.Router();
        BlogRouter.get("/",async function(req,res){
            let b=new BlogEntityNull()
            b.setBlogTitle="arashk";
            validate(b).then(errors => {
                // errors is an array of validation errors
                if (errors.length > 0) {
                  console.log('validation failed. errors: ', errors);
                } else {
                  console.log('validation succeed');
                }
              });


            res.send(b);
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

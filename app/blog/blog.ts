import {validate,IsInt, isInt} from 'class-validator';
import express, { query } from 'express';
import { BlogBusConc } from './blogBus';
import {BlogEntity,IBlog} from './blogEntity';

export const BlogRouter=express.Router();
        BlogRouter.get("/",async function(req,res){
            res.send([
              new BlogEntity(),
              new BlogEntity(),
              new BlogEntity()
            ])
        });

        BlogRouter.post("/",function(req,res){
          let tmp_blog=new BlogEntity();

          //check if query params aren't undefined
          if(req.query.blogTitle !=undefined) {
            tmp_blog.setBlogTitle=req.query.blogTitle;
          }
          if(req.query.blogText !=undefined) {
            tmp_blog.setBlogText=req.query.blogText;
          }
          if(req.query.rate !=undefined) {
            tmp_blog.setRate=req.query.rate;
          }
          if(req.query.user !=undefined) {
            tmp_blog.setUser=req.query.user;
          }

          // check class validation
          validate(tmp_blog).then(errors => {
            // errors is an array of validation errors
            if (errors.length > 0) {
              res.statusCode=400;
              res.send({'validation failed. errors: ': errors});
            } else {
              res.statusCode=200;
              res.send(tmp_blog)
            }

          });
        });

        BlogRouter.put("/",async function(req,res){
          let tmp_blog=new BlogEntity();

          //check if query params aren't undefined
          if(req.query.blogTitle !=undefined) {
            tmp_blog.setBlogTitle=req.query.blogTitle;
          }
          if(req.query.blogText !=undefined) {
            tmp_blog.setBlogText=req.query.blogText;
          }
          if(req.query.rate !=undefined) {
            tmp_blog.setRate=req.query.rate;
          }
          if(req.query.user !=undefined) {
            tmp_blog.setUser=req.query.user;
          }

          // check class validation
          validate(tmp_blog).then(errors => {
            // errors is an array of validation errors
            if (errors.length > 0) {
              res.statusCode=400;
              res.send({'validation failed. errors: ': errors});
            } else {
              res.statusCode=200;
              res.send(tmp_blog)
            }
          });

        });

        BlogRouter.delete("/:id",async function(req,res){
              // check if req.params is digit or not
              if(!!parseInt(req.params.id)) {
                res.statusCode=400;
                res.send({'validation failed. errors: ':' bad params'});                  
              }else{
                const tmp_id=parseInt(req.params.id);
                res.send({tmp_id});
              }
        });
            
module.exports=BlogRouter;

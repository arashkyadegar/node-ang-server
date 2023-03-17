
import express, { query } from 'express';
import { BlogBusConc } from './blogBus';
import {BlogEntity,IBlog} from './blogEntity';
import {validate} from 'class-validator';
export const BlogRouter=express.Router();
        BlogRouter.get("/",async function(req,res){
          const bus=new BlogBusConc();
          let rslt =bus.find();
          res.statusCode=200;
          res.send(rslt);
        });

        BlogRouter.post("/",async function(req,res){
          let tmp_blog=new BlogEntity();
          const bus=new BlogBusConc();
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


            let rslt= await bus.insertOne(tmp_blog);
            if(!rslt){
                res.statusCode=400;
                res.send({'error' : 'server error.'});
            }
            else{
                res.statusCode=200;
                res.send(tmp_blog)
            }

        });

        BlogRouter.put("/:id",async function(req,res){
          let tmp_blog=new BlogEntity();
          let tmp_id=0;
          const bus=new BlogBusConc();

              // check if id route param is digit or not
              if(!parseInt(req.params.id)) {
                res.statusCode=400;
                res.send({'failed : ':' bad params'});                  
              }else{
                      tmp_id=parseInt(req.params.id);
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
                        
                      let rslt= await bus.updateOne(tmp_id,tmp_blog);

                      if(!rslt){
                          res.statusCode=400;
                          res.send({'error' : 'server error.'});
                      }
                      else{
                          res.statusCode=200;
                          res.send(tmp_blog)
                      }
              }
        });

        BlogRouter.delete("/:id",async function(req,res){
              // check if req.params is digit or not
              if(!parseInt(req.params.id)) {
                res.statusCode=400;
                res.send({'validation failed. errors: ':' bad params'});                  
              }else{
                const tmp_id=parseInt(req.params.id);
                res.send({tmp_id});
              }
        });
            
module.exports=BlogRouter;

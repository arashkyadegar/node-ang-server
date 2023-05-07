import express, { query } from 'express';
import { BlogBusConc } from './blogBus';
import {BlogEntity,IBlog} from './blogEntity';
import { UserEntity } from '../user/userEntity';
import {PostEntity} from '../post/postEntity';
import { BlogDalConc } from './blogDal';
import mongoose from 'mongoose';
export const BlogRouter=express.Router();
        const blog_bus=new BlogBusConc(new BlogDalConc());

        BlogRouter.put("/:bid/author/",async function(req,res){
          if(!parseInt(req.params.bid)) {
            res.statusCode=400;
            res.send({'failed : ':' bad params'});    
          }else{
            const tmp_author=<UserEntity> req.body.author;
            const tmp_bid=req.params.bid;
          //  tmp_author.name=req.body.name;
            const rslt =await blog_bus.findOneAndUpdateAuthor(tmp_bid,tmp_author);
            res.send({rslt});
          }
        });

        // BlogRouter.put("/:bid/posts/:pid",async function(req,res){
        //   if(!parseInt(req.params.bid) || !parseInt(req.params.pid)) {
        //     res.statusCode=400;
        //     res.send({'failed : ':' bad params'});    
        //   }else{  
        //     let pid=req.params.pid;
        //     let bid=req.params.bid;
        //     const tmp_post=<PostEntity> req.body.posts;
        //     const rslt =await blog_bus.test(bid,pid,tmp_post);
        //     res.send(rslt);
        //   }
        // });
        BlogRouter.post("/:bid/posts/:pid",async function(req,res){
          if(!parseInt(req.params.bid) || !parseInt(req.params.pid)) {
            res.statusCode=400;
            res.send({'failed : ':' bad params'});    
          }else{  
            let tmp_posts=<Array<PostEntity>> req.body.posts;
            const rslt =await blog_bus.findOneAndAddNewPosts(req.params.bid,tmp_posts);
            res.send({rslt});
          }
        });

        BlogRouter.get("/:bid/posts/",async function(req,res){
          if(!parseInt(req.params.bid)) {
            res.statusCode=400;
            res.send({'failed : ':' bad params'});    
          }else{  
            const tmp_bid=req.params.bid;
            const rslt =await blog_bus.findPosts(tmp_bid);
            res.send(rslt);
          }
        });

        // BlogRouter.get("/:bid/posts/:pid",async function(req,res){
        //   if(!parseInt(req.params.bid) || !parseInt(req.params.pid)) {
        //     res.statusCode=400;
        //     res.send({'failed : ':' bad params'});    
        //   }else{  
        //     const tmp_pid=req.params.pid;
        //     const tmp_bid=req.params.bid;
        //     const rslt =await blog_bus.findPostsById(tmp_bid,tmp_pid);
        //     res.send({rslt});
        //   }
        // });

       BlogRouter.get("/",async function(req,res){
          let rslt = await blog_bus.find();
          res.statusCode=200;
          res.send(rslt);
          return("ok");
        });

        BlogRouter.get("/:bid",async function(req,res){
          //should add validation for _id throw new BSONError
            let rslt=new BlogEntity();
            let tmp_id=req.params.bid;
            rslt =await blog_bus.findOne(tmp_id);
            console.log(rslt)
            res.statusCode=200;
            res.send(rslt);
        });

        BlogRouter.post("/",async function(req,res){
           const tmp_blog=<BlogEntity> req.body;
           tmp_blog._id =new mongoose.Types.ObjectId();
           tmp_blog.author._id=new mongoose.Types.ObjectId();
           tmp_blog.date=new Date();
           tmp_blog.rate=1;
           let rslt= await blog_bus.insertOne(tmp_blog);
          //  console.log(rslt);
            if(!rslt){
                res.statusCode=400;
                res.send({'error' : 'server error.'});
            }
            else{
                res.statusCode=200;
                res.send(tmp_blog)
            }
        });

        BlogRouter.put("/:bid",async function(req,res){
          
              // check if id route param is digit or not
              if(!parseInt(req.params.bid)) {
                res.statusCode=400;
                res.send({'failed : ':' bad params'});                  
              }else{
                      //tmp_id=parseInt(req.params.bid);
                     let tmp_id=req.params.bid;
                      const tmp_blog=<BlogEntity> req.body;
                        
                      let rslt= await blog_bus.updateOne(tmp_id,tmp_blog);

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

        BlogRouter.delete("/:bid",async function(req,res){
              let rslt=new BlogEntity();
              let tmp_id=req.params.bid;
              rslt =await blog_bus.deleteOne(tmp_id);
              if(rslt){
                res.statusCode=200;
                res.send(rslt);
              }else{
                res.statusCode=404;
                res.send(rslt);
              }
        });
            
module.exports=BlogRouter;

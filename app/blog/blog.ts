
import express, { query } from 'express';
import { BlogBusConc } from './blogBus';
import {BlogEntity,IBlog} from './blogEntity';
import {validate} from 'class-validator';
import { UserEntity } from '../user/userEntity';
import {PostEntity} from '../post/postEntity';
import { CommentEntity } from '../comment/commentEntity';
import { DocumentEntity } from '../document/documentEntity';
export const BlogRouter=express.Router();


        BlogRouter.post("/:bid/posts/:pid",async function(req,res){
          /*const bus=new BlogBusConc();
        
            post.setText="p1";
            post.setTitle="p2";
          let tmp_pid=req.params.bid; //postid
          let tmp_bid=req.params.bid; //blogid
          const rslt =await bus.findOneAndAddPost(tmp_bid,post);
          res.send({rslt});*/
        });



       BlogRouter.get("/",async function(req,res){
          const bus=new BlogBusConc();
          let rslt = await bus.find();
          res.statusCode=200;
          res.send(rslt);
        });

        BlogRouter.get("/:bid",async function(req,res){
          const bus=new BlogBusConc();
            let rslt=new BlogEntity();
            let tmp_id=req.params.bid;
            rslt =await bus.findOne(tmp_id);
            res.statusCode=200;
            res.send(rslt);
        });
        BlogRouter.post("/",async function(req,res){
          let tmp_blog=new BlogEntity();
          const bus=new BlogBusConc();
          let author=new  UserEntity();
          let comment=new CommentEntity();
          let doc=new DocumentEntity();
      
            //check if query params aren't undefined
    

            author.setName=req.body.author.name;
            tmp_blog.setTitle=req.body.title;
            tmp_blog.setBody=req.body.body;
            tmp_blog.setRate=req.body.rate;
            tmp_blog.setAuthor=author;
            tmp_blog.setPosts=req.body.posts;


                  req.body.posts.forEach(element => {
                    tmp_blog.addToPost(new PostEntity(element.title,element.text));
                  });

            //tmp_blog.setPosts=post;

                  console.log( tmp_blog);
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

        BlogRouter.put("/:bid",async function(req,res){
          let tmp_blog=new BlogEntity();
          let tmp_id=0;
          const bus=new BlogBusConc();

              // check if id route param is digit or not
              if(!parseInt(req.params.bid)) {
                res.statusCode=400;
                res.send({'failed : ':' bad params'});                  
              }else{
                      tmp_id=parseInt(req.params.bid);
                         //check if query params aren't undefined
         /*             if(req.query.blogTitle !=undefined) {
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
                      }*/
                        
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

        BlogRouter.delete("/:bid",async function(req,res){
              const bus=new BlogBusConc();
              let rslt=new BlogEntity();
              let tmp_id=req.params.bid;
              rslt =await bus.deleteOne(tmp_id);
              if(rslt){
                res.statusCode=200;
                res.send(rslt);
              }else{
                res.statusCode=404;
                res.send(rslt);
              }
        });
            
module.exports=BlogRouter;

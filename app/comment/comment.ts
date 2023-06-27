import express from 'express';
import { CommentBusConc } from "./commentBus";
import { CommentDalConc } from "./commentDal";
import { CommentEntity,CommentEntitySchema } from "./commentEntity";

import validator from 'validator';
export const CommentRouter=express.Router();

const commentBus=new CommentBusConc(new CommentDalConc());

CommentRouter.post("/isVisible/:id/:cid/:isVisible",async function(req,res,next){
  let rslt; //result
  if(validator.isMongoId(req.params.id.toString())){
    const isVisible = (req.params.isVisible.toLowerCase()  === 'true' ? true : false);

    const commentId = req.params.cid;
    const postId = req.params.id.toString();
    rslt =await commentBus.updateCommentIsVisible(postId,commentId,isVisible);
  }

});

CommentRouter.post("/:id",async function(req,res,next){
  let rslt; //result
  if(validator.isMongoId(req.params.id.toString())){
    const postId = req.params.id.toString();
    const  commentEntity = req.body as CommentEntity;
    const { error } = CommentEntitySchema.validate(commentEntity);
    console.log(commentEntity)
    if(error){
    console.log(error);
      rslt =`validation failed. errors: ${error}` ;
      res.statusCode=400;
      res.send(rslt);
    }else{
      try{
          rslt =await commentBus.insertOne(postId,commentEntity);
          res.statusCode=200;
          res.send(rslt);
      }catch(e){
          next(e);
      }
    }
  }

});
module.exports = CommentRouter;
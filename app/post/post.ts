import express from 'express';
import validator from 'validator';
import { PostDalConc } from './postDal';
import { PostEntity, PostEntitySchema } from './postEntity';
import { takeWhile, Observable, of, map, fromEvent, take, from } from 'rxjs';
import { PostBusConc } from './postBus';

export const PostRouter=express.Router();
const postBus=new PostBusConc(new PostDalConc());
PostRouter.post("/",async function(req,res,next){
  let rslt; //result
  const  postEntity = req.body as PostEntity;
  const { error } = PostEntitySchema.validate(postEntity);
  console.log(postEntity)
  if(error){
  console.log(error);
    rslt =`validation failed. errors: ${error}` ;
    res.statusCode=400;
    res.send(rslt);
  }else{
    try{
        rslt =await postBus.insertOne(postEntity);
        res.statusCode=200;
        res.send(rslt);
    }catch(e){
        next(e);
    }
  }
});

PostRouter.get("/",async function(req,res){
  let pageNo=req.query.page!.toString();
  let title=req.query.title!.toString();
  console.log(`pageNo ${pageNo}`)
  const rslt=await postBus.find(title,parseInt(pageNo));
  res.send(rslt);
});


PostRouter.get("/:id",async function(req,res){ //post-id
  let rslt = new PostEntity();
  if(validator.isMongoId(req.params.id.toString())){
  let tmp_id = req.params.id;
  rslt = await postBus.findOne(tmp_id);
  }
  res.statusCode = 200;
  res.send(rslt);
});

PostRouter.post("/:id",async function(req,res,next){ //this must be put but due to cors ERROR I USED POST INSTEAD OF PUT
  const  postEntity = req.body as PostEntity;
  if(validator.isMongoId(req.params.id.toString())){
  let tmp_id  = req.params.id;
  let rslt; 
  const { error } = PostEntitySchema.validate(postEntity);
  if(error){
  rslt = `validation failed. errors: ${error}` ;
  res.statusCode = 400;
  res.send(rslt);
  }else{
  try{
  rslt = await postBus.updateOne(tmp_id,postEntity);
  res.statusCode = 200;
  res.send(rslt);
  }catch(e){
  next(e);
  }
  }
  }
});

PostRouter.delete("/:id",async function(req,res){
  let rslt; //result
  if(validator.isMongoId(req.params.id.toString())){
    let tmp_id = req.params.id;
    rslt = postBus.deleteOne(tmp_id);
  }
  res.statusCode = 200;
  res.send(rslt);
});

module.exports = PostRouter;

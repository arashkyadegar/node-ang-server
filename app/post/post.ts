import express from 'express';
import validator from 'validator';
import { PostDalConc } from './postDal';
import { PostEntity, PostEntitySchema } from './postEntity';
import { takeWhile, Observable, of, map, fromEvent, take, from } from 'rxjs';
import { PostBusConc } from './postBus';


export const PostRouter=express.Router();
const postBus=new PostBusConc(new PostDalConc());


PostRouter.post("/",async function(req,res,next){
  let result; 
  const  postEntity = req.body as PostEntity;
  const { error } = PostEntitySchema.validate(postEntity);
  if(error){
    result =`validation failed. errors: ${error}` ;
    res.statusCode=400;
    res.send(result);
  }else{
    try{
        result = await postBus.insertOne(postEntity);
        res.statusCode = 200;
        res.send(result);
    }catch(e){
        next(e);
    }
  }
});


PostRouter.get("/",async function(req,res){
  let pageNumber = req.query.page!.toString();
  const result = await postBus.find(parseInt(pageNumber));
  res.send(result);
});


PostRouter.get("/adv-search",async function(req,res){
  let isVisible: boolean ;
  isVisible = req.query.isVisible! === 'true'
  let title: string;
  title = req.query.title!.toString();
  let rate: number;
  rate = parseInt(req.query.rate!.toString());
  const result = await postBus.advanceSearch(title,isVisible,rate);
  res.send(result);
});


PostRouter.get("/search",async function(req,res){
  let pageNumber = parseInt(req.query.page!.toString());
  let title = req.query.title!.toString();
  const result = await postBus.search(title,pageNumber);
  res.send(result);
});


PostRouter.get("/:id",async function(req,res){ 
  let result ;
  if(validator.isMongoId(req.params.id.toString())){
    let tempPostId = req.params.id;
    result = await postBus.findOne(tempPostId);
  }
  res.statusCode = 200;
  res.send(result);
});


PostRouter.post("/:id",async function(req,res,next){ //this must be put but due to cors ERROR I USED POST INSTEAD OF PUT
  const  postEntity = req.body as PostEntity;
  if(validator.isMongoId(req.params.id.toString())){
    let tempPostId  = req.params.id;
    let result; 
    const { error } = PostEntitySchema.validate(postEntity);
    if(error) {
      result = `validation failed. errors: ${error}` ;
      res.statusCode = 400;
      res.send(result);
    } else {
      try{
        result = await postBus.updateOne(tempPostId,postEntity);
        res.statusCode = 200;
        res.send(result);
      } catch(e) {
        next(e);
      }
  }
  }
});


PostRouter.delete("/:id",async function(req,res){
  let result; //result
  if(validator.isMongoId(req.params.id.toString())){
    let tempPostId = req.params.id;
    result = postBus.deleteOne(tempPostId);
  }
  res.statusCode = 200;
  res.send(result);
});


module.exports = PostRouter;

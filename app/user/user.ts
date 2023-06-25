import express from 'express';
import { UserDal, UserDalConc } from './userDal';
import { UserBus, UserBusConc } from './userBus';
import { UserEntity,UserEntitySchema } from './userEntity';
import { takeWhile, Observable, of, map, fromEvent, take, first } from 'rxjs';
import validator from 'validator';
import {verifyToken} from "../passport/jwt-middleware";

  export const UserRouter=express.Router();
  const userBus=new UserBusConc(new UserDalConc());
  UserRouter.post("/",async function(req,res,next){
    const  userEntity = req.body as UserEntity;
    const { error } = UserEntitySchema.validate(userEntity);
    let rslt; //result
      if(error){
        rslt ='validation failed. errors: ';
        res.statusCode = 400;
        res.send(rslt);
      }else{
        try{
          rslt = await userBus.insertOne(userEntity);
          res.statusCode = 200;
          res.send(rslt);
        }catch(e){
          next(e);
        }
      }
  });

  UserRouter.get("/",verifyToken,async function(req,res,next){
    let rslt: any;
    const rowCounts = 2;
      try{
        rslt = await userBus.find();
      }catch(e){
        next(e);
      }        
    res.statusCode = 200;
    res.send(rslt);
  });


  UserRouter.get("/:id",async function(req,res,next){ //post-id
    let rslt;
    if(validator.isMongoId(req.params.id.toString())){
      try{
        let tmp_id=req.params.id;
        rslt =await userBus.findOne(tmp_id);
        res.statusCode=200;
        res.send(rslt);
      }catch(e){
        next(e);
      }
    } else {
    rslt ='validation failed. errors: ';
    res.statusCode=400;
    res.send(rslt);
    }
  });


            UserRouter.put("/:id",async function(req,res,next){
                let rslt; //result
                const userEntity=<UserEntity> req.body;
                if(validator.isMongoId(req.params.id.toString())){
                    const id=req.params.id.toString();

                    const { error } = UserEntitySchema.validate(userEntity);
                    if (error) {
                        rslt ='validation failed. errors: ';
                        res.statusCode=400;
                        res.send(rslt);
                    } else {
                        try{
                            rslt =await userBus.updateOne(id,userEntity);
                            res.statusCode=200;
                            res.send(rslt);
                        }catch(e){
                            next(e);
                        }
                    }
                }
            });
            UserRouter.delete("/:id",async function(req,res,next){
                let rslt;
                if(validator.isMongoId(req.params.id.toString())){
                    try{
                        let tmp_id=req.params.id;
                        rslt=await userBus.deleteOne(tmp_id);
                        res.statusCode=200;
                        res.send(rslt);
                    }catch(e){
                        next(e);
                    }
                }else{
                    rslt ='validation failed. errors: ';
                    res.statusCode=400;
                    res.send(rslt);
                }
            });
    
                    
        module.exports=UserRouter;

import express from 'express';
import { UserDal, UserDalConc } from './userDal';
import { UserBus, UserBusConc } from './userBus';
import { UserEntity,UserEntitySchema } from './userEntity';
import { takeWhile, Observable, of, map, fromEvent, take, first } from 'rxjs';
import validator from 'validator';
import passport from 'passport'
import Strategy from 'passport-local'
import { LocalPassport } from '../passport/localPassport'


export const UserRouter=express.Router();
LocalPassport(passport, Strategy.Strategy)
            const userBus=new UserBusConc(new UserDalConc());
            UserRouter.post('/login', passport.authenticate('local',{session: false}), async (req, res) => {
  
                try {
                  res.send('logged in')
                } catch (error) {
                  console.log(error)
                }
              })
            UserRouter.post("/",async function(req,res,next){
                let rslt; //result
                const  userEntity = req.body as UserEntity;
                const { error } = UserEntitySchema.validate(userEntity);
                    if(error){
                        rslt ='validation failed. errors: ';
                        res.statusCode=400;
                        res.send(rslt);
                    }else{
                        try{
                            rslt =await userBus.insertOne(userEntity);
                            res.statusCode=200;
                            res.send(rslt);
                        }catch(e){
                            next(e);
                        }
                    }
            });

            UserRouter.get("/",async function(req,res,next){
                let rslt:any;
                // let pageNo:string="0";
                // let title:string="";
                const rowCounts=2;
                    try{
                            rslt=await userBus.find();
                    }catch(e){
                            next(e);
                    }        
                    res.statusCode=200;
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
               
                        }else{
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

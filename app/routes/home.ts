import express from 'express';



export const HomeRouter=express.Router();
                HomeRouter.get("/",function(req,res){
                                                
                                                res.send({name:'home'});

                                        });
module.exports=HomeRouter;